<template>
  <template v-for="item in props.routeTree" :key="item.name">
    <!-- 项目管理菜单特殊处理 -->
    <template v-if="item.name === 'project'">
      <a-sub-menu>
        <template #icon v-if="item.meta.svgIcon || item.meta.icon">
          <MenuItemIcon :svg-icon="item.meta.svgIcon" :icon="item.meta.icon" />
        </template>
        <template #title>{{ $t(`menu.${item.meta.title}`) }}</template>
        
        <!-- 固定的新建项目菜单项 -->
        <a-menu-item :key="'create-project'" @click="router.push('/project/create-project')">
          <template #icon>
            <MenuItemIcon icon="icon-menu" />
          </template>
          <span>{{ $t('menu.create-project') }}</span>
        </a-menu-item>
        
        <!-- 渲染动态项目菜单 -->
        <ProjectMenu />
      </a-sub-menu>
    </template>
    <!-- 数据管理菜单特殊处理 -->
    <template v-else-if="item.name === 'data-management'">
      <a-sub-menu>
        <template #icon v-if="item.meta.svgIcon || item.meta.icon">
          <MenuItemIcon :svg-icon="item.meta.svgIcon" :icon="item.meta.icon" />
        </template>
        <template #title>{{ $t(`menu.${item.meta.title}`) }}</template>
        
        <!-- 固定的数据概览菜单项 -->
        <a-menu-item :key="'data-overview'">
          <template #icon>
            <MenuItemIcon icon="icon-menu" />
          </template>
          <span>{{ $t('menu.data-overview') }}</span>
        </a-menu-item>
        
        <!-- 固定的数据同步菜单项 -->
        <a-menu-item :key="'data-sync'">
          <template #icon>
            <MenuItemIcon icon="icon-menu" />
          </template>
          <span>{{ $t('menu.data-sync') }}</span>
        </a-menu-item>
        
        <!-- 固定的对象列表菜单项 -->
        <a-menu-item :key="'data-object-list'">
          <template #icon>
            <MenuItemIcon icon="icon-menu" />
          </template>
          <span>{{ $t('menu.object-list') }}</span>
        </a-menu-item>
        
        <!-- 固定的数据列表菜单项 -->
        <a-menu-item :key="'data-data-list'">
          <template #icon>
            <MenuItemIcon icon="icon-menu" />
          </template>
          <span>{{ $t('menu.data-list') }}</span>
        </a-menu-item>
      </a-sub-menu>
    </template>
    <!-- 其他菜单项保持原有逻辑 -->
    <template v-else>
      <a-sub-menu v-if="menuShow(item)" :key="item.name">
        <template #icon v-if="item.meta.svgIcon || item.meta.icon">
          <MenuItemIcon :svg-icon="item.meta.svgIcon" :icon="item.meta.icon" />
        </template>
        <template #title>{{ $t(`menu.${item.meta.title}`) }}</template>
        <MenuItem :route-tree="item.children" />
      </a-sub-menu>
      <a-menu-item v-else-if="aMenuShow(item)" :key="item?.name">
        <template #icon v-if="item.meta.svgIcon || item.meta.icon">
          <MenuItemIcon :svg-icon="item.meta.svgIcon" :icon="item.meta.icon" />
        </template>
        <span>{{ $t(`menu.${item.meta.title}`) }}</span>
      </a-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import MenuItem from "@/layout/components/Menu/menu-item.vue";
import MenuItemIcon from "@/layout/components/Menu/menu-item-icon.vue";
import ProjectMenu from "@/layout/components/Menu/project-menu.vue";
import { useMenuMethod } from "@/hooks/useMenuMethod";
import { useRouter } from 'vue-router';

defineOptions({ name: "MenuItem", inheritAttrs: false });

interface Props {
  routeTree: Menu.MenuOptions[];
}
// props的数据类型
// type类型参考：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<Props>(), {
  routeTree: () => []
});

const router = useRouter();
const { menuShow, aMenuShow } = useMenuMethod();
</script>

<style lang="scss" scoped></style>
