import { useUserInfo } from "@/types/UserInfo";
import axios from "axios";
import Cookies from "js-cookie";

// const axiosInstance = axios.create({
//   baseURL: '/api',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   timeout: 5000
// });

// axiosInstance.interceptors.request.use(
//   config => {
//     const accessToken = Cookies.get('accessToken');
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");

      try {
        const response = await axios.post("/api/user/refresh", {
          refreshToken: refreshToken,
        });

        const { accessToken, newRefreshToken } = response.data;

        console.log("Access token renewed:", accessToken);

        Cookies.set("accessToken", accessToken, { sameSite: "strict" });
        Cookies.set("refreshToken", newRefreshToken, { sameSite: "strict" });

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.log("refreshToken 만료 또는 갱신 실패", refreshError);
        const { logout } = useUserInfo();
        logout();
      }
    }

    return Promise.reject(error);
  }
);

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// async function fetchCall<T>(url: string, method: 'get' | 'post' | 'put' | 'delete', data?: any): Promise<T> {
//   const config = {
//     method,
//     url,
//     ...(data && { data })
//   };
//   return axiosInstance(config);
// }

// export default fetchCall;
