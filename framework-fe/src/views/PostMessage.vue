<template>
  <!--单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由 -->
  <div>
    <div class="title">主应用</div>
    <div class="main-content">
      <div style="padding-bottom: 10px">接收的消息：{{ message }}</div>
      <el-button style="margin-right: 10px" @click="() => postMessageToVue2()">
        发送消息给vue2子应用
      </el-button>
      <el-button @click="() => postMessageToVue3()">发送消息给vue2子应用的iframe</el-button>
    </div>
    <div class="sub-content">
      <WujieVue name="dist2"></WujieVue>
    </div>
  </div>
</template>

<script>
import wujieVue from 'wujie-vue3';
export default {
  data() {
    return {
      message: ''
      // vue2Url: 'http://localhost:9084/#/postMessage'
    };
  },
  methods: {
    postMessageToVue2(message) {
      const subAppWindow = window.document.querySelector('iframe[name="dist2"]').contentWindow;
      const data = message || { type: 'vue2', message: "hello, i'm main app" };
      subAppWindow.postMessage(JSON.stringify(data), '*');
    },
    postMessageToVue3(message) {
      const iframeWindow = window.document
        .querySelector("wujie-app[data-wujie-id='dist2']")
        .shadowRoot.querySelector('iframe').contentWindow;
      const data = message || { type: 'vue3', message: "hello, i'm main app" };
      iframeWindow.postMessage(JSON.stringify(data), '*');
    },
    handleMessage(e) {
      try {
        let res = JSON.parse(e.data);
        if (res.type === 'main') {
          this.message = res.message;
        }
        if (res.type === 'vue2') {
          this.postMessageToVue2(res);
        }
        if (res.type === 'vue3') {
          this.postMessageToVue3(res);
        }
      } catch (err) {
        return;
      }
    }
  },
  watch: {
    '$route.path': function () {
      wujieVue.bus.$emit('vue3-router-change', `${this.$route.path}`);
    }
  },
  mounted() {
    wujieVue.bus.$emit('vue3-router-change', `${this.$route.path}`);
    window.addEventListener('message', this.handleMessage);
  },
  unMounted() {
    window.removeEventListener('message', this.handleMessage);
  }
};
</script>

<style lang="css" scoped>
.title {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.main-content {
  margin: 40px;
  font-size: 16px;
}
.sub-content {
  margin: 40px;
  height: 500px;
  border: 1px dashed #ccc;
}
</style>
