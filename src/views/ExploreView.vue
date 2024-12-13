<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Masonry from 'masonry-layout';
import imagesMock from '../mock-image';
import StyleSelector from '@/components/StyleSelector.vue';
import { useImageStore } from '@/stores/imageStore';

const currentStyle = ref('masonry');
const masonryGrid = ref<HTMLElement | null>(null);
const imageStore = useImageStore();
let masonryInstance: any = null;

const initMasonry = async () => {
  if (masonryGrid.value && currentStyle.value === 'masonry') {
    masonryInstance = new Masonry(masonryGrid.value, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-item',
      percentPosition: true,
    });
    masonryInstance.layout();
  }
};

onMounted(async () => {
  setTimeout(() => initMasonry(), 200);
  await imageStore.searchImages('test');
});

// Reactivar Masonry cuando se cambie a estilo 'masonry'
watch(currentStyle, (newStyle) => {
  if (newStyle === 'masonry') {
    setTimeout(() => initMasonry(), 200);
  } else if (masonryInstance) {
    masonryInstance.destroy();
    masonryInstance = null;
  }
});
</script>

<template>
  <div class="flex justify-between items-center mb-5">
    <h1 class="text-cyan-600 text-2xl">Explora entre miles de imágenes</h1>
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
        v-for="image in imagesMock"
        :key="image.id"
        :class="[
          'grid-item group relative overflow-hidden',
          currentStyle === 'masonry' ? 'masonry-item' : '',
          currentStyle === 'grid' ? 'grid-item-style' : '',
          currentStyle === 'card' ? 'card-item' : '',
        ]"
      >
        <div
          class="image-wrapper"
          :class="{ 'square': currentStyle !== 'masonry' }"
        >
          <img
            :src="image.imageURL"
            class="w-full h-full object-cover"
            alt="Imagen"
          />
        </div>
        <div
          v-if="currentStyle !== 'card'"
          class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          <h2 class="font-bold text-lg truncate">{{ image.title }}</h2>
          <p class="text-sm italic">{{ image.author }}</p>
          <p v-if="currentStyle === 'masonry'" class="text-sm line-clamp-3">{{ image.description }}</p>
        </div>
        <div v-if="currentStyle === 'card'" class="h-full p-4 bg-white text-black">
          <h2 class="font-bold text-lg truncate">{{ image.title }}</h2>
          <p class="text-sm italic">{{ image.author }}</p>
          <p class="text-sm line-clamp-3">{{ image.description }}</p>
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