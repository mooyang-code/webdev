<template>
  <div class="banner_box">
    <div class="banner_title">
      <SvgIcon name="snow" size="25" />
      {{ title }}
    </div>
    <div class="banner_img">
      <SvgIcon name="数据时代" size="100%" />
    </div>
  </div>
</template>
<script setup lang="ts">
// 全局title
const title = import.meta.env.VITE_GLOB_APP_TITLE + " 一站式量化平台";
</script>

<style lang="scss" scoped>
.banner_box {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 650px;
  height: 100%;
  padding: 30px;
  .banner_title {
    position: absolute;
    display: flex;
    column-gap: $margin-text;
    align-items: center;
    font-size: $font-size-title-1;
    font-weight: bold;
    color: $color-primary;
  }
  .banner_img {
    flex: 1;
  }
}
</style>
