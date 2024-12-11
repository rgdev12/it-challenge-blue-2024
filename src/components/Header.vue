<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useImageStore } from '@/stores/imageStore';

const query = ref('');
const router = useRouter();
const imageStore = useImageStore();

const search = () => {
  imageStore.searchImages(query.value);
  router.push({ name: 'SearchResults' });
};
</script>

<template>
  <header class="fixed w-full bg-white drop-shadow-lg z-50">
    <div class="container mx-auto py-4 px-3 flex justify-between space-x-8 items-center">
      <router-link to="/explore">
        <img class="w-36" src="@/assets/images/Logo.png" alt="Logo">
      </router-link>

      <input v-model="query"
        @keydown.enter="search"
        placeholder="Buscar imágenes..."
        class="w-full p-2 rounded outline-none border border-gray-600"
      />
    </div>
  </header>
</template>