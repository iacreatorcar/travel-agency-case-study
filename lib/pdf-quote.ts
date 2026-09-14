import jsPDF from 'jspdf';

export interface QuoteData {
  customerName: string;
  hotel: string;
  arrival: string;
  departure: string;
  adults: number;
  kids: number;
  notes: string;
  tours: { name: string; duration: string }[];
}

export async function generateQuotePDF(data: QuoteData): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  let y = 56;

  try {
    const logoRes = await fetch('/logo.png');
    const logoBlob = await logoRes.blob();
    const logoDataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(logoBlob);
    });
    doc.addImage(logoDataUrl, 'PNG', margin, y - 30, 48, 48);
  } catch {
    // logo optional, continue without it
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(13, 31, 45);
  doc.text('Voyara Travel', margin + 60, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('Sharm El-Sheikh, Egypt — Portfolio case study, demo content only', margin + 60, y + 14);

  y += 50;
  doc.setDrawColor(0, 168, 204);
  doc.setLineWidth(1.5);
  doc.line(margin, y, pageWidth - margin, y);

  y += 30;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(13, 31, 45);
  doc.text('Preventivo Pacchetto Su Misura', margin, y);

  y += 28;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Dati Cliente', margin, y);
  y += 16;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const infoLines = [
    `Nome: ${data.customerName}`,
    `Struttura: ${data.hotel || '-'}`,
    `Arrivo: ${data.arrival}`,
    `Partenza: ${data.departure}`,
    `Adulti: ${data.adults} — Bambini: ${data.kids}`
  ];
  infoLines.forEach((line) => {
    doc.text(line, margin, y);
    y += 15;
  });

  y += 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(13, 31, 45);
  doc.text(`Escursioni Incluse (${data.tours.length})`, margin, y);
  y += 18;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  data.tours.forEach((tour, i) => {
    doc.setTextColor(255, 165, 0);
    doc.text('•', margin, y);
    doc.setTextColor(60, 60, 60);
    doc.text(`${tour.name} — ${tour.duration}`, margin + 14, y);
    y += 16;
    if (y > 750) {
      doc.addPage();
      y = 56;
    }
  });

  if (data.notes) {
    y += 14;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(13, 31, 45);
    doc.text('Note', margin, y);
    y += 16;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const noteLines = doc.splitTextToSize(data.notes, pageWidth - margin * 2);
    doc.text(noteLines, margin, y);
    y += noteLines.length * 14;
  }

  y += 30;
  doc.setFillColor(253, 246, 227);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 60, 8, 8, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('Prezzo finale confermato via WhatsApp o email dopo verifica disponibilità.', margin + 16, y + 24);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(13, 31, 45);
  doc.text('WhatsApp: +00 000 000 0000 (demo)  ·  Email: info@cdalise.com', margin + 16, y + 44);

  return doc;
}
