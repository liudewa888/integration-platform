<template>
  <div class="flex flex-col h-full">
    <Header></Header>
    <div class="flex-1 flex overflow-auto">
      <Sidebar></Sidebar>
      <div class="flex-1 h-full flex flex-col overflow-auto">
        <Breadcrumb />
        <RouterView/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Breadcrumb from './components/Breadcrumb.vue';
</script>
