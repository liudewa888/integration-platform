<template>
  <div class="breadcrumbmain" v-if="breadcrumArr.length">
    <el-breadcrumb :separator="separator">
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item, index) in breadcrumArr.slice(0, -1)"
        :key="index"
      >
        {{ item.title }}</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ breadcrumArr.at(-1).title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { useBreadcrumbStore } from '@/stores/breadcrumb';
export default {
  props: {
    // 面包屑分隔符
    separator: {
      type: String,
      default: '/'
    }
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    breadcrumArr() {
      const breadcrumbStore = useBreadcrumbStore();
      return breadcrumbStore.breadcrumbData;
    }
  },
  methods: {
    change(item, index) {
      if (index + 1 === this.breadcrumArr.length) return;
      const arr = [];
      for (let i = 0; i < this.breadcrumArr.length; i++) {
        arr.push(this.breadcrumArr[i]);
        if (this.breadcrumArr[i].path === item.path) break;
      }
      // breadcrumbStore.setBreadcrumbData(arr);
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcrumbmain {
  ::v-deep .el-breadcrumb {
    height: 54px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding-left: 32px;
    .el-breadcrumb__item {
      cursor: default;
      .el-breadcrumb__inner {
        color: #94a4b7;
      }
      &:last-child {
        .el-breadcrumb__inner {
          > a {
            cursor: default;
            color: #303336;
            font-weight: 600;
          }
        }
      }
    }
    .el-breadcrumb__separator {
      margin: 0 8px;
    }
  }
  .link {
    color: #94a4b7;
  }

  .link:hover {
    color: #4890ff;
  }

  .current {
    cursor: default;
    color: #111111;
    font-weight: 600;
  }
}
</style>
