import { Plan } from '../../models/plan.type';
import { apiService } from './api-service';
import downloadBlob from '../../utils/download-blob';

export const addPlan = async (plan: Plan) => {
  const planBody = { ...plan };
  delete planBody.id;
  try {
    return await apiService({
      url: '/plans',
      method: 'POST',
      data: planBody,
      errorMessage: 'Error in creating the plan',
      successMessage: 'Plan created successfully',
    });
  } catch (e) {
    throw e;
  }
};

export const getPlanList = async () => {
  try {
    return await apiService({
      url: '/plans',
      errorMessage: 'Error in getting the plan list',
    });
  } catch (e) {
    throw e;
  }
};

export const getPlan = async (planId: string) => {
  try {
    return await apiService({
      url: `/plans/${planId}`,
      errorMessage: 'Error in getting the plan details',
    });
  } catch (e) {
    throw e;
  }
};

export const deletePlan = async (planId: string) => {
  try {
    return await apiService({
      url: `/plans/${planId}`,
      method: 'DELETE',
      errorMessage: 'Error in deleting the plan',
      successMessage: 'Plan deleted successfully',
    });
  } catch (e) {
    throw e;
  }
};

export const editPlan = async (plan: Plan) => {
  const { id, ...planData } = plan;
  try {
    return await apiService({
      url: `/plans/${id}`,
      method: 'PUT',
      data: planData,
      errorMessage: 'Error in editing the plan',
      successMessage: 'Plan edited successfully',
    });
  } catch (e) {
    throw e;
  }
};

export const exportPdfForPlan = async (plan: Plan) => {
  try {
    const response = await apiService({
      url: `/plans/${plan.id}/export-pdf`,
      errorMessage: 'Error in downloading the plan pdf',
      responseType: 'blob',
    });

    downloadBlob({
      blob: new Blob([response.data]),
      fileName: `${plan.title}-plan.pdf`,
    });
  } catch (e) {
    throw e;
  }
};

export const getPlanShareLink = async (planId: string) => {
  try {
    const response = await apiService({
      url: `/plans/${planId}/share-link`,
      errorMessage: 'Error in getting plan share link',
    });
    return response.shareLink;
  } catch (e) {
    throw e;
  }
};

export const getSharedPlan = async (planId: string) => {
  try {
    return await apiService({
      url: `/plans/shared/${planId}`,
      errorMessage: 'Error in getting the plan details',
    });
  } catch (e) {
    throw e;
  }
};
