'use client';

import { useState } from 'react';
import { Lang } from '../../lib/tours';
import Header from '../vetrina/Header';
import Footer from '../vetrina/Footer';
import { getMainNavLinks } from '../../lib/nav';
import { supabase } from '../../lib/supabase';

const GOOGLE_REVIEW_URL = 'https://g.page/r/REPLACE_WITH_GOOGLE_PLACE_ID/review';
const TRIPADVISOR_REVIEW_URL = 'https://www.tripadvisor.com/UserReviewEdit-REPLACE_WITH_TRIPADVISOR_ID';

const t: { [key in Lang]: { [key: string]: string } } = {
  en: {
    heroTitle: 'How was your tour?', heroSubtitle: 'Your feedback helps us improve',
    yourName: 'Your Name', nationality: 'Nationality', tourName: 'Which tour did you take?',
    rateExperience: 'Rate your experience', comment: 'Tell us more (optional)',
    submit: 'Submit Feedback', sending: '...',
    thanksHigh: 'Thank you! We\'re so glad you enjoyed it.', thanksHighSub: 'Would you mind sharing your experience publicly? It really helps us.',
    thanksLow: 'Thank you for your honest feedback.', thanksLowSub: 'Our team will review this and get in touch if needed.',
    reviewGoogle: 'Leave a Google Review', reviewTripadvisor: 'Leave a TripAdvisor Review'
  },
  ar: {
    heroTitle: 'كيف كانت رحلتك؟', heroSubtitle: 'ملاحظاتك تساعدنا على التحسين',
    yourName: 'اسمك', nationality: 'الجنسية', tourName: 'أي جولة قمت بها؟',
    rateExperience: 'قيّم تجربتك', comment: 'أخبرنا المزيد (اختياري)',
    submit: 'إرسال الملاحظات', sending: '...',
    thanksHigh: 'شكرًا لك! يسعدنا أنك استمتعت بها.', thanksHighSub: 'هل تمانع في مشاركة تجربتك علنًا؟ هذا يساعدنا كثيرًا.',
    thanksLow: 'شكرًا لملاحظاتك الصادقة.', thanksLowSub: 'سيقوم فريقنا بمراجعة هذا والتواصل معك إذا لزم الأمر.',
    reviewGoogle: 'اترك تقييمًا على جوجل', reviewTripadvisor: 'اترك تقييمًا على TripAdvisor'
  },
  it: {
    heroTitle: 'Com\'è andata l\'escursione?', heroSubtitle: 'Il tuo feedback ci aiuta a migliorare',
    yourName: 'Il tuo nome', nationality: 'Nazionalità', tourName: 'Quale tour hai fatto?',
    rateExperience: 'Valuta la tua esperienza', comment: 'Raccontaci di più (facoltativo)',
    submit: 'Invia Feedback', sending: '...',
    thanksHigh: 'Grazie! Siamo felici che ti sia piaciuta.', thanksHighSub: 'Ti va di condividere la tua esperienza pubblicamente? Ci aiuta molto.',
    thanksLow: 'Grazie per la tua sincerità.', thanksLowSub: 'Il nostro team esaminerà il tuo feedback e ti contatterà se necessario.',
    reviewGoogle: 'Lascia una recensione su Google', reviewTripadvisor: 'Lascia una recensione su TripAdvisor'
  },
  ru: {
    heroTitle: 'Как прошла ваша экскурсия?', heroSubtitle: 'Ваш отзыв помогает нам стать лучше',
    yourName: 'Ваше имя', nationality: 'Гражданство', tourName: 'Какой тур вы посетили?',
    rateExperience: 'Оцените впечатления', comment: 'Расскажите подробнее (необязательно)',
    submit: 'Отправить отзыв', sending: '...',
    thanksHigh: 'Спасибо! Мы рады, что вам понравилось.', thanksHighSub: 'Не могли бы вы поделиться своим опытом публично? Это очень нам поможет.',
    thanksLow: 'Спасибо за честный отзыв.', thanksLowSub: 'Наша команда рассмотрит его и свяжется с вами при необходимости.',
    reviewGoogle: 'Оставить отзыв в Google', reviewTripadvisor: 'Оставить отзыв на TripAdvisor'
  },
  de: {
    heroTitle: 'Wie war deine Tour?', heroSubtitle: 'Dein Feedback hilft uns, besser zu werden',
    yourName: 'Dein Name', nationality: 'Nationalität', tourName: 'Welche Tour hast du gemacht?',
    rateExperience: 'Bewerte deine Erfahrung', comment: 'Erzähl uns mehr (optional)',
    submit: 'Feedback senden', sending: '...',
    thanksHigh: 'Danke! Wir freuen uns, dass es dir gefallen hat.', thanksHighSub: 'Würdest du deine Erfahrung öffentlich teilen? Das hilft uns sehr.',
    thanksLow: 'Danke für dein ehrliches Feedback.', thanksLowSub: 'Unser Team wird sich das ansehen und sich bei Bedarf melden.',
    reviewGoogle: 'Google-Bewertung abgeben', reviewTripadvisor: 'TripAdvisor-Bewertung abgeben'
  }
};

export default function SurveyPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const isRtl = language === 'ar';
  const tr = t[language];

  const [form, setForm] = useState({ name: '', nationality: '', tour: '', comment: '' });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitting(true);

    const redirectedTo = rating >= 4 ? 'external' : 'internal';

    await supabase.from('survey_responses').insert({
      customer_name: form.name || null,
      nationality: form.nationality || null,
      tour_slug: form.tour || null,
      rating,
      comment: form.comment || null,
      redirected_to: redirectedTo
    });

    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: 'Tour Survey',
        name: form.name || '-',
        message: `Nationality: ${form.nationality || '-'}\nTour: ${form.tour || '-'}\nRating: ${rating}/5\n\n${form.comment || ''}`
      })
    }).catch(() => {});

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/"
        navLinks={getMainNavLinks(language)}
      />

      <section className="relative bg-gradient-to-r from-[#ffa500] to-[#ffc966] text-white text-center py-10">
        <h1 className="text-3xl font-bold mb-1">{tr.heroTitle}</h1>
        <p className="opacity-90">{tr.heroSubtitle}</p>
      </section>

      <section className="max-w-lg mx-auto px-4 py-12">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder={tr.yourName}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none"
            />
            <input
              placeholder={tr.nationality}
              value={form.nationality}
              onChange={(e) => setForm({ ...form, nationality: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none"
            />
            <input
              placeholder={tr.tourName}
              value={form.tour}
              onChange={(e) => setForm({ ...form, tour: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none"
            />

            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">{tr.rateExperience}</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-4xl leading-none"
                    aria-label={`${n} star`}
                  >
                    <span className={(hoverRating || rating) >= n ? 'text-[#ffa500]' : 'text-gray-300'}>★</span>
                  </button>
                ))}
              </div>
            </div>

            <textarea
              placeholder={tr.comment}
              rows={4}
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none"
            />

            <button
              type="submit"
              disabled={submitting || rating === 0}
              className="w-full bg-[#ffa500] text-white font-bold py-3 rounded-lg hover:bg-[#e69400] disabled:opacity-50 transition"
            >
              {submitting ? tr.sending : tr.submit}
            </button>
          </form>
        ) : rating >= 4 ? (
          <div className="text-center space-y-5">
            <p className="text-2xl">🎉</p>
            <p className="text-lg font-bold text-gray-900">{tr.thanksHigh}</p>
            <p className="text-sm text-gray-600">{tr.thanksHighSub}</p>
            <div className="flex flex-col gap-3">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4285F4] text-white font-bold py-3 rounded-lg hover:opacity-90 transition text-center"
              >
                {tr.reviewGoogle}
              </a>
              <a
                href={TRIPADVISOR_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00AA6C] text-white font-bold py-3 rounded-lg hover:opacity-90 transition text-center"
              >
                {tr.reviewTripadvisor}
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-3">
            <p className="text-2xl">🙏</p>
            <p className="text-lg font-bold text-gray-900">{tr.thanksLow}</p>
            <p className="text-sm text-gray-600">{tr.thanksLowSub}</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
