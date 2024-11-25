import planModel from './plan.model';
import { FEUrl } from '../../lib/config';
import { decode, encode } from '../../utils/encoder';
import dayjs from 'dayjs';
import { ReqWrapperArgs } from '../../types/ReqWrapperArgs';

const ENCODE_DIVIDER = '___';
const MAX_PLANS_PER_USER = 3;

class Plans {
  async getPlans({ userId }: ReqWrapperArgs) {
    const plans = await planModel.getplans({ userId });
    return plans.map((record: any) => ({
      ...record,
      id: record._id,
      startDate: dayjs(record.startDate).format('YYYY-MM-DD'),
    }));
  }

  async getSharedPlan({ params, HttpException }: ReqWrapperArgs) {
    const { id } = params;
    const decodedStr = decode(id);
    const planId = decodedStr.split(ENCODE_DIVIDER)[0];
    const revision = Number(decodedStr.split(ENCODE_DIVIDER)[1]);
    const plan = await planModel.getSharedplan({
      planId,
      revision,
    });
    if (plan) {
      return { ...plan, id: plan._id };
    } else {
      throw new HttpException(
        HttpException.notFoundException('Plan not found')
      );
    }
  }

  async getPlan({ params, userId, HttpException }: ReqWrapperArgs) {
    const { id } = params;
    const plan = await planModel.getplan({
      planId: id,
      userId: userId,
    });
    if (plan) {
      return {
        ...plan,
        id: plan._id,
        startDate: dayjs(plan.startDate).format('YYYY-MM-DD'),
      };
    } else {
      throw new HttpException(
        HttpException.notFoundException('Plan not found')
      );
    }
  }

  async deletePlan({ params, userId }: ReqWrapperArgs) {
    const { id } = params;
    await planModel.deleteplan({ planId: id, userId: userId });
  }

  validatePlan(planData: any, HttpException: ReqWrapperArgs['HttpException']) {
    if (!planData.title || typeof planData.title !== 'string') {
      throw new HttpException(
        HttpException.invalidDataException('Please provide valid title')
      );
    }
    if (!planData.description || typeof planData.description !== 'string') {
      throw new HttpException(
        HttpException.invalidDataException('Please provide valid description')
      );
    }
    if (!planData.weeks || typeof planData.weeks !== 'number') {
      throw new HttpException(
        HttpException.invalidDataException('Please provide valid weeks')
      );
    }
    if (!planData.startDate || !dayjs(planData.startDate).isValid()) {
      throw new HttpException(
        HttpException.invalidDataException('Please provide valid start date')
      );
    }
  }

  async validateMaxPlan(userId: string, HttpException: any) {
    const plansCount = await planModel.getUserPlansCount({ userId });
    if (plansCount >= 3) {
      throw new HttpException(
        HttpException.invalidDataException(
          `User is not allowed to create more than ${MAX_PLANS_PER_USER} plans.`
        )
      );
    }
  }

  async createPlan({ body, userId, HttpException }: ReqWrapperArgs) {
    this.validatePlan(body, HttpException);
    await this.validateMaxPlan(userId, HttpException);
    const createdPlan = await planModel.createplan({
      ...body,
      userId: userId,
      startDate: dayjs(body.startDate).toDate(),
    } as any);
    return createdPlan;
  }

  async editPlan({ body, params, userId, HttpException }: ReqWrapperArgs) {
    const { id } = params;
    this.validatePlan(body, HttpException);
    await planModel.editplan({
      ...body,
      id,
      userId: userId,
      startDate: dayjs(body.startDate).toDate(),
    } as any);
    return body;
  }

  async getShareLink({ params, userId, HttpException }: ReqWrapperArgs) {
    const { id } = params;
    const plan = await planModel.getplan({
      planId: id,
      userId: userId,
    });
    if (plan) {
      await planModel.createRevisionBackup(plan as any);
      const shareLink = `${FEUrl}/shared-plan/${encode(`${plan._id}${ENCODE_DIVIDER}${plan.revision}`)}`;
      return { shareLink };
    } else {
      throw new HttpException(
        HttpException.notFoundException('Plan not found')
      );
    }
  }
}

export default new Plans();
