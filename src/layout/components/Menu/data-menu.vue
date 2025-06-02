<template>
  <template v-for="project in projects" :key="'data-submenu-' + project.id">
    <a-sub-menu>
      <template #icon>
        <MenuItemIcon icon="icon-menu" />
      </template>
      <template #title>{{ project.name_cn || project.name }}</template>
      
      <!-- 数据管理的子菜单项 -->
      <a-menu-item :key="getObjectListKey(project)">
        <template #icon>
          <div class="menu-dot"></div>
        </template>
        <span>{{ $t('menu.object-list') }}</span>
      </a-menu-item>
      <a-menu-item :key="getDataListKey(project)">
        <template #icon>
          <div class="menu-dot"></div>
        </template>
        <span>{{ $t('menu.data-list') }}</span>
      </a-menu-item>
    </a-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import MenuItemIcon from './menu-item-icon.vue';
import { listProjects, type Project } from '@/api/project';

const route = useRoute();
const projects = ref<Project[]>([]);
const loading = ref(false);
let fetchPromise: Promise<Project[]> | null = null;

// 获取当前路由的项目ID
const currentProjectId = computed(() => {
  return route.params.projectId as string;
});

// 简化的key生成逻辑：当前项目返回路由name，其他项目返回唯一标识符
const getObjectListKey = (project: Project) => {
  const isCurrentProject = project.id.toString() === currentProjectId.value;
  console.log(`对象列表key计算: 项目${project.id}, 当前项目ID: ${currentProjectId.value}, 是否当前项目: ${isCurrentProject}`);
  
  // 对于当前项目，始终返回路由name以确保正确选中
  if (isCurrentProject) {
    return 'data-object-list';
  }
  // 对于其他项目，返回唯一标识符
  return `data-object-list-${project.id}`;
};

const getDataListKey = (project: Project) => {
  const isCurrentProject = project.id.toString() === currentProjectId.value;
  console.log(`数据列表key计算: 项目${project.id}, 当前项目ID: ${currentProjectId.value}, 是否当前项目: ${isCurrentProject}`);
  
  // 对于当前项目，始终返回路由name以确保正确选中
  if (isCurrentProject) {
    return 'data-data-list';
  }
  // 对于其他项目，返回唯一标识符
  return `data-data-list-${project.id}`;
};

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
    console.log('数据管理项目列表:', projects.value);
  } catch (error) {
    console.error('获取数据管理项目列表失败:', error);
  } finally {
    loading.value = false;
    fetchPromise = null;
  }

  return projects.value;
};

// 暴露给父组件调用
defineExpose({
  fetchProjects
});

onMounted(() => {
  fetchProjects();
});
</script>

<style scoped>
.menu-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--color-text-3);
  margin: 0 auto;
}
</style> 