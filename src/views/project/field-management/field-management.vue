<template>
  <div class="field-management-container">
    <a-card class="general-card" title="字段管理">
      <template #extra>
        <a-button type="primary">
          <template #icon><icon-plus /></template>
          新增字段
        </a-button>
      </template>
      <a-table :data="tableData" :loading="loading" :pagination="pagination" @page-change="onPageChange">
        <template #columns>
          <a-table-column title="字段名称" data-index="fieldName" />
          <a-table-column title="字段类型" data-index="fieldType" />
          <a-table-column title="是否必填" data-index="required">
            <template #cell="{ record }">
              <a-tag :color="record.required ? 'red' : 'green'">
                {{ record.required ? '是' : '否' }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="描述" data-index="description" />
          <a-table-column title="创建时间" data-index="createTime" />
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
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Message } from '@arco-design/web-vue';
import { IconPlus, IconEdit, IconDelete } from '@arco-design/web-vue/es/icon';

// 表格数据
const tableData = ref([]);
const loading = ref(false);
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
});

// 获取表格数据
const fetchData = async () => {
  loading.value = true;
  try {
    // TODO: 调用接口获取数据
    // 模拟数据
    tableData.value = [
      {
        id: 1,
        fieldName: 'name',
        fieldType: 'string',
        required: true,
        description: '名称字段',
        createTime: '2024-03-20 10:00:00',
      },
      {
        id: 2,
        fieldName: 'age',
        fieldType: 'number',
        required: false,
        description: '年龄字段',
        createTime: '2024-03-20 10:00:00',
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

// 编辑字段
const handleEdit = (record: any) => {
  console.log('编辑字段', record);
  // TODO: 实现编辑功能
};

// 删除字段
const handleDelete = (record: any) => {
  console.log('删除字段', record);
  // TODO: 实现删除功能
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.field-management-container {
  padding: 20px;
}
.general-card {
  min-height: calc(100vh - 120px);
}
</style> 