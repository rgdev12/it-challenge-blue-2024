import { ref } from "vue";

export function useDarkMode() {
  const isDarkMode = ref(false); // Estado reactivo del modo oscuro

  const applyTheme = () => {
    const userPreference = localStorage.getItem("theme");
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (userPreference === "dark" || (!userPreference && systemPreference)) {
      isDarkMode.value = true;
      document.documentElement.classList.add("dark");
    } else {
      isDarkMode.value = false;
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle("dark", isDarkMode.value);
    localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
  };

  return { isDarkMode, applyTheme, toggleDarkMode };
}