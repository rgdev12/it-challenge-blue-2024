import apiClient from '@/http-common';

const searchImages = async (query: string) => {
  const response = await apiClient.get('/images/search', {
    params: {
      query,
    },
  });
  return response.data;
};

export default {
  searchImages,
};
