import jsPDF from 'jspdf';

export const handleExportPDF = () => {
  const doc = new jsPDF();

  const title = 'My Calendar Report';
  const description = 'This is a detailed description of the calendar events.';

  doc.setFontSize(16);
  doc.text(title, 10, 10);

  doc.setFontSize(12);
  doc.text(description, 10, 25);

  doc.save('calendar.pdf');
};
