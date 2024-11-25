import { apiService } from './api-service';

const sleep = async () => {
  return new Promise((resolve) => setTimeout(resolve, 3000));
};

export const getPlanNotesList = async (
  planId: string,
  sharedPlanNote: boolean
) => {
  try {
    return await apiService({
      url: sharedPlanNote
        ? `/plans/${planId}/shared/notes`
        : `/plans/${planId}/notes`,
      errorMessage: 'Error in getting the plan notes',
    });
  } catch (e) {
    throw e;
  }
};

export const getSharedplanNotesList = async (planId: string) => {
  try {
    return await apiService({
      url: `/plans/shared/${planId}/notes`,
      errorMessage: 'Error in getting the plan notes',
    });
  } catch (e) {
    throw e;
  }
};

export const addPlanNote = async (planNote: any, planId: string) => {
  try {
    await sleep();
    return await apiService({
      url: `/plans/${planId}/notes`,
      method: 'POST',
      data: planNote,
      errorMessage: 'Error in creating the plan note',
      successMessage: 'Plan note created successfully',
    });
  } catch (e) {
    throw e;
  }
};

export const deletePlanNote = async (planId: string, noteId: string) => {
  try {
    return await apiService({
      url: `/plans/${planId}/notes/${noteId}`,
      method: 'DELETE',
      errorMessage: 'Error in deleting the plan note',
      successMessage: 'plan note deleted successfully',
    });
  } catch (e) {
    throw e;
  }
};

export const editPlanNote = async (
  planNote: any,
  noteId: string,
  planId: string
) => {
  try {
    return await apiService({
      url: `/plans/${planId}/notes/${noteId}`,
      method: 'PUT',
      data: planNote,
      errorMessage: 'Error in editing the plan note',
      successMessage: 'Plan note edited successfully',
    });
  } catch (e) {
    throw e;
  }
};
