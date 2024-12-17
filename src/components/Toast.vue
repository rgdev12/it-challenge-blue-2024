<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: 'Ocurrió un error'
  },
  type: {
    type: String,
    default: 'error'
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const visible = ref(false)

onMounted(() => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, props.duration)
})

const toastClass = computed(() => {
  return {
    error: 'bg-red-500',
    success: 'bg-green-500',
    info: 'bg-blue-500'
  }[props.type] || 'bg-gray-500'
})
</script>

<template>
  <div
    
    class="fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white transition-transform duration-300 ease-in-out z-50"
    :class="toastClass"
  >
    <span>{{ message }}</span>
  </div>
</template>