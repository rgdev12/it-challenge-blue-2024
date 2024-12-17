<script setup lang="ts">
import { ref, watch, onMounted, computed, markRaw } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useImageStore } from '@/stores/imageStore';
import PhotoSearchIcon from '@/components/icons/IconPhotoSearch.vue';
import IconBrightnessUp from './icons/IconBrightnessUp.vue';
import IconMoonStars from './icons/IconMoonStars.vue';
import { useDarkMode } from "@/utils/useDarkMode";

const { isDarkMode, toggleDarkMode, applyTheme } = useDarkMode();
const query = ref('');
const router = useRouter();
const route = useRoute();
const imageStore = useImageStore();

const currentIcon = computed(() => (isDarkMode.value ? markRaw(IconMoonStars) : markRaw(IconBrightnessUp)));

watch(() => route.query.q, (newQuery) => {
  query.value = newQuery?.toString() || '';
});

onMounted(() => {
  applyTheme();
});

const search = async () => {
  imageStore.query = query.value;
  imageStore.currentPage = 1;
  
  router.push({ path: '/explore', query: { q: query.value } });

  const params = {
    type: query.value ? 'search' : 'grid',
    tag: query.value,
  };

  await imageStore.searchImages(params);
};
</script>

<template>
  <header class="fixed w-full bg-white dark:bg-gray-800 drop-shadow-lg z-50">
    <div class="container mx-auto py-4 px-3 flex justify-between items-center">
      <router-link to="/explore">
        <div class="flex items-center space-x-1 sm:space-x-2">
          <img class="h-11" src="@/assets/images/dreamboard-logo.png" alt="Logo">
          <p class="text-2xl hidden sm:block"><span class="text-orange-500 font-bold">Dream</span><span class="text-yellow-500 font-bold">Board</span></p>
        </div>
      </router-link>

      <div class="flex items-center space-x-3 sm:space-x-5">
        <div class="flex items-center space-x-2">
            <input v-model="query"
              @keydown.enter="search"
              placeholder="Buscar imágenes..."
              class="p-2 rounded outline-none border border-gray-400 bg-transparent"
            />

          <button class="border border-gray-400 hover:bg-slate-200 p-2 rounded" @click="search">
            <PhotoSearchIcon class="text-gray-500"/>
          </button>
        </div>

        <button @click="toggleDarkMode">
          <component :is="currentIcon" class="dark:text-gray-300 text-cyan-500"/>
        </button>
      </div>
    </div>
  </header>
</template>