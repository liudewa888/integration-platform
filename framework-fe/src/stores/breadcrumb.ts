import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  const breadcrumbData = ref('');
  const setBreadcrumbData = (val) => {
    breadcrumbData.value = val;
  };
  return {
    breadcrumbData,
    setBreadcrumbData
  };
});
