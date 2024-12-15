<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CalendarIcon from '@/components/icons/IconCalendarEvent.vue';
import CameraIcon from '@/components/icons/IconCamera.vue';
import Footer from '../components/Footer.vue'
import { useRoute } from 'vue-router';
import { useImageStore } from '@/stores/imageStore';
import type { ImageInfo } from '@/utils/intefaces/ImageInterfaces';

const imageStore = useImageStore();
const route = useRoute();
const id = ref<string | null>(null);

const imageInfo = ref<ImageInfo | null >();

onMounted(async () => {
  const routeId = route.params.id;
  id.value = Array.isArray(routeId) ? routeId[0] : routeId;

  getImageInfo();
});

const getImageInfo = async () => {
  const params = {
    type: 'info',
    photo_id: id.value ?? ''
  }
  
  const res = await imageStore.getImagenInfo(params);
  imageInfo.value = res;

  console.log('res 2', imageInfo.value);
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 px-3">
      <div class="container mx-auto border border-gray-400 rounded p-4">
        <div class="flex flex-wrap gap-5">
          <div class="flex-1 min-w-full sm:min-w-[calc(50%-10px)] box-border">
            <img src="@/assets/images/banner-home/banner-img-2.jpg" alt="Imagen" class="rounded-md">
          </div>
          <div class="flex-1 min-w-full sm:min-w-[calc(50%-10px)] box-border">
            <h1 class="text-gray-800 text-3xl font-semibold">Título de la imagen</h1>
            <p>Por <span class="italic">Nombre usuario</span></p>

            <p class="mt-5 text-">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate maiores, in magni autem saepe architecto cum culpa, itaque esse ab laudantium consectetur aspernatur reiciendis explicabo facere numquam unde accusantium cumque?
            </p>

            <div class="mt-3 flex space-x-4">
              <div class="flex items-stretch sm:items-center space-x-2 text-gray-400">
                <CalendarIcon />
                <p>Publicado: 15 de agosto, 2023</p>
              </div>
              <div class="flex items-stretch sm:items-center space-x-2 text-gray-400">
                <CameraIcon />
                <p>Tomada: 10 de agosto, 2023</p>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-5 border-gray-400">

        <div>
          <h2 class="text-xl font-semibold">Comentarios</h2>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>