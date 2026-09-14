export default function PhotoSignPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 print:bg-white print:py-0">
      <p className="text-gray-500 text-sm mb-6 print:hidden">
        Stampa questa pagina (Ctrl/Cmd+P) — ritaglia il cartellino lungo il bordo. Da consegnare alle guide per le foto ricordo durante le escursioni.
      </p>

      <div className="bg-white rounded-2xl shadow-2xl border-4 border-[#0d1f2d] w-full max-w-sm aspect-[4/5] flex flex-col items-center justify-center p-8 text-center print:shadow-none print:border-2">
        <span className="flex items-center justify-center h-24 w-24 rounded-full bg-[#00a8cc] text-white font-black text-4xl mb-6">V</span>
        <h1 className="text-3xl font-black italic text-[#0d1f2d] mb-1">Voyara Travel</h1>
        <p className="text-sm font-bold text-[#00a8cc] tracking-widest mb-6">PORTFOLIO DEMO</p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Thank you for traveling with us!<br />
          Share your photo with <span className="font-bold text-[#ffa500]">#VoyaraTravel</span>
        </p>
        <p className="text-xs text-gray-400 mt-6">voyara-travel-demo.example</p>
      </div>
    </div>
  );
}
