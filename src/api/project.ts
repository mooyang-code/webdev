import { api, AUTH_INFO } from './config';

// 项目列表的类型定义
export interface Dataset {
  dataset_id: number;
  dataset_name: string;
  data_type: number;
  time_series_period: string;
  validation_rule: string;
  remark: string;
}

export interface Project {
  id: number;
  name: string;
  name_cn: string;  // 项目中文名
  remark: string;
  create_time: string;
  datasets: Dataset[];
}

interface ListProjectsResponse {
  ret_info: {
    code: number;
    msg: string;
  };
  projects: Project[];
}

// 获取项目列表
export const listProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.post<ListProjectsResponse>('/trpc.storage.metadata.MetaAdmin/ListProjects', {
      auth_info: AUTH_INFO
    });
    console.log('ListProjects接口返回', response);
    return (response as unknown as ListProjectsResponse).projects || [];
  } catch (error) {
    console.error('获取项目列表失败:', error);
    return [];
  }
}; 