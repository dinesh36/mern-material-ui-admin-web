import plans from './plans';
import express from 'express';

class PlanRoutes {
  init(app: express.Application, reqWrapper: any) {
    app.get('/api/plans', reqWrapper(plans.getPlans.bind(plans)));

    app.get(
      '/api/plans/shared/:id',
      reqWrapper(plans.getSharedPlan.bind(plans))
    );

    app.get('/api/plans/:id', reqWrapper(plans.getPlan.bind(plans)));
    app.post('/api/plans', reqWrapper(plans.createPlan.bind(plans)));
    app.put('/api/plans/:id', reqWrapper(plans.editPlan.bind(plans)));
    app.delete('/api/plans/:id', reqWrapper(plans.deletePlan.bind(plans)));
    app.get(
      '/api/plans/:id/share-link',
      reqWrapper(plans.getShareLink.bind(plans))
    );
  }
}

module.exports = new PlanRoutes();
