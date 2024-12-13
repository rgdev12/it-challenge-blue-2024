<script setup lang="ts">
import { ref, defineEmits } from 'vue';

// Importamos los íconos como componentes
import MasonryIcon from '@/components/icons/IconLayoutBoard.vue';
import GridIcon from '@/components/icons/IconLayoutGrid.vue';
import CardsIcon from '@/components/icons/IconChalkBoard.vue';

const emit = defineEmits(['update:style']);

const styles = [
  { value: 'masonry', label: 'Mosaico', icon: MasonryIcon },
  { value: 'grid', label: 'Cuadrícula', icon: GridIcon },
  { value: 'card', label: 'Informativo', icon: CardsIcon },
];

const dropdownOpen = ref(false);
const selectedStyle = ref(styles[0]);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectStyle = (style: typeof styles[0]) => {
  selectedStyle.value = style;
  emit('update:style', style.value);
  dropdownOpen.value = false;
};
</script>

<template>
  <div class="relative inline-block">
    <!-- Botón principal -->
    <button 
      class="w-52 p-2 border rounded bg-white flex justify-between items-center"
      @click="toggleDropdown"
    >
      <span class="flex items-center">
        <component :is="selectedStyle.icon" class="mr-2" />
        {{ selectedStyle.label }}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Dropdown -->
    <ul 
      v-if="dropdownOpen" 
      class="absolute z-10 w-52 bg-white border rounded shadow-lg mt-2"
    >
      <li 
        v-for="style in styles" 
        :key="style.value" 
        class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
        @click="selectStyle(style)"
      >
        <component :is="style.icon" class="mr-2" />
        {{ style.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  max-height: 200px;
  overflow-y: auto;
}

button, ul {
  transition: all 0.3s ease;
}
</style>