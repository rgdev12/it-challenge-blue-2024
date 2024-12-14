<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useImageStore } from '@/stores/imageStore';
import PhotoSearchIcon from '@/components/icons/IconPhotoSearch.vue';

const query = ref('');
const router = useRouter();
const imageStore = useImageStore();

const search = () => {
  imageStore.query = query.value;
  
  if (imageStore.query) {
    
  }
};
</script>

<template>
  <header class="fixed w-full bg-white drop-shadow-lg z-50">
    <div class="container mx-auto py-4 px-3 flex justify-between items-center">
      <router-link to="/explore">
        <img class="w-36" src="@/assets/images/Logo.png" alt="Logo">
      </router-link>

      <div class="flex items-center space-x-2">
        <input v-model="query"
          @keydown.enter="search"
          placeholder="Buscar imágenes..."
          class="p-2 rounded outline-none border border-gray-400"
        />

        <button class="border border-gray-400 hover:bg-slate-200 p-2 rounded" @click="search">
          <PhotoSearchIcon class="text-gray-500"/>
        </button>
      </div>
    </div>
  </header>
</template>