import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import type { ImageData } from '@/utils/intefaces/ImageInterfaces';
import imageService from '@/services/imageService';

export const useImageStore = defineStore('imageStore', () => {
  const images = ref<Array<ImageData>>([]);
  const query = ref<string>('');
  const totalImages = computed(() => images.value.length);

  async function searchImages(newQuery: string) {
    try {
      const response = await imageService.getImagesByParams({
        per_page: 20,
        page: 1,
        type: 'grid'
      });
      console.log(response);

      images.value = response.data;
      // query.value = newQuery;
    } catch (exception) {
      console.error('Error al buscar imágenes:', exception);
    }
  }

  return {
    images,
    query,
    totalImages,
    searchImages
  };
});
