<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Masonry from 'masonry-layout';

const imageModules = import.meta.glob('@/assets/images/banner-home/*.{jpg,jpeg,png,webp}') as Record<string, () => Promise<{ default: string }>>;
const images = ref<string[]>([]);
const imageVisible = ref<boolean[]>([]);
const masonryGrid = ref<HTMLElement | null>(null);

let masonryInstance: any = null;

onMounted(async  () => {
  await loadImages();
  imageVisible.value = new Array(images.value.length).fill(false);
  await initMasonry();
  revealImages();
});

const loadImages = async () => {
  const importedImages = await Promise.all(
    Object.values(imageModules).map(async (module: () => Promise<{ default: string }>) => {
      const image = await module();
      return image.default;
    })
  );
  images.value = importedImages;
};

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
    }, Math.random() * 1000);
  });
};

window.addEventListener('resize', () => {
  masonryInstance?.layout();
});
</script>

<template>
  <main class="min-h-screen flex flex-col justify-between">
    <div class="relative h-screen bg-gray-900 overflow-hidden">
      <div class="masonry-grid" ref="masonryGrid">
        <img v-for="(image, index) in images" :key="index" :src="image"
        :class="['masonry-item', { 'opacity-0': !imageVisible[index], 'animate-fade-in': imageVisible[index] }]" alt="Imagen" />
      </div>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black bg-opacity-50">
        <h1 class="text-4xl font-bold">Un lugar con muchas imágenes</h1>
        <p class="text-xl mt-4">Adéntrate en un mundo lleno de inspiración</p>
        <button class="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">Explorar</button>
      </div>
    </div>
    <footer class="bg-gray-800 text-white py-4 text-center"> <p>&copy; 2024 Tu Sitio Web. Todos los derechos reservados.</p> </footer>
  </main>
</template>

<style>
.masonry-grid {
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  width: auto;
}

.masonry-item {
  width: calc(25% - 10px);
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
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  } 
}

.animate-fade-in { animation: fadeIn 1s ease-in-out forwards; }
</style>