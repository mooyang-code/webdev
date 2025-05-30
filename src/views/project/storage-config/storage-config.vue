<template>
  <div class="storage-config-container">
    <a-card class="general-card" title="存储配置">
      <template #extra>
        <a-button type="primary">
          <template #icon><icon-plus /></template>
          新增配置
        </a-button>
      </template>
      <a-table :data="tableData" :loading="loading" :pagination="pagination" @page-change="onPageChange">
        <template #columns>
          <a-table-column title="配置名称" data-index="configName" />
          <a-table-column title="存储类型" data-index="storageType">
            <template #cell="{ record }">
              <a-tag :color="getStorageTypeColor(record.storageType)">
                {{ record.storageType }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="状态" data-index="status">
            <template #cell="{ record }">
              <a-tag :color="record.status ? 'green' : 'red'">
                {{ record.status ? '启用' : '禁用' }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="描述" data-index="description" />
          <a-table-column title="更新时间" data-index="updateTime" />
          <a-table-column title="操作" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-button type="text" size="small" @click="handleEdit(record)">
                  <template #icon><icon-edit /></template>
                  编辑
                </a-button>
                <a-button type="text" size="small" @click="handleToggleStatus(record)">
                  <template #icon><icon-swap /></template>
                  {{ record.status ? '禁用' : '启用' }}
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
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Message } from '@arco-design/web-vue';
import { IconPlus, IconEdit, IconDelete, IconSwap } from '@arco-design/web-vue/es/icon';

// 表格数据
const tableData = ref([]);
const loading = ref(false);
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
});

// 获取存储类型对应的颜色
const getStorageTypeColor = (type: string) => {
  const colorMap: Record<string, string> = {
    'local': 'blue',
    's3': 'green',
    'oss': 'orange',
    'cos': 'purple',
  };
  return colorMap[type] || 'gray';
};

// 获取表格数据
const fetchData = async () => {
  loading.value = true;
  try {
    // TODO: 调用接口获取数据
    // 模拟数据
    tableData.value = [
      {
        id: 1,
        configName: '本地存储',
        storageType: 'local',
        status: true,
        description: '本地文件系统存储',
        updateTime: '2024-03-20 10:00:00',
      },
      {
        id: 2,
        configName: 'S3存储',
        storageType: 's3',
        status: false,
        description: 'Amazon S3存储',
        updateTime: '2024-03-20 10:00:00',
      },
    ];
    pagination.value.total = 2;
  } catch (error) {
    Message.error('获取数据失败');
  } finally {
    loading.value = false;
  }
};

// 页码改变
const onPageChange = (current: number) => {
  pagination.value.current = current;
  fetchData();
};

// 编辑配置
const handleEdit = (record: any) => {
  console.log('编辑配置', record);
  // TODO: 实现编辑功能
};

// 切换状态
const handleToggleStatus = (record: any) => {
  console.log('切换状态', record);
  // TODO: 实现状态切换功能
};

// 删除配置
const handleDelete = (record: any) => {
  console.log('删除配置', record);
  // TODO: 实现删除功能
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.storage-config-container {
  padding: 20px;
}
.general-card {
  min-height: calc(100vh - 120px);
}
</style> 