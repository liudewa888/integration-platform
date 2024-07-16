<template>
  <div class="web-main">
    <h2>Demo1</h2>
  </div>

</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped lang="less">
.web-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 0 8px;

  .textarea {
    width: 100%;
    height: 160px;
  }

  .date {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 4px 0;

    >button {
      width: 60px;
      height: 100%;
    }
  }

  .btn {
    width: 100%;
    height: 40px;
    margin: 4px 0;
  }

  .num {
    font-size: 20px;
  }

  .result {
    width: 100%;
    height: 360px;
    border: 1px solid #ccc;
    overflow-y: auto;
    margin-top: 4px;

    .content {
      border-bottom: 2px dashed #ddd;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
      }

      .list {
        width: 100%;

        li {
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: 12px;

          .num {
            font-size: 14px;
          }

          .red {
            color: red;
          }
        }
      }
    }
  }

}
</style>
