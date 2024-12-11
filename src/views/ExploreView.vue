<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Masonry from 'masonry-layout';

const imageModules = import.meta.glob('@/assets/images/banner-home/*.{jpg,jpeg,png,webp}') as Record<string, () => Promise<{ default: string }>>;
const images = ref<string[]>([]);
const imageVisible = ref<boolean[]>([]);
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

const revealImages = () => {
  images.value.forEach((_, index) => {
    setTimeout(() => {
      imageVisible.value[index] = true;
      masonryInstance?.layout();
    },
    Math.random() * 1000);
  });
};

const loadImages = async () => {
  const importedImages = await Promise.all(
    Object.values(imageModules).map(async (module: () => Promise<{ default: string }>) => {
      const image = await module();
      return image.default;
    })
  );
  images.value = importedImages;
};

onMounted(async () => {
  await loadImages();
  imageVisible.value = new Array(images.value.length).fill(false);
  await initMasonry();
  revealImages();
});
</script>

<template>
  <h1 class="mb-5 text-cyan-600 text-2xl">Explora entre miles de imágenes</h1>
  <div class="relative overflow-hidden">
    <div class="masonry-grid" ref="masonryGrid">
      <img v-for="(image, index) in images" :key="index" :src="image"
      :class="['masonry-item', { 'opacity-0': !imageVisible[index], 'animate-fade-in': imageVisible[index] }]" alt="Imagen" />
    </div>
  </div>
</template>

<style>
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
  overflow: hidden;
}

.masonry-item img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  } 
}

.animate-fade-in { animation: fadeIn 1s ease-in-out forwards; }

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.animate-custom-pulse {
  animation: pulse 1.5s infinite;
}
</style>
