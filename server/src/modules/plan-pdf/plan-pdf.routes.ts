import planPdf from './plan-pdf';
import express from 'express';

class planRoutes {
  init(app: express.Application) {
    app.get('/api/plans/:id/export-pdf', planPdf.exportPDF.bind(planPdf));
  }
}

export default new planRoutes();
