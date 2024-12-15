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

const formatDate = (date: Date): string => {
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} de ${monthName} del ${year}`;
};

// Función para convertir un timestamp (en segundos) a texto
const formatTimestampToText = (timestamp: number | string): string => {

  if (timestamp !== '') {
    const date = new Date(Number(timestamp) * 1000); // Convertimos a milisegundos
    return formatDate(date);
  }

  return ''
};

const formatDateFromString = (dateTime: string): string => {
  if (dateTime === '') {
    return ''
  }

  const [datePart] = dateTime.split(" ");
  const [year, month, day] = datePart.split("-");
  return `${day} de ${getMonthName(parseInt(month))} del ${year}`;
};

const getMonthName = (month: number): string => {
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio", 
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  return months[month - 1];
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 px-3">
      <div class="container mx-auto border border-gray-400 rounded p-4">
        <div class="flex flex-wrap gap-5">
          <div class="flex-1 min-w-full sm:min-w-[calc(50%-10px)] box-border">
            <img :src="imageInfo?.url_m" alt="Imagen" class="rounded-md mx-auto">
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