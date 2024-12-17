<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CalendarIcon from '@/components/icons/IconCalendarEvent.vue';
import CameraIcon from '@/components/icons/IconCamera.vue';
import IconMessageCircle from '@/components/icons/IconMessageCircle.vue';
import IconArrowsDiagonal from '@/components/icons/IconArrowsDiagonal.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconDownload from '@/components/icons/IconDownload.vue';
import Footer from '../components/Footer.vue'
import { useRoute, useRouter } from 'vue-router';
import { useImageStore } from '@/stores/imageStore';
import type { ImageInfoData } from '@/utils/intefaces/ImageInterfaces';
import Toast from '../components/Toast.vue';
import DOMPurify from 'dompurify';
import ImageLoader from '@/components/ImageLoader.vue';

const errorMessage = ref('')
const imageStore = useImageStore();
const route = useRoute();
const router = useRouter();
const id = ref<string | null>(null);

const imageInfo = ref<ImageInfoData>();
const isModalOpen = ref(false);

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

const searchTag = (tag: string) => {
  router.push({ path: '/explore', query: { q: tag } })
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

function sanitizeContent(content: string) {
  return DOMPurify.sanitize(content);
}

const downloadImage = async () => {
  try {
    const response = await fetch(imageInfo.value?.url_g ?? '');
    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'image-downloaded-from-dreamboard.jpg';
    link.click();

    URL.revokeObjectURL(link.href);
  } catch (error) {
    showError('No pudimos descargar tu imagen, esto puede deberse a una configuración de tu navegador');
  }
}

const showError = (messageQ: string) => {
  const message = messageQ || '¡Algo salió mal! Inténtalo de nuevo.';
  errorMessage.value = message;
  setTimeout(() => {
    errorMessage.value = '';
  }, 5000)
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div v-if="!imageStore.isLoading" class="flex-1 px-3 mb-4">
      <div class="container mx-auto p-4">
        <div class="border border-gray-400 rounded p-4">
          <Toast
            v-if="errorMessage"
            :message="errorMessage"
            type="error"
            :duration="5000"
          />
          <section class="flex flex-wrap gap-5">
            <div class="flex-1 min-w-full sm:min-w-[calc(50%-10px)] box-border flex justify-center">
              <div class="relative inline-block">
                <button
                  @click="isModalOpen = true"
                  class="absolute top-2 right-2 p-1 text-white"
                >
                  <IconArrowsDiagonal />
                </button>
                <button
                  @click="downloadImage"
                  class="absolute top-2 right-10 p-1 text-white rounded"
                >
                  <IconDownload />
                </button>
                <img :src="imageInfo?.url_g" alt="Imagen" class="rounded-md">
              </div>
            </div>
            <div class="flex-1 min-w-full sm:min-w-[calc(50%-10px)] box-border">
              <h1 class="text-gray-800 dark:text-white text-3xl font-semibold break-words">{{ imageInfo?.title }}</h1>
              <p>Por <span class="italic">{{ imageInfo?.owner.username }}</span></p>
              <p class="text-sm">{{ imageInfo?.owner.location }}</p>

              <p class="mt-5" v-html="sanitizeContent(imageInfo?.description ?? '')"></p>

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

              <div class="flex items-center space-x-2 mt-5">
                <IconMessageCircle />
                <p class="font-semibold">{{ imageInfo?.comments.length }} Comentarios</p>
              </div>
            </div>

            <!-- Modal -->
            <transition name="fade">
              <div
                v-if="isModalOpen"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 px-3 sm:px-0"
              >
                <div class="relative rounded-lg shadow-lg max-w-4xl border-2">
                  <button
                    @click="isModalOpen = false"
                    class="absolute right-0 p-1 text-white z-50"
                  >
                    <IconClose />
                  </button>

                  <img :src="imageInfo?.url_g" alt="Imagen maximizada" class="rounded-md mx-auto max-h-[80vh] object-contain">
                </div>
              </div>
            </transition>
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
                  <p class="mt-2 text-gray-600 dark:text-gray-300 break-words" v-html="sanitizeContent(comment._content)"></p>
                </div>
              </div>

              <div class="flex-1 min-w-full sm:min-w-[calc(50%-10px)] box-border">
                <h2 class="text-xl font-semibold mb-4">Etiquetas</h2>

                <div class="flex flex-wrap gap-3">
                  <button
                    v-for="tag in imageInfo?.tags"
                    class="border px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-all text-black"
                    @click="searchTag(tag)"
                  >
                    {{ tag }}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <ImageLoader v-if="imageStore.isLoading" class="my-32" />
    <Footer />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
