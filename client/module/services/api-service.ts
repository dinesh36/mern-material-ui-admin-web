import axios, { ResponseType } from 'axios';
import { isPublicPage } from '../../utils/public-page';

interface apiServicePayload {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: any;
  query?: string;
  successMessage?: string;
  errorMessage?: string;
  headers?: any;
  responseType?: string;
  ignoreServerMessage?: boolean;
}

const basePath = 'http://localhost:5001/api';

export const apiService = async (
  requestOpts: apiServicePayload
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.request({
      url: `${basePath}${requestOpts.url}`,
      data: requestOpts.data,
      method: requestOpts.method || 'GET',
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(requestOpts.headers || {}),
      },
      ...(requestOpts.responseType
        ? { responseType: requestOpts.responseType as ResponseType }
        : {}),
    });
    if (requestOpts.successMessage) {
      (window as any).__successMessage = requestOpts.successMessage;
      window.dispatchEvent(new Event('successMessage'));
    }
    if (requestOpts.responseType === 'blob') {
      return response;
    }
    return response.data.data;
  } catch (e: any) {
    const isRetry = await handleUnauthorizedResponse(e);
    if (isRetry) {
      return await apiService(requestOpts);
    }
    const responseErrorData = e?.response.data;
    if (requestOpts.errorMessage) {
      let errorMessage = requestOpts.errorMessage;
      const serverErrorMessage = responseErrorData?.error?.message;
      if (!requestOpts.ignoreServerMessage) {
        errorMessage = serverErrorMessage;
      }
      (window as any).__errorMessage = errorMessage;
      window.dispatchEvent(new Event('errorMessage'));
    }
    throw e;
  }
};

const handleUnauthorizedResponse = async (e: any) => {
  if (e.status === 401 && !isPublicPage((window.location as any).pathname)) {
    try {
      const response = (await axios.request({
        url: `${basePath}/auth/refresh`,
        data: { refreshToken: localStorage.getItem('refreshToken') },
        method: 'POST',
      })) as any;
      localStorage.setItem('accessToken', response.data.data.accessToken);
      return true;
    } catch (e) {
      localStorage.clear();
      window.location.href = '/signin';
      throw e;
    }
  }
};
