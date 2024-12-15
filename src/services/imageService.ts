import apiClient from '@/http-common';
import type  { ImageSearchParams, ImageSearchResponse, ImageInfo } from '@/utils/intefaces/ImageInterfaces'

const fetchImages = async <T>(params: ImageSearchParams): Promise<T> => {
  const response = await apiClient.post('/photos', params);
  return response.data;
};

const getImagesByParams = (params: ImageSearchParams): Promise<ImageSearchResponse> => {
  return fetchImages<ImageSearchResponse>(params);
};

const getImageInfo = (params: ImageSearchParams): Promise<ImageInfo> => {
  return fetchImages<ImageInfo>(params);
};

export default {
  getImagesByParams,
  getImageInfo
};
