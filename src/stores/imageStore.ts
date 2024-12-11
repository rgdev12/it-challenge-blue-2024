import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import imageService from '@/services/imageService';

export const useImageStore = defineStore('imageStore', () => {
  const images = ref<Array<any>>([]);
  const query = ref<string>('');
  const totalImages = computed(() => images.value.length);

  async function searchImages(newQuery: string) {
    try {
      const response = await imageService.searchImages(newQuery);
      images.value = response;
      query.value = newQuery;
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
