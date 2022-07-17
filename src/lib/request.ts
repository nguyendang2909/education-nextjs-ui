import axios from 'axios';
import { pickBy } from 'lodash';

declare module 'axios' {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
  }
}

const LOCAL_API_URL = process.env.LOCAL_API_URL;

const GLOBAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const API_URL =
//   typeof window !== 'undefined' ? GLOBAL_API_URL : LOCAL_API_URL;

export const API_URL = LOCAL_API_URL || GLOBAL_API_URL;

export const requestAPI = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

requestAPI.interceptors.request.use(async config => {
  if (config.params) {
    config.params = pickBy(
      config.params,
      value => value !== undefined && value !== '',
    );
  }

  return config;
});

requestAPI.interceptors.response.use(
  response => {
    if (response && response.data) {
      if (response.data.data !== undefined) {
        return response.data.data;
      }

      return response.data;
    }

    return response;
  },
  error => {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }

    if (error.toJSON) {
      // @ts-ignore
      throw new Error(error.toJSON().message);
    }

    if (error.request) {
      throw error.request;
    }
  },
);

class RequestService {
  getURL(url: string) {
    if (url.startsWith('http')) {
      return url;
    }

    let exactUrl = url;

    if (url.startsWith('/')) {
      exactUrl = url.slice(1);
    }

    return `${GLOBAL_API_URL}/${exactUrl}`;
  }

  getBackgroundAttribute(url?: string) {
    if (url) {
      return `url("${this.getURL(url)}")`;
    }

    return undefined;
  }
}

export const requestService = new RequestService();

// class RequestAPI {
//   // apiURL: string;
//   // defaultRequest: AxiosInstance;

//   // constructor(apiURL?: string) {
//   //   this.apiURL = apiURL || process.env.API_URL || 'https://leslei.mttn.vn';

//   //   this.defaultRequest = axios.create({
//   //     baseURL: this.apiURL,
//   //     withCredentials: true,
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //   });
//   // }

//   // setServerSide() {
//   //   this.apiURL = process.env.LOCAL_API_URL || 'http://localhost:4000';

//   //   this.defaultRequest = axios.create({
//   //     baseURL: this.apiURL,
//   //     withCredentials: true,
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //   });
//   // }

//   async post<R = any>(
//     url: string,
//     data: Record<string, any>,
//     config?: AxiosRequestConfig,
//   ): Promise<R> {
//     return defaultRequest.post(url, data, config).then(this.handleResponse);
//     // .catch(this.handleError);
//   }

//   async postExtra<R = any>(
//     url: string,
//     data: Record<string, any>,
//     config?: AxiosRequestConfig,
//   ): Promise<R> {
//     return await defaultRequest
//       .post(url, data, config)
//       .then(result => {
//         return this.handleResponse(result, { extra: true });
//       })
//       .catch(this.handleError);
//   }

//   async get<R = any>(url: string, config: AxiosRequestConfig = {}): Promise<R> {
//     if (config.params) {
//       config.params = pickBy(
//         config.params,
//         value => value !== undefined && value !== '',
//       );
//     }

//     return await defaultRequest
//       .get(url, config)
//       .then(this.handleResponse)
//       .catch(this.handleError);
//   }

//   async getExtra<R = any>(
//     url: string,
//     config: AxiosRequestConfig = {},
//   ): Promise<R> {
//     if (config.params) {
//       config.params = pickBy(
//         config.params,
//         value => value !== undefined && value !== '',
//       );
//     }

//     return await defaultRequest
//       .get(url, config)
//       .then(result => {
//         return this.handleResponse(result, { extra: true });
//       })
//       .catch(this.handleError);
//   }

//   async getWithoutErrorHandler<R = any>(
//     url: string,
//     config: AxiosRequestConfig = {},
//   ): Promise<R> {
//     if (config.params) {
//       config.params = pickBy(config.params);
//     }

//     return await defaultRequest.get(url, config).then(this.handleResponse);
//   }

//   async put<R = any>(
//     url: string,
//     data: Record<string, any>,
//     config?: AxiosRequestConfig,
//   ): Promise<R> {
//     return await defaultRequest
//       .put(url, data, config)
//       .then(this.handleResponse)
//       .catch(this.handleError);
//   }

//   async patch<R = any>(
//     url: string,
//     data: Record<string, any>,
//     config?: AxiosRequestConfig,
//   ): Promise<R> {
//     return await defaultRequest
//       .patch(url, data, config)
//       .then(this.handleResponse)
//       .catch(this.handleError);
//   }

//   async delete<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
//     return await defaultRequest
//       .delete(url, config)
//       .then(this.handleResponse)
//       .catch(this.handleError);
//   }

//   private handleResponse(
//     response: AxiosResponse,
//     { extra }: { extra: boolean } = { extra: false },
//   ) {
//     if (extra || response.data.data === undefined) {
//       return response.data;
//     }

//     return response.data.data;
//   }

//   private handleError(error: AxiosError) {
//     try {
//       if (error.response && error.response.data) {
//         throw new Error(error.response.data.message);
//       }

//       if (error.toJSON) {
//         // @ts-ignore
//         throw new Error(error.toJSON().message);
//       }

//       if (error.request) {
//         throw error.request;
//       }
//     } catch (err) {
//       if (err instanceof Error && err.message !== 'Internal server error') {
//         throw new Error(err.message);
//       } else {
//         throw new Error('Lỗi lấy dữ liệu! Vui lòng thử lại.');
//       }
//     }
//   }

//   getURL(url: string) {
//     if (url.startsWith('http')) {
//       return url;
//     }

//     let exactUrl = url;

//     if (url.startsWith('/')) {
//       exactUrl = url.slice(1);
//     }

//     return `${GLOBAL_API_URL}/${exactUrl}`;
//   }
// }

// export const requestAPI = new RequestAPI();
