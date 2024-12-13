import apiClient from '@/http-common';
import type  { ImageSearchParams, ImageSearchResponse } from '@/utils/intefaces/ImageInterfaces'

const searchImages = async (query: string) => {
  const response = await apiClient.get('/images/search', {
    params: {
      query,
    },
  });
  return response.data;
};

const getImagesByParams = async (params: ImageSearchParams): Promise<ImageSearchResponse> => {
  const response = await apiClient.post('/photos', params);
  return response.data;
};

export default {
  searchImages,
  getImagesByParams
};
