<template>
  <div class="header_crumb">
    <ButtonCollapsed />
    <div class="project-selector">
      <a-select
        v-model="selectedProjectId"
        :options="projectOptions"
        @change="onProjectChange"
        placeholder="请选择项目"
        style="width: 220px; margin-left: 16px;"
        allow-search
        :loading="loading"
      >
        <template #empty>
          <div style="text-align: center; padding: 12px;">
            <div>暂无项目</div>
            <a-button type="text" size="small" @click="handleCreateProject" style="margin-top: 8px;">
              新建项目
            </a-button>
          </div>
        </template>
      </a-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ButtonCollapsed from "@/layout/components/Header/components/button-collapsed/index.vue";
import { listProjects, type Project } from '@/api/project';

const router = useRouter();
const route = useRoute();

// 项目相关状态
const projects = ref<Project[]>([]);
const selectedProjectId = ref<string | number>();
const loading = ref(false);

// 计算项目选项
const projectOptions = computed(() => {
  return projects.value.map(project => ({
    label: project.name_cn || project.name,
    value: project.id,
    disabled: false
  }));
});

// 获取项目列表
const fetchProjects = async () => {
  loading.value = true;
  try {
    projects.value = await listProjects();
    console.log('获取项目列表成功:', projects.value);
    
    if (projects.value.length > 0) {
      // 如果当前路由包含项目ID，则设置为选中状态
      if (route.params.projectId) {
        selectedProjectId.value = Number(route.params.projectId);
      } else if (!selectedProjectId.value) {
        // 只有当下拉框还没有选中任何项目时，才默认选中第一个项目并跳转
        // 这通常发生在首次加载页面时
        const firstProject = projects.value[0];
        selectedProjectId.value = firstProject.id;
        console.log('首次加载，默认选中第一个项目:', firstProject);
        // 自动跳转到第一个项目的数据集页面
        router.push(`/project/${firstProject.id}/dataset`);
      }
      // 如果selectedProjectId.value已经有值，说明用户之前已经选择过项目，
      // 现在只是导航到了一个不包含项目ID的页面（如数据概览），
      // 这时应该保持下拉框的选中状态，不要跳转
    }
  } catch (error) {
    console.error('获取项目列表失败:', error);
  } finally {
    loading.value = false;
  }
};

// 项目切换事件
const onProjectChange = (projectId: string | number) => {
  console.log('切换项目:', projectId);
  
  // 获取当前路由信息，判断应该跳转到新项目的哪个页面
  const currentRouteName = route.name;
  const currentPath = route.path;
  
  console.log('当前路由名:', currentRouteName, '当前路径:', currentPath);
  
  let targetPath = '';
  
  // 根据当前路由类型决定跳转目标
  if (currentRouteName === 'dataset' || currentRouteName === 'field-management' || currentRouteName === 'storage-config') {
    // 如果当前在项目管理页面，跳转到新项目的相同页面
    targetPath = `/project/${projectId}/${currentRouteName}`;
  } else if (currentRouteName === 'data-overview' || currentRouteName === 'data-sync' || currentRouteName === 'data-object-list' || currentRouteName === 'data-data-list') {
    // 如果当前在数据管理页面，跳转到新项目的相同页面
    let pageType = '';
    if (currentRouteName === 'data-overview') {
      pageType = 'overview';
    } else if (currentRouteName === 'data-sync') {
      pageType = 'sync';
    } else if (currentRouteName === 'data-object-list') {
      pageType = 'object-list';
    } else {
      pageType = 'data-list';
    }
    targetPath = `/data-management/${projectId}/${pageType}`;
  } else {
    // 其他情况默认跳转到数据集页面
    targetPath = `/project/${projectId}/dataset`;
  }
  
  console.log('目标路径:', targetPath);
  router.push(targetPath);
};

// 新建项目
const handleCreateProject = () => {
  router.push('/project/create-project');
};

// 监听路由变化，更新选中的项目
watch(() => route.params.projectId, (newProjectId) => {
  if (newProjectId) {
    selectedProjectId.value = Number(newProjectId);
  }
  // 移除了 else 分支，这样当路由没有项目ID时，下拉框会保持原来的选择
});

onMounted(() => {
  fetchProjects();
});
</script>

<style lang="scss" scoped>
.header_crumb {
  display: flex;
  align-items: center;
  width: 100%;
}

.project-selector {
  display: flex;
  align-items: center;
}
</style>
