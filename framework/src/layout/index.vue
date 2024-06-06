<template>
  <div class="flex flex-col h-full">
    <Header></Header>
    <div class="flex-1 flex">
      <div class="w-[200px] border-[1px] border-solid border-[#ccc]"></div>
      <div class="flex-1 p-3 h-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from './components/Header.vue';
</script>
