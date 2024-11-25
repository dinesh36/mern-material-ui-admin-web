import express from 'express';
import planNotes from './plan-notes';

class planRoutes {
  init(app: express.Application, reqWrapper: any) {
    app.get(
      '/api/plans/:planId/notes',
      reqWrapper(planNotes.getPlanNotes.bind(planNotes))
    );
    app.get(
      '/api/plans/:planId/shared/notes',
      reqWrapper(planNotes.getPlanNotes.bind(planNotes))
    );
    app.get(
      '/api/plans/:planId/notes/:noteId',
      reqWrapper(planNotes.getPlanNote.bind(planNotes))
    );
    app.post(
      '/api/plans/:planId/notes',
      reqWrapper(planNotes.createPlanNote.bind(planNotes))
    );
    app.put(
      '/api/plans/:planId/notes/:noteId',
      reqWrapper(planNotes.editPlanNote.bind(planNotes))
    );
    app.delete(
      '/api/plans/:planId/notes/:noteId',
      reqWrapper(planNotes.deletePlanNote.bind(planNotes))
    );
  }
}

module.exports = new planRoutes();
