<template>
  <div class="flex flex-col h-full">
    <Header></Header>
    <div class="flex-1 flex">
      <Sidebar></Sidebar>
      <div class="flex-1 p-3 h-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
</script>
