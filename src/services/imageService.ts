import apiClient from '@/http-common';
import type  { ImageSearchParams, ImageSearchResponse } from '@/utils/intefaces/ImageInterfaces'

const getImagesByParams = async (params: ImageSearchParams): Promise<ImageSearchResponse> => {
  const response = await apiClient.post('/photos', params);
  return response.data;
};

export default {
  getImagesByParams
};
