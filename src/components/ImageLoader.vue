<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, markRaw } from 'vue';
import phrases from '@/utils/phrases';
import IconMoodHappy from '@/components/icons/IconMoodHappy.vue';
import CameraIcon from '@/components/icons/IconCamera.vue';
import IconPhotoScan from './icons/IconPhotoScan.vue';
import IconPhotoSearch from './icons/IconPhotoSearch.vue';

const icons = [markRaw(IconMoodHappy), markRaw(CameraIcon), markRaw(IconPhotoScan), markRaw(IconPhotoSearch)];
const iconColors = [
  'text-amber-400',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500'
];
const currentIconIndex = ref(0);
const currentIcon = ref(icons[currentIconIndex.value]);
const currentPhrase = ref(phrases[Math.floor(Math.random() * phrases.length)]);
let intervalId: number | null = null;

const stopLoader = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

onMounted(() => {
  startLoader();
});

onBeforeUnmount(() => {
  stopLoader();
});

// Función para controlar la animación de íconos
const startLoader = () => {
  intervalId = setInterval(() => {
    // Actualizar el ícono
    currentIconIndex.value = (currentIconIndex.value + 1) % icons.length;
    currentIcon.value = icons[currentIconIndex.value];

    // Cambiar la frase aleatoriamente
    currentPhrase.value = phrases[Math.floor(Math.random() * phrases.length)];
  }, 2000); // Cambia cada segundo
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full">
    <!-- Ícono actual -->
    <div class="mb-4">
      <component 
        :is="currentIcon" 
        :class="['w-12 h-12 animate-fade-in', iconColors[currentIconIndex]]" 
      />
    </div>

    <!-- Frase aleatoria -->
    <p class="text-lg text-gray-800 text-center">{{ currentPhrase }}</p>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-custom-fade-in {
  animation: fade-in 0.5s ease-in-out;
}
</style>
