import jsPDF from 'jspdf';

export interface BookingPdfData {
  requestType: string;
  customerName: string;
  phone: string;
  email: string;
  notes: string;
  details: { label: string; value: string }[];
}

export async function generateBookingPDF(data: BookingPdfData): Promise<jsPDF> {
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
    // logo optional
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(13, 31, 45);
  doc.text('Voyara Travel', margin + 60, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('Demo Business Center, Example City (placeholder address)', margin + 60, y + 14);
  doc.text('Portfolio case study — demo content only', margin + 60, y + 26);

  y += 60;
  doc.setDrawColor(0, 168, 204);
  doc.setLineWidth(1.5);
  doc.line(margin, y, pageWidth - margin, y);

  y += 30;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(13, 31, 45);
  doc.text(`Richiesta di Prenotazione — ${data.requestType}`, margin, y);

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generato il ${new Date().toLocaleString('it-IT')}`, margin, y + 14);

  y += 40;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(13, 31, 45);
  doc.text('Dati Cliente', margin, y);
  y += 16;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  [
    `Nome: ${data.customerName}`,
    `Telefono/WhatsApp: ${data.phone}`,
    `Email: ${data.email || '-'}`
  ].forEach((line) => {
    doc.text(line, margin, y);
    y += 15;
  });

  y += 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(13, 31, 45);
  doc.text('Dettagli Richiesta', margin, y);
  y += 18;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  data.details.forEach((item) => {
    doc.setTextColor(255, 165, 0);
    doc.text('•', margin, y);
    doc.setTextColor(60, 60, 60);
    doc.text(`${item.label}: ${item.value}`, margin + 14, y);
    y += 16;
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
  doc.roundedRect(margin, y, pageWidth - margin * 2, 55, 8, 8, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('Il nostro team confermerà disponibilità e prezzo entro poche ore.', margin + 16, y + 22);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(13, 31, 45);
  doc.text('WhatsApp: +00 000 000 0000 (demo)  ·  Email: info@cdalise.com', margin + 16, y + 40);

  return doc;
}
