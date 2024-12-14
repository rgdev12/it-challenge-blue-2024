import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import type { ImageData } from '@/utils/intefaces/ImageInterfaces';
import imageService from '@/services/imageService';

export const useImageStore = defineStore('imageStore', () => {
  const images = ref<Array<ImageData>>([]);
  const currentPage = ref<number>(1);
  const isLoading = ref<boolean>(false);
  const query = ref<string>('');
  const totalImages = computed(() => images.value.length);

  async function searchImages(params: {[key: string]: string | number | boolean}) {
    try {
      isLoading.value = true;
      params.per_page = 20;
      params.page = currentPage.value;

      if (params.page === 1) {
        images.value = [];
      }

      const response = await imageService.getImagesByParams(params);

      images.value = [...images.value, ...response.data]; 
      currentPage.value += 1;
    } catch (exception) {
      console.error('Error al buscar imágenes:', exception);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    images,
    query,
    totalImages,
    isLoading,
    currentPage,
    searchImages
  };
});
