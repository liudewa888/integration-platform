<template>
  <div>
    <h2>Vue2示例--首页</h2>
    <div class="content" style="text-align: center">
      <p>
        当前vue版本
        <el-tag style="vertical-align: text-top" size="small">2.6.11</el-tag>
      </p>
      <p>
        当前element-ui版本
        <el-tag style="vertical-align: text-top" size="small">2.15.6</el-tag>
      </p>
      <p>
        <el-button @click="open">仓库地址</el-button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  comments: {},
  data() {
    return {
      open: window.open,
    };
  },
};
</script>

<style>
:root {
  --host-color: #f16b5f;
}
</style>
