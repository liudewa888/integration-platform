<template>
  <div>
    <h2>location处理</h2>
    <div class="content">
      <p>当用户访问location来获取当前的url时，wujie统一拦截并回填子应用正确的地址</p>
      <h3>1、获取 location.host 的值</h3>
      <p>
      <div>{{ host }}</div>
      </p>
      <h3>2、获取 window.location.host 的值</h3>
      <p>
      <div>{{ windowHost }}</div>
      </p>
      <h3>3、修改window.location.href</h3>
      <p>子应用修改location.href，会将当前的子应用的shadow删除并且替换成一个iframe</p>
      <p>
      <div>如果子应用配置路由同步，浏览器可通过回退回到子应用</div>
      </p>
      <el-button type="primary" @click="handleClick">跳转后台管理</el-button>
    </div>
  </div>
</template>

<script>
const host = location.host;
const windowHost = window.location.host;
export default {
  name: "About",
  data() {
    return {
      host,
      windowHost,
    };
  },
  mounted() {
    console.log("vue2 location mounted");
  },
  methods: {
    handleClick() {
      const url = 'http://www.yztpsg.cn:9081'
      if (window.__WUJIE?.degrade || !window.Proxy || !window.CustomElementRegistry) {
        window.$wujie.location.href = url;
      } else {
        window.location.href = url
      }
    }
  }
};
</script>

<style scoped></style>
