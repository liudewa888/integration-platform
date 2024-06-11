<template>
  <WujieVue width="100%" height="100%" :name="url" :url="url + '/'"></WujieVue>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMenusStore } from '@/stores/menus';

const store = useMenusStore();
const urls = window.appConfig.iframe_url;

const url = computed(() => {
  return urls[store.topMenuActiveIndex];
});
</script>
