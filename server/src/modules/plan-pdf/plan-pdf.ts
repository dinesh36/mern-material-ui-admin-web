import planModel from '../plan/plan.model';
import planNoteModel from '../plan-note/plan-note.model';
import PDFDocument from 'pdfkit';
import PdfGenerator from './pdf-generaor';

class PlanPdf {
  async exportPDF(req: any, res: any) {
    const { id } = req.params;
    const plan = (await planModel.getplan({
      planId: id,
      userId: req.userId,
    })) as any;
    if (!plan) {
      return res
        .status(404)
        .send({ status: 'error', message: 'plan not found' });
    }

    const buffers: Array<any> = [];
    const planNotes = (await planNoteModel.getplanNotes({
      planId: id,
    })) as any;
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
    });
    doc.on('data', buffers.push.bind(buffers));

    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="output.pdf"');

      res.end(pdfData);
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="output.pdf"');

    const pdfGenerator = new PdfGenerator({ doc, plan, planNotes });
    pdfGenerator.generatePDF();

    // await new Promise((resolve)=>setTimeout(resolve, 5000));
  }
}

export default new PlanPdf();
