import axios, {InternalAxiosRequestConfig} from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "antd";

/**
 * 后端接口返回结构
 * */
export type ResponseResult<T = any> = {
  code: number;
  msg: string;
  data: T;
};

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = {
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/production',
    timeout: 60000
  };

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 白名单接口不带token
        if (config.url === "/user/login") {
          return config
        }
        // 一般会请求拦截里面加token，用于后端的验证
        const token = localStorage.getItem("token") as string
        if(token) {
          // config.headers!.Authorization = token;
          config.headers['token'] = token
        }

        return config;
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 直接返回res，当然你也可以只返回res.data
        const responseResult = res.data
        // 定制修改
        if (responseResult?.code === 200 || res?.config?.url === '/api/user-login') {
          if (responseResult?.code === 401) {
            message.error(responseResult?.msg)
          }
          return responseResult
        }
        // 请求失败码特殊处理
        switch (responseResult?.code) {
          case 401:
            message.destroy()
            message.error(responseResult?.msg).then(res => {
              sessionStorage.setItem("redirect_url", window.location.pathname)
              window.location.href=""
            })
            break
          case 500:
            message.destroy()
            message.error(responseResult?.msg || '服务故障，请稍后再试')
            break
        }
        // 系统如果有自定义code也可以在这里处理
        // return Promise.reject(responseResult?.msg || `接口报错`);
      },
      (err: any) => {
        // 这里用来处理http常见错误，进行全局提示
        let message = "";
        switch (err.response.status) {
          case 400:
            message = "请求错误(400)";
            break;
          case 401:
            message = "未授权，请重新登录(401)";
            // 这里可以做清空storage并跳转到登录页的操作
            break;
          case 403:
            message = "拒绝访问(403)";
            break;
          case 404:
            message = "请求出错(404)";
            break;
          case 408:
            message = "请求超时(408)";
            break;
          case 500:
            message = "服务器错误(500)";
            break;
          case 501:
            message = "服务未实现(501)";
            break;
          case 502:
            message = "网络错误(502)";
            break;
          case 503:
            message = "服务不可用(503)";
            break;
          case 504:
            message = "网络超时(504)";
            break;
          case 505:
            message = "HTTP版本不受支持(505)";
            break;
          default:
            message = `连接出错(${err.response.status})!`;
        }
        // 这里错误消息可以使用全局弹框展示出来
        // 比如element plus 可以使用 ElMessage
        // ElMessage({
        //   showClose: true,
        //   message: `${message}，请检查网络或联系管理员！`,
        //   type: "error",
        // });
        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        return Promise.reject(err.response);
      }
    );
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResponseResult<T>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ResponseResult<T>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ResponseResult<T>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResponseResult<T>> {
    return this.instance.delete(url, config);
  }

  /**
   * 上传表单数据, 自动设置Content-Type为multipart/form-data
   * @param url
   * @param data
   * @param config
   */
  public postForm<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ResponseResult<T>> {
    return this.instance.postForm(url, data, config);
  }
}

// 默认导出Request实例
export default new Request({})
