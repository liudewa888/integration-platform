<template>
  <WujieVue width="100%" height="100%" :name="url" :url="url"></WujieVue>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const url = ref('/dist1/');
const change = (val) => {
  url.value = val;
};
</script>
