<template>
  <div class="moox-page">
    <div class="moox-inner">
      <a-spin :loading="loading">
        <template v-if="currentProject && currentDataset">
          <a-card :title="currentProject.name" :subtitle="'数据集: ' + currentDataset.dataset_name">
            <template #extra>
              <a-space>
                <a-button type="primary" @click="handleAddData">
                  <template #icon><icon-plus /></template>
                  添加数据
                </a-button>
                <a-button @click="handleRefresh">
                  <template #icon><icon-refresh /></template>
                  刷新
                </a-button>
              </a-space>
            </template>
            
            <a-descriptions :column="2" bordered>
              <a-descriptions-item label="数据集ID">{{ currentDataset.dataset_id }}</a-descriptions-item>
              <a-descriptions-item label="数据类型">
                {{ currentDataset.data_type === 1 ? '静态数据' : '时序数据' }}
              </a-descriptions-item>
              <a-descriptions-item label="时序周期" v-if="currentDataset.data_type === 2">
                {{ currentDataset.time_series_period }}
              </a-descriptions-item>
              <a-descriptions-item label="数据校验规则">
                {{ currentDataset.validation_rule || '无' }}
              </a-descriptions-item>
              <a-descriptions-item label="备注" :span="2">
                {{ currentDataset.remark || '无' }}
              </a-descriptions-item>
            </a-descriptions>

            <!-- 数据列表 -->
            <div class="margin-top">
              <a-table
                :data="tableData"
                :loading="tableLoading"
                :pagination="pagination"
                @page-change="onPageChange"
                @page-size-change="onPageSizeChange"
              >
                <template #columns>
                  <a-table-column title="ID" data-index="id" />
                  <a-table-column title="创建时间" data-index="create_time" />
                  <a-table-column title="操作" align="center">
                    <template #cell="{ record }">
                      <a-space>
                        <a-button type="text" size="small" @click="handleEdit(record)">
                          <template #icon><icon-edit /></template>
                          编辑
                        </a-button>
                        <a-button type="text" status="danger" size="small" @click="handleDelete(record)">
                          <template #icon><icon-delete /></template>
                          删除
                        </a-button>
                      </a-space>
                    </template>
                  </a-table-column>
                </template>
              </a-table>
            </div>
          </a-card>
        </template>
        <template v-else>
          <a-result status="404" subtitle="未找到项目或数据集信息">
            <template #extra>
              <a-button type="primary" @click="router.push('/project/create-project')">
                创建新项目
              </a-button>
            </template>
          </a-result>
        </template>
      </a-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { listProjects, type Project, type Dataset } from '@/api/project';

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const tableLoading = ref(false);

// 定义表格数据类型
interface TableDataItem {
  id: number;
  create_time: string;
}

const tableData = ref<TableDataItem[]>([]);

// 分页配置
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
  showTotal: true,
  showJumper: true,
  showPageSize: true
});

// 获取当前项目和数据集信息
const currentProject = computed(() => {
  const projectId = Number(route.query.projectId);
  return projects.value.find(p => p.id === projectId);
});

const currentDataset = computed(() => {
  const datasetId = Number(route.query.datasetId);
  return currentProject.value?.datasets.find(d => d.dataset_id === datasetId);
});

// 项目列表
const projects = ref<Project[]>([]);

// 获取项目列表
const fetchProjects = async () => {
  loading.value = true;
  try {
    projects.value = await listProjects();
  } catch (error) {
    console.error('获取项目列表失败:', error);
    Message.error('获取项目列表失败');
  } finally {
    loading.value = false;
  }
};

// 获取数据集数据
const fetchDatasetData = async () => {
  if (!currentProject.value || !currentDataset.value) return;
  
  tableLoading.value = true;
  try {
    // TODO: 实现获取数据集数据的API调用
    // const response = await api.getDatasetData({
    //   projectId: currentProject.value.id,
    //   datasetId: currentDataset.value.dataset_id,
    //   page: pagination.value.current,
    //   pageSize: pagination.value.pageSize
    // });
    // tableData.value = response.data;
    // pagination.value.total = response.total;
    
    // 临时模拟数据
    tableData.value = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      create_time: new Date().toLocaleString()
    }));
    pagination.value.total = 100;
  } catch (error) {
    console.error('获取数据集数据失败:', error);
    Message.error('获取数据集数据失败');
  } finally {
    tableLoading.value = false;
  }
};

// 页面变化处理
const onPageChange = (page: number) => {
  pagination.value.current = page;
  fetchDatasetData();
};

const onPageSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize;
  pagination.value.current = 1;
  fetchDatasetData();
};

// 操作处理函数
const handleAddData = () => {
  // TODO: 实现添加数据的逻辑
  Message.info('添加数据功能开发中');
};

const handleEdit = (record: any) => {
  // TODO: 实现编辑数据的逻辑
  Message.info('编辑数据功能开发中');
};

const handleDelete = (record: any) => {
  // TODO: 实现删除数据的逻辑
  Message.info('删除数据功能开发中');
};

const handleRefresh = () => {
  fetchDatasetData();
};

onMounted(() => {
  fetchProjects();
  fetchDatasetData();
});
</script>

<style lang="scss" scoped>
.margin-top {
  margin-top: 16px;
}
</style>
