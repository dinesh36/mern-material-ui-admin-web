import mongoose from 'mongoose';
import planModal from '../plan/plan.model';

const planNoteschema = new mongoose.Schema({
  planId: String,
  content: String,
  color: String,
  date: Date,
  fields: [
    {
      reps: { type: Number },
      qty: { type: String },
      type: { type: String },
      pace: { type: String },
      description: { type: String },
    },
  ],
});
const planNoteMongooseModal = mongoose.model('planNote', planNoteschema);

class PlanNoteModel {
  async validateplan(planId: string) {
    const plan = await planModal.getplan({ planId });
    if (!plan) {
      throw new Error('plan not found');
    }
    return plan;
  }

  async getplanNotes({ planId }: { planId: string }) {
    await this.validateplan(planId);
    return await planNoteMongooseModal.find({ planId }).lean();
  }

  async createplanNote(planNoteData: any) {
    const plan = await this.validateplan(planNoteData.planId);
    if (!plan.isSharedplan) {
      await planModal.updateRevision(planNoteData.planId);
    }
    return await planNoteMongooseModal.create(planNoteData);
  }

  async getplanNote({ noteId, planId }: { noteId: string; planId: string }) {
    await this.validateplan(planId);
    return await planNoteMongooseModal.findOne({ _id: noteId });
  }

  async deletePlanNote({ noteId, planId }: { noteId: string; planId: string }) {
    await this.validateplan(planId);
    await planModal.updateRevision(planId);
    return await planNoteMongooseModal.deleteOne({ _id: noteId });
  }

  async editplanNote(planData: any) {
    const { noteId, ...plan } = planData;
    await this.validateplan(plan.planId);
    await planModal.updateRevision(planData.planId);
    return await planNoteMongooseModal.updateOne({ _id: noteId }, plan);
  }
}

export default new PlanNoteModel();
