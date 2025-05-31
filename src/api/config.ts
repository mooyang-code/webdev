import axios from 'axios';

// 认证信息配置
export const AUTH_INFO = {
  app_id: "moox_frontend",
  app_key: "2521e0d21b6be0347b72bca93904a0dd"
};

// 获取当前页面的IP地址
const getCurrentHost = () => {
  const url = window.location.href;
  const urlObj = new URL(url);
  return urlObj.hostname;
};

// 创建axios实例
export const api = axios.create({
  baseURL: `http://${getCurrentHost()}:18105`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'app_id': AUTH_INFO.app_id,
    'app_key': AUTH_INFO.app_key
  }
});

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data?.ret_info?.code === 0) {
      return data;
    }
    return Promise.reject(data?.ret_info);
  },
  (error) => {
    return Promise.reject(error.response?.data?.ret_info || error);
  }
); 