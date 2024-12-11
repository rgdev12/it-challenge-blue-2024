<script setup lang="ts">
import Header from '@/components/Header.vue';
</script>

<template>
  <main class="bg-[#F0F7FF] min-h-screen">
    <Header />

    <section class="pt-24 px-3 container mx-auto">
      <router-view />
    </section>
  </main>
</template>
