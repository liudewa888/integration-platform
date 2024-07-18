<template>
  <router-view></router-view>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
window.$wujie?.bus.$on("vue3-router-change", (path) => {
  router.push(path)
});
</script>

<style scoped></style>
