<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Masonry from 'masonry-layout';
import imagesMock from '../mock-image';
import StyleSelector from '@/components/StyleSelector.vue';

const currentStyle = ref('masonry');
const masonryGrid = ref<HTMLElement | null>(null);
let masonryInstance: any = null;

const initMasonry = async () => {
  if (masonryGrid.value) {
    masonryInstance = new Masonry(masonryGrid.value, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-item',
      percentPosition: true,
    });
    masonryInstance.layout();
  }
}

onMounted(async () => {
  setTimeout(() => {
    initMasonry();
  }, 200)
});
</script>

<template>
  <div class="flex justify-between items-center mb-5">
    <h1 class="text-cyan-600 text-2xl">Explora entre miles de imágenes</h1>
    <StyleSelector @update:style="currentStyle = $event" />
  </div>
  <div class="relative overflow-hidden">
    <div class="masonry-grid" ref="masonryGrid">
      <div
        v-for="image in imagesMock"
        :key="image.id"
        class="masonry-item group relative overflow-hidden"
      >
        <img
          :src="image.imageURL"
          class="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110"
          alt="Imagen"
        />
        <div
          class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          <h2 class="font-bold text-lg truncate">{{ image.title }}</h2>
          <p class="text-sm italic">{{ image.author }}</p>
          <p class="text-sm line-clamp-3">{{ image.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.masonry-grid {
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  width: auto;
}

.masonry-item {
  width: calc(50% - 10px);
  margin-left: 10px;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
}

.masonry-item img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.masonry-item .line-clamp-3 {
  display: -webkit-box;
  display: box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 640px) {
  .masonry-item {
    width: calc(33.33% - 10px); /* Ancho para tablets */
  }
}

@media (min-width: 1024px) {
  .masonry-item {
    width: calc(25% - 10px); /* Ancho para pantallas grandes */
  }
}
</style>
