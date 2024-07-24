<template>
  <div>
    <div class="nav" v-if="route.path !== '/postMessage'">
      <router-link to="/home">首页</router-link> |
      <router-link to="/dialog">弹窗</router-link> |
      <router-link to="/location">路由</router-link> |
      <router-link to="/contact">通信</router-link> |
    </div>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
watch(
  () => route.path,
  (n) => {
    if (n) {
      window.$wujie?.bus.$emit("sub-route-change", "dist1", n);
    }
  }
);
window.$wujie?.bus.$on("vue3-router-change", (path) => {
  router.push(path);
});
</script>

<style scoped>
.nav {
  width: 100%;
  border-bottom: 2px dashed #ccc;
  text-align: center;
  margin-bottom: 16px;

  a {
    font-size: 24px;
    font-weight: 600;
    text-decoration: none;
    color: #20202099;
  }

  .router-link-active {
    color: #202020;
  }
}
</style>
