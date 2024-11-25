import mongoose from 'mongoose';
import { Plan } from './plan.type';
import planNoteModel from '../plan-note/plan-note.model';

const planSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: Date,
  weeks: Number,
  userId: String,
  revision: Number,
  isSharedplan: Boolean,
  originalplanId: String,
});
const planMongoModel = mongoose.model('plan', planSchema);

class PlanModel {
  async getplans({ userId }: { userId: string }) {
    return await planMongoModel
      .find({
        userId,
        isSharedplan: false,
      })
      .lean();
  }

  async getUserPlansCount({ userId }: { userId: string }) {
    return await planMongoModel.countDocuments({ userId });
  }

  async getplan({ planId, userId }: { userId?: string; planId: string }) {
    const findObj: any = { _id: planId };
    if (userId) {
      findObj.userId = userId;
    }
    return await planMongoModel.findOne(findObj).lean();
  }

  async getSharedplan({
    planId,
    revision,
  }: {
    revision: number;
    planId: string;
  }) {
    const findObj: any = {
      originalplanId: planId,
      revision,
      isSharedplan: true,
    };
    return await planMongoModel.findOne(findObj).lean();
  }

  async deleteplan({ planId, userId }: { planId: string; userId: string }) {
    return await planMongoModel.deleteOne({
      _id: planId,
      userId: userId,
    });
  }

  async createplan(plan: Plan) {
    return await planMongoModel.create({
      ...plan,
      isSharedplan: false,
      revision: 1,
    });
  }

  async editplan(planData: Plan) {
    const { id, ...plan } = planData;
    await this.updateRevision(id as string);
    return await planMongoModel.updateOne({ _id: planData.id }, plan);
  }

  async updateRevision(planId: string) {
    await planMongoModel.updateOne({ _id: planId }, { $inc: { revision: 1 } });
  }

  async createRevisionBackup(planData: Plan) {
    const { _id: originalplanId, ...plan } = planData;
    let sharedplan = await this.getSharedplan({
      planId: originalplanId,
      revision: planData.revision,
    });
    if (!sharedplan) {
      //Create the shared plan
      const shareplan = await planMongoModel.create({
        ...plan,
        isSharedplan: true,
        originalplanId: originalplanId,
      });

      //Create the shared notes
      const oldNotes = await planNoteModel.getplanNotes({
        planId: originalplanId,
      });
      for (const note of oldNotes) {
        await planNoteModel.getplanNotes({
          planId: originalplanId,
        });
        // @ts-ignore
        delete note._id;
        await planNoteModel.createplanNote({
          ...note,
          planId: shareplan._id,
        });
      }
    }
  }
}

export default new PlanModel();
