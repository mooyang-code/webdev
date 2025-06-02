<template>
  <a-menu
    :breakpoint="layoutType != 'layoutHead' ? 'xl' : undefined"
    :mode="'vertical'"
    :theme="asideDark ? 'dark' : 'light'"
    :collapsed="collapsed"
    :auto-scroll-into-view="true"
    :auto-open-selected="true"
    :accordion="isAccordion"
    :selected-keys="selectedKeys"
    @menu-item-click="onMenuItem"
  >
    <MenuItem :route-tree="props.routeTree" />
  </a-menu>
  <!-- 简化的调试信息 -->
  <div v-if="showDebugInfo" style="position: fixed; top: 10px; right: 10px; background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 4px; font-size: 12px; z-index: 9999;">
    <div>当前路由名: {{ currentRoute.name }}</div>
    <div>选中菜单Keys: {{ JSON.stringify(selectedKeys) }}</div>
  </div>
</template>

<script setup lang="ts">
import MenuItem from "@/layout/components/Menu/menu-item.vue";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "@/store/modules/theme-config";
import { useRoutesConfigStore } from "@/store/modules/route-config";
import { useRoutingMethod } from "@/hooks/useRoutingMethod";
import { ref, computed } from "vue";

const router = useRouter();
const routerStore = useRoutesConfigStore();
const { currentRoute } = storeToRefs(routerStore);
const themeStore = useThemeConfig();
const { collapsed, isAccordion, layoutType, asideDark } = storeToRefs(themeStore);

// 调试信息开关
const showDebugInfo = ref(false);

// 计算菜单选中的keys
const selectedKeys = computed(() => {
  const keys = [currentRoute.value.name];
  console.log('计算选中keys:', keys, '当前路由:', currentRoute.value);
  return keys;
});

// 按 Ctrl+D 切换调试信息显示
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'd') {
      e.preventDefault();
      showDebugInfo.value = !showDebugInfo.value;
    }
  });
}

interface Props {
  routeTree: Menu.MenuOptions[];
}
// props的数据类型
// type类型参考：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<Props>(), {
  routeTree: () => []
});

/**
 * @description 菜单点击事件
 * @param {String} key
 */
const onMenuItem = (key: string) => {
  console.log('菜单点击:', key);
  console.log('当前路由名:', currentRoute.value.name);
  
  // 处理当前项目的数据管理菜单项（直接使用路由name）
  if (key === 'data-object-list' || key === 'data-data-list') {
    // 从当前路由获取项目ID，如果没有则需要用户选择项目
    const currentProjectId = router.currentRoute.value.params.projectId;
    if (currentProjectId) {
      const targetPath = key === 'data-object-list' 
        ? `/data-management/${currentProjectId}/object-list`
        : `/data-management/${currentProjectId}/data-list`;
      
      router.push(targetPath);
      
      // 手动更新currentRoute以确保菜单选中状态正确
      const routeStore = useRoutesConfigStore();
      routeStore.setCurrentRoute({
        name: key,
        path: targetPath,
        params: { projectId: currentProjectId },
        query: router.currentRoute.value.query,
        meta: {}
      });
      console.log('手动更新数据管理currentRoute:', key);
      return;
    } else {
      // 如果没有当前项目ID，跳转到数据概览页面
      router.push('/data-management/overview');
      return;
    }
  }
  
  // 处理当前项目的项目管理菜单项（直接使用路由name）
  if (key === 'dataset' || key === 'field-management' || key === 'storage-config') {
    // 从当前路由获取项目ID
    const currentProjectId = router.currentRoute.value.params.projectId;
    if (currentProjectId) {
      const targetPath = `/project/${currentProjectId}/${key}`;
      
      router.push(targetPath);
      
      // 手动更新currentRoute以确保菜单选中状态正确
      const routeStore = useRoutesConfigStore();
      routeStore.setCurrentRoute({
        name: key,
        path: targetPath,
        params: { projectId: currentProjectId },
        query: router.currentRoute.value.query,
        meta: {}
      });
      console.log('手动更新项目管理currentRoute:', key);
      return;
    } else {
      // 如果没有当前项目ID，跳转到创建项目页面
      router.push('/project/create-project');
      return;
    }
  }
  
  // 处理其他项目的数据管理菜单项（带项目ID的key）
  if (key.startsWith('data-object-list-') || key.startsWith('data-data-list-')) {
    const parts = key.split('-');
    const projectId = parts[parts.length - 1]; // 获取项目ID
    
    if (key.startsWith('data-object-list-')) {
      router.push(`/data-management/${projectId}/object-list`);
      // 跳转到其他项目后，currentRoute应该被正常更新
    } else if (key.startsWith('data-data-list-')) {
      router.push(`/data-management/${projectId}/data-list`);
      // 跳转到其他项目后，currentRoute应该被正常更新
    }
    return;
  }
  
  // 处理其他项目的项目管理菜单项（带项目ID的key）
  if (key.startsWith('dataset-') || key.startsWith('field-management-') || key.startsWith('storage-config-')) {
    const parts = key.split('-');
    const projectId = parts[parts.length - 1]; // 获取项目ID
    const menuType = parts.slice(0, -1).join('-'); // 获取菜单类型
    
    router.push(`/project/${projectId}/${menuType}`);
    // 跳转到其他项目后，currentRoute应该被正常更新
    return;
  }
  
  // 原有的路由处理逻辑
  const { findLinearArray } = useRoutingMethod();
  const find = findLinearArray(key);
  // 路由存在则存入并跳转，不存在则跳404
  if (find) {
    router.push(find.path);
  } else {
    router.push("/404");
  }
};
</script>

<style lang="scss" scoped></style>
