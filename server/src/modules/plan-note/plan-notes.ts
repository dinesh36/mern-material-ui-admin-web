import planNoteModal from './plan-note.model';
import { ReqWrapperArgs } from '../../types/ReqWrapperArgs';

class PlanNotes {
  async getPlanNotes({ params }: ReqWrapperArgs) {
    const planNotes = await planNoteModal.getplanNotes({
      planId: params.planId,
    });
    return planNotes.map((record: any) => ({
      ...record,
      id: record._id,
    }));
  }

  async createPlanNote({ params, body }: ReqWrapperArgs) {
    return await planNoteModal.createplanNote({
      ...body,
      planId: params.planId,
    });
  }

  async getPlanNote({ params, HttpException }: ReqWrapperArgs) {
    const planNote = await planNoteModal.getplanNote({
      noteId: params.noteId,
      planId: params.planId,
    });
    if (planNote) {
      return planNote;
    } else {
      throw new HttpException(
        HttpException.notFoundException('plan note not found')
      );
    }
  }

  async deletePlanNote({ params }: ReqWrapperArgs) {
    await planNoteModal.deletePlanNote({
      noteId: params.noteId,
      planId: params.planId,
    });
  }

  async editPlanNote({ params, body }: ReqWrapperArgs) {
    await planNoteModal.editplanNote({
      ...body,
      noteId: params.noteId,
      planId: params.planId,
    });
    return body;
  }
}

export default new PlanNotes();
