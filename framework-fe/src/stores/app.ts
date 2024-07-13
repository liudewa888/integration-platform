import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const systemName = ref('');
  const setSystemName = (val) => {
    systemName.value ='| ' + val;
  };
  return {
    systemName,
    setSystemName
  };
});
