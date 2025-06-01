<template>
  <template v-for="project in projects" :key="'submenu-' + project.id">
    <a-sub-menu>
      <template #icon>
        <MenuItemIcon icon="icon-menu" />
      </template>
      <template #title>{{ project.name_cn || project.name }}</template>
      
      <!-- 固定的子菜单项 -->
      <a-menu-item @click="handleMenuClick(project, 'dataset')">
        <template #icon>
          <MenuItemIcon icon="icon-menu" />
        </template>
        <span>{{ $t('menu.dataset') }}</span>
      </a-menu-item>
      <a-menu-item @click="handleMenuClick(project, 'field-management')">
        <template #icon>
          <MenuItemIcon icon="icon-menu" />
        </template>
        <span>{{ $t('menu.field-management') }}</span>
      </a-menu-item>
      <a-menu-item @click="handleMenuClick(project, 'storage-config')">
        <template #icon>
          <MenuItemIcon icon="icon-menu" />
        </template>
        <span>{{ $t('menu.storage-config') }}</span>
      </a-menu-item>
    </a-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MenuItemIcon from './menu-item-icon.vue';
import { listProjects, type Project } from '@/api/project';

const router = useRouter();
const projects = ref<Project[]>([]);
const loading = ref(false);
let fetchPromise: Promise<Project[]> | null = null;

// 获取项目列表
const fetchProjects = async () => {
  // 如果已经在加载中，返回之前的Promise
  if (loading.value) {
    return fetchPromise;
  }
  
  // 如果有一个正在进行的请求，返回该请求的Promise
  if (fetchPromise) {
    return fetchPromise;
  }

  loading.value = true;
  try {
    fetchPromise = listProjects();
    projects.value = await fetchPromise;
    console.log('项目列表数据:', projects.value);  // 添加日志
  } catch (error) {
    console.error('获取项目列表失败:', error);
  } finally {
    loading.value = false;
    fetchPromise = null;
  }
};

// 处理菜单点击事件
const handleMenuClick = (project: Project, menuType: string) => {
  if (menuType === 'dataset') {
    router.push({
      path: `/project/${project.id}/dataset`
    });
  } else if (menuType === 'field-management') {
    router.push({
      path: `/project/${project.id}/field-management`
    });
  } else if (menuType === 'storage-config') {
    router.push({
      path: `/project/${project.id}/storage-config`
    });
  }
};

onMounted(() => {
  fetchProjects();
});
</script>

<style lang="scss" scoped></style> 