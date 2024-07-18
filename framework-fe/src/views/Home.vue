<template>
  <WujieVue width="100%" height="100%" :name="currentProject"></WujieVue>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useMenusStore } from '@/stores/menus';
import { useRoute } from 'vue-router';
import wujieVue from "wujie-vue3";
const route = useRoute();
const store = useMenusStore();
const urls = window.appConfig.iframe_url;

const currentProject = computed(() => {
  return urls[store.topMenuActiveIndex];
});

// const url = currentProject.value + '/#' + route.fullPath
// const url = computed(() => {
//   return currentProject.value + '/#' + route.fullPath;
// });

watchEffect(() => {
  wujieVue.bus.$emit("vue3-router-change", `${route.fullPath}`);
})
</script>
