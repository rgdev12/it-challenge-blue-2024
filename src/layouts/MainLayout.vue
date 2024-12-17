<script setup lang="ts">
import Header from '@/components/Header.vue';
</script>

<template>
  <main class="bg-[#F0F7FF] min-h-screen dark:bg-gray-900 dark:text-white">
    <Header />

    <section class="pt-24">
      <router-view />
    </section>
  </main>
</template>
