<template>
  <div class="moox-page">
    <a-card title="简介">
      <div>
        <p>MooX 一款基于 Vue、TypeScript、Vite5、Pinia、arco.design开源的后台管理框架，使用目前最新技术栈开发。</p>
        <p>融合了全新的UI框架，高度可自定义的主题功能使得用户可以根据自身需求轻松定制界面。</p>
        <p>代码全注释，可提供参考和学习。</p>
      </div>
    </a-card>
    <a-card class="margin-top" title="项目信息">
      <a-descriptions :column="2" bordered>
        <a-descriptions-item v-for="item of projectInfo" :key="item.label" :label="item.label">
          <a-link :href="item.value" v-if="item.link" target="_blank">{{ item.label }}</a-link>
          <span v-else>{{ item.value }}</span>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card class="margin-top" title="生产环境依赖">
      <a-descriptions :data="dependencies" bordered :column="2" />
    </a-card>
    <a-card class="margin-top" title="开发环境依赖">
      <a-descriptions :data="devDependencies" bordered :column="2" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import packageJson from "../../../package.json";
const projectInfo: any = [
  {
    label: "版本号",
    link: false,
    value: packageJson.version
  },
  {
    label: "发布时间",
    link: false,
    value: "2025-06-18"
  },
  {
    label: "GitHub",
    link: true,
    value: ""
  },
  {
    label: "Gitee",
    link: true,
    value: ""
  },
  {
    label: "文档地址",
    link: true,
    value: "http://101.126.93.137:81/"
  },
  {
    label: "预览地址",
    link: true,
    value: "http://101.126.93.137/#/login"
  }
];

const dependencies = ref<any>([]);
const devDependencies = ref<any>([]);

const init = () => {
  dependencies.value.length = 0;
  devDependencies.value.length = 0;
  Object.entries(packageJson.dependencies).forEach(item => {
    dependencies.value.push({ label: item[0], value: item[1] });
  });
  Object.entries(packageJson.devDependencies).forEach(item => {
    devDependencies.value.push({ label: item[0], value: item[1] });
  });
};
init();
</script>

<style lang="scss" scoped>
.margin-top {
  margin-top: $margin;
}
</style>
