<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Footer from '../components/Footer.vue'
import Masonry from 'masonry-layout';
import { useRouter } from 'vue-router';

const router = useRouter();

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

const goToExplore = () => {
  router.push({ name: 'Explore' });
}

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
        <h1 class="text-4xl font-bold">Descubre el mundo en las imágenes</h1>
        <p class="text-xl mt-4">Adéntrate en un mundo lleno de inspiración</p>
        <button class="mt-6 text-base bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 md:py-4 md:px-8 lg:py-3 lg:px-10 rounded animate-custom-pulse"
          @click="goToExplore">
          Comenzar a explorar
        </button>
      </div>
    </div>
    <Footer/>
  </main>
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