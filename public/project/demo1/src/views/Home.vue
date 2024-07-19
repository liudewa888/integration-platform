<template>
  <div class="web-main">{{ path }}</div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const path = computed(() => {
  return route.path;
});
</script>

<style scoped lang="less">
.web-main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
</style>
