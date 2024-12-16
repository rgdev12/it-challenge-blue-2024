<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CalendarIcon from '@/components/icons/IconCalendarEvent.vue';
import CameraIcon from '@/components/icons/IconCamera.vue';
import Footer from '../components/Footer.vue'
import { useRoute, useRouter } from 'vue-router';
import { useImageStore } from '@/stores/imageStore';
import type { ImageInfoData } from '@/utils/intefaces/ImageInterfaces';

const imageStore = useImageStore();
const route = useRoute();
const router = useRouter();
const id = ref<string | null>(null);

const imageInfo = ref<ImageInfoData>();

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
  
  if (!res) {
    router.push({path: '/explore'});
  }

  imageInfo.value = res?.data;
}

const getMonthName = (month: number): string => {
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio", 
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  return months[month - 1];
};

// Función genérica que nos servirá para formatear un objeto Date a texto
const formatDate = (date: Date): string => {
  const day = date.getDate();
  const monthName = getMonthName(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day} de ${monthName} del ${year}`;
};

// Función para convertir un timestamp (en segundos) a texto
const formatTimestampToText = (timestamp: number | string): string => {
  if (timestamp === '') return '';
  const date = new Date(Number(timestamp) * 1000);
  return formatDate(date);
};

// Función para formatear una fecha con tiempo (YYYY-MM-DD HH:mm:ss) a texto
const formatDateFromString = (dateTime: string): string => {
  if (dateTime === '') return '';
  const [datePart] = dateTime.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return formatDate(date);
};

// Función para convertir un timestamp (en segundos) a formato dd-mm-yyyy
const timestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 px-3 mb-4">
      <div class="container mx-auto border border-gray-400 rounded p-4">
        <section class="flex flex-wrap gap-5">
          <div class="flex-1 min-w-full sm:min-w-[calc(50%-10px)] box-border">
            <img :src="imageInfo?.url_g" alt="Imagen" class="rounded-md mx-auto">
          </div>
          <div class="flex-1 min-w-full sm:min-w-[calc(50%-10px)] box-border">
            <h1 class="text-gray-800 text-3xl font-semibold">{{ imageInfo?.title }}</h1>
            <p>Por <span class="italic">{{ imageInfo?.owner.username }}</span></p>
            <p class="text-sm">{{ imageInfo?.owner.location }}</p>

            <p class="mt-5">
              {{ imageInfo?.description }}
            </p>

            <div class="mt-3 flex space-x-4">
              <div class="flex items-stretch sm:items-center space-x-2 text-gray-400">
                <CalendarIcon />
                <p>Publicado: {{ formatTimestampToText(imageInfo?.dates.posted ?? '') }}</p>
              </div>
              <div class="flex items-stretch sm:items-center space-x-2 text-gray-400">
                <CameraIcon />
                <p>Tomada: {{ formatDateFromString(imageInfo?.dates.taken ?? '') }}</p>
              </div>
            </div>
          </div>
        </section>

        <hr class="my-5 border-gray-400">

        <section>
          <h2 class="text-xl font-semibold mb-4">Comentarios ({{ imageInfo?.comments.length }})</h2>
          
          <div class="flex flex-wrap gap-5">
            <div v-if="imageInfo?.comments && imageInfo?.comments.length > 0" class="flex-1 min-w-full sm:min-w-[calc(50%-10px)] box-border">
              <div
                v-for="comment in imageInfo?.comments"
                class="border border-gray-300 shadow-md p-3 rounded-md mb-5"
              >
                <div class="flex justify-between">
                  <p class="text-blue-500 font-semibold text-lg">{{ comment.realname || comment.authorname }}</p>
                  <p class="text-gray-500">{{ timestampToDate(Number(comment.datecreate)) }}</p>
                </div>
                <p class="mt-2 text-gray-600" v-html="comment._content"></p>
              </div>
            </div>

            <div class="flex-1 min-w-full sm:min-w-[calc(50%-10px)] box-border">
              <h2 class="text-xl font-semibold mb-4">Etiquetas</h2>
            </div>
          </div>
        </section>
      </div>
    </div>
    <Footer />
  </div>
</template>