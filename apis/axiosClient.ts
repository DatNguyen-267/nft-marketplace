import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
// export const baseURL = 'http://10.0.0.185:3000/api/v1/'
export const BaseURL = 'http://167.71.210.6:3000/api/v1/'

const axiosClient = axios.create({
  // baseURL: 'http://10.0.0.185:3000/api/v1/',
  baseURL: BaseURL,
  headers: {
    // 'Content-Type': 'application/json',
  },
})
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config
  },
  function (error: AxiosError) {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response
  },
  function (error: AxiosError) {
    return Promise.reject(error)
  }
)
export default axiosClient
