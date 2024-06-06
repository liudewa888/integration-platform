<template>
  <el-button @click="change('/dist1/')">切换1</el-button>
  <el-button @click="change('/dist2/')">切换2</el-button>
  <el-button @click="change('/dist3/')">切换3</el-button>
  <el-button @click="change('/dist4/')">切换4</el-button>
  <WujieVue width="100%" height="100%" :name="url" :url="url"></WujieVue>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const url = ref('/dist1/');
const change = (val) => {
  url.value = val;
};
</script>
