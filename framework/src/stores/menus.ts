import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMenusStore = defineStore('menus', () => {
  const menus = ref([]);
  const topMenus = ref([]);
  const leftMenus = ref([]);
  const topMenuActiveIndex = ref(0);
  // 将数据转换为树形结构
  const setMenus = (val) => {
    menus.value = val;
  };
  const setTopMenus = (val) => {
    topMenus.value = val;
  };
  const setLeftMenus = (val) => {
    leftMenus.value = val;
  };
  const setTopMenuActiveIndex = (val) => {
    topMenuActiveIndex.value = val;
  };
  return {
    menus,
    topMenus,
    leftMenus,
    setMenus,
    setTopMenus,
    setLeftMenus,
    topMenuActiveIndex,
    setTopMenuActiveIndex
  };
});
