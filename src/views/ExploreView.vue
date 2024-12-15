<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount  } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Masonry from 'masonry-layout';
import StyleSelector from '@/components/StyleSelector.vue';
import { useImageStore } from '@/stores/imageStore';
import ImageLoader from '@/components/ImageLoader.vue';

const currentStyle = ref('masonry');
const masonryGrid = ref<HTMLElement | null>(null);
const imageStore = useImageStore();
const route = useRoute();
const router = useRouter();
let masonryInstance: any = null;
let flagScroll = ref<string>('');

const handleScroll = async () => {
  flagScroll.value = 'haciendo scroll'
  console.log('haciendo scroll')
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;

  // Si estamos cerca del final del scroll y no estamos cargando
  if (scrollTop + clientHeight >= scrollHeight - 10 && !imageStore.isLoading) {
    const params = { type: imageStore.query ? 'search' : 'grid', tag: imageStore.query };
    await imageStore.searchImages(params);
  }
};

const initMasonry = () => {
  if (masonryGrid.value && currentStyle.value === 'masonry') {
    if (masonryInstance) { // Si ya tenemos una instancia de masonry la destruimos
      masonryInstance.destroy();
      masonryInstance = null;
    }

    masonryInstance = new Masonry(masonryGrid.value, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-item',
      percentPosition: true,
    });
    masonryInstance.layout();
  }
};

onMounted(async () => {
  await fetchInitImages();
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

async function fetchInitImages() {
  const query = route.query.q?.toString() || '';
  imageStore.query = query;
  imageStore.currentPage = 1;

  const params = {
    type: query ? 'search' : 'grid',
    tag: query,
  };
  await imageStore.searchImages(params);
  setTimeout(() => initMasonry(), 300);
}

const goToImageInfo = (imageId: string) => {
  const url = router.resolve({ name: 'ImageInfo', params: { id: imageId }}).href;
  window.open(url, '_blank');
}

// Reactivar Masonry cuando se cambie a estilo 'masonry'
watch(currentStyle, (newStyle) => {
  if (newStyle === 'masonry') {
    setTimeout(() => initMasonry(), 300);
  } else if (masonryInstance) {
    masonryInstance.destroy();
    masonryInstance = null;
  }
});

const handleMasonryUpdate = () => {
  if (currentStyle.value === 'masonry' && masonryGrid.value) {
    setTimeout(() => {
      if (masonryInstance) {
        masonryInstance.reloadItems();
        masonryInstance.layout();
      } else {
        initMasonry();
      }
    }, 300);
  }
};

// Función que ve si es necesario acualizar los items del masonry o si hay que inicializarlo
watch(() => imageStore.images, (newImages, oldImages) => {
  if (currentStyle.value === 'masonry' && masonryGrid.value && newImages.length === 0) {
    setTimeout(() => initMasonry(), 300);
  } else {
    setTimeout(() => handleMasonryUpdate(), 300);
  }
});
</script>

<template>
  <div class="container mx-auto px-3">
  {{ flagScroll }}
    <div class="flex flex-wrap justify-between items-center my-5 ">
      <h1 class="text-cyan-600 text-2xl mb-4 sm:mb-0">Explora entre miles de imágenes</h1>
      <StyleSelector @update:style="currentStyle = $event" />
    </div>
    <div class="relative overflow-hidden">
      <div
        :class="[
          'flex flex-wrap ml-[-10px] w-auto',
          currentStyle === 'masonry' ? 'masonry-grid' : '',
          currentStyle === 'grid' ? 'grid-grid' : '',
          currentStyle === 'card' ? 'card-grid' : '',
        ]"
        ref="masonryGrid"
      >
        <div
          v-for="image in imageStore.images"
          :key="image.id"
          :class="[
            'grid-item group relative overflow-hidden cursor-pointer',
            currentStyle === 'masonry' ? 'masonry-item' : '',
            currentStyle === 'grid' ? 'grid-item-style' : '',
            currentStyle === 'card' ? 'card-item' : '',
          ]"
          @click="goToImageInfo(image.id)"
        >
          <div
            class="image-wrapper"
            :class="{ 'square': currentStyle !== 'masonry' }"
          >
            <img
              :src="image.url_m"
              class="w-full h-full object-cover"
              alt="Imagen"
            />
          </div>
          <div
            v-if="currentStyle !== 'card'"
            class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          >
            <h2 class="font-bold text-lg truncate">{{ image.title }}</h2>
            <p class="text-sm italic">{{ image.owner?.username ?? '' }}</p>
            <p v-if="currentStyle === 'masonry'" class="text-sm line-clamp-3">{{ image.description }}</p>
          </div>
          <div v-if="currentStyle === 'card'" class="h-full p-4 bg-white text-black">
            <h2 class="font-bold text-lg truncate">{{ image.title }}</h2>
            <p class="text-sm italic">{{ image.owner?.username ?? '' }}</p>
            <p class="text-sm line-clamp-3">{{ image.description }}</p>
          </div>
        </div>
      </div>

      <ImageLoader v-if="imageStore.isLoading" class="my-32" />
      
      <div v-if="!imageStore.isLoading && !imageStore.images.length">
        <div class="no-results flex flex-col items-center justify-center text-center p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-20 h-20 text-cyan-600 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
            />
          </svg>
          <h2 class="text-2xl font-bold text-gray-700">No se encontraron imágenes</h2>
          <p class="text-gray-500 mt-2">
            Intenta buscar con palabras diferentes para encontrar imágenes que te interesen.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para la visualización masonry */
.masonry-grid .masonry-item {
  width: calc(50% - 10px);
  margin-left: 10px;
  margin-bottom: 10px;
  position: relative;
}

.masonry-grid .masonry-item .image-wrapper {
  transition: transform 0.3s ease-in-out;
}

.masonry-grid .masonry-item:hover .image-wrapper {
  transform: scale(1.05);
}

.masonry-grid .masonry-item:hover .absolute {
  opacity: 1;
}

@media (min-width: 640px) {
  .masonry-grid .masonry-item {
    width: calc(33.33% - 10px);
  }
}

@media (min-width: 1024px) {
  .masonry-grid .masonry-item {
    width: calc(25% - 10px);
  }
}

/* Estilos para grid y card */
.image-wrapper.square {
  position: relative;
  width: 100%;
  padding-top: 100%;
}

.image-wrapper.square img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Estilos para grid */
.grid-grid .grid-item-style {
  width: calc(25% - 10px);
  margin-left: 10px;
  margin-bottom: 10px;
}

@media (min-width: 640px) {
  .grid-grid .grid-item-style {
    width: calc(20% - 10px);
  }
}

@media (min-width: 1024px) {
  .grid-grid .grid-item-style {
    width: calc(16.66% - 10px);
  }
}

/* Estilos para cards */
.card-grid .card-item {
  width: calc(50% - 10px);
  margin-left: 10px;
  margin-bottom: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
}

.card-grid .card-item img {
  border-bottom: 1px solid #e5e5e5;
}

@media (min-width: 640px) {
  .card-grid .card-item {
    width: calc(25% - 10px);
  }
}

@media (min-width: 1024px) {
  .card-grid .card-item {
    width: calc(20% - 10px);
  }
}
</style>