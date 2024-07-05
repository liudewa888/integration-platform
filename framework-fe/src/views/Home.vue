<template>
  <WujieVue width="100%" height="100%" :name="currentProject" :url="url"></WujieVue>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMenusStore } from '@/stores/menus';
import { useRoute } from 'vue-router';
const route = useRoute();
const store = useMenusStore();
const urls = window.appConfig.iframe_url;

const currentProject = computed(() => {
  return urls[store.topMenuActiveIndex];
});
const url = computed(() => {
  return currentProject.value + '/#' + route.fullPath;
});
</script>
