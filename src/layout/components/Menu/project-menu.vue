<template>
  <template v-for="project in projects" :key="'submenu-' + project.id">
    <a-sub-menu>
      <template #icon>
        <MenuItemIcon icon="icon-menu" />
      </template>
      <template #title>{{ project.name_cn || project.name }}</template>
      
      <!-- 固定的子菜单项 -->
      <a-menu-item :key="getDatasetKey(project)">
        <template #icon>
          <div class="menu-dot"></div>
        </template>
        <span>{{ $t('menu.dataset') }}</span>
      </a-menu-item>
      <a-menu-item :key="getFieldManagementKey(project)">
        <template #icon>
          <div class="menu-dot"></div>
        </template>
        <span>{{ $t('menu.field-management') }}</span>
      </a-menu-item>
      <a-menu-item :key="getStorageConfigKey(project)">
        <template #icon>
          <div class="menu-dot"></div>
        </template>
        <span>{{ $t('menu.storage-config') }}</span>
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
const getDatasetKey = (project: Project) => {
  const isCurrentProject = project.id.toString() === currentProjectId.value;
  console.log(`数据集key计算: 项目${project.id}, 当前项目ID: ${currentProjectId.value}, 是否当前项目: ${isCurrentProject}`);
  
  // 对于当前项目，始终返回路由name以确保正确选中
  if (isCurrentProject) {
    return 'dataset';
  }
  // 对于其他项目，返回唯一标识符
  return `dataset-${project.id}`;
};

const getFieldManagementKey = (project: Project) => {
  const isCurrentProject = project.id.toString() === currentProjectId.value;
  console.log(`字段管理key计算: 项目${project.id}, 当前项目ID: ${currentProjectId.value}, 是否当前项目: ${isCurrentProject}`);
  
  // 对于当前项目，始终返回路由name以确保正确选中
  if (isCurrentProject) {
    return 'field-management';
  }
  // 对于其他项目，返回唯一标识符
  return `field-management-${project.id}`;
};

const getStorageConfigKey = (project: Project) => {
  const isCurrentProject = project.id.toString() === currentProjectId.value;
  console.log(`存储配置key计算: 项目${project.id}, 当前项目ID: ${currentProjectId.value}, 是否当前项目: ${isCurrentProject}`);
  
  // 对于当前项目，始终返回路由name以确保正确选中
  if (isCurrentProject) {
    return 'storage-config';
  }
  // 对于其他项目，返回唯一标识符
  return `storage-config-${project.id}`;
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
    console.log('项目列表数据:', projects.value);
  } catch (error) {
    console.error('获取项目列表失败:', error);
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

<style lang="scss" scoped>
.menu-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--color-text-3);
  margin: 0 auto;
}
</style> 