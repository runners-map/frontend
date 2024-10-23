import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      toast.error('로그인 세션이 만료되었습니다. 다시 로그인 해주세요');
      const router = useRouter();
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchCall<T>(url: string, method: 'get' | 'post' | 'put' | 'delete', data?: any): Promise<T> {
  const config = {
    method,
    url,
    ...(data && { data })
  };
  return axiosInstance(config);
}

export default fetchCall;
