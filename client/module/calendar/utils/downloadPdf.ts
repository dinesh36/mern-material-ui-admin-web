import { Plan } from '../../../models/plan.type';
import { PlanNote } from '../../../models/plan-note.type';
import PdfGenerator from './pdf-generator';

export const downloadPdf = (plan: Plan, planNotes: PlanNote[]) => {
  // @ts-ignore
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  // @ts-ignore
  const stream = doc.pipe(blobStream());
  const pdfGenerator = new PdfGenerator({ doc, plan, planNotes });
  pdfGenerator.generatePDF();

  stream.on('finish', function () {
    // get a blob you can do whatever you like with
    const blob = stream.toBlob('application/pdf');
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    // @ts-ignore
    a.style = 'display: none';
    a.href = url;
    a.download = `${plan.title}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  });
};
