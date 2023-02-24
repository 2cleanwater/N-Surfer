import axios, { AxiosHeaders } from "axios";

// axios에 baseURL 설정 =====================================================
const instance = axios.create({
  // 백엔드 서버
  // baseURL : process.env.REACT_APP_BACKEND_SERVER
  // 로컬 서버
  baseURL : process.env.REACT_APP_LOCALHOST_BACKEND_SERVER
});

// RefreshToken 갱신 =================================
const REFRESH_TOKEN_URL = "auth/reissue"; 
const getRefreshToken = async (): Promise<string | void> =>{
  try{
    const { data: { accessToken, refreshToken } } = await instance.get<{ accessToken: string; refreshToken: string}>(REFRESH_TOKEN_URL);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return accessToken;
  }
  catch(err){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

// AccessToken 갱신 ================================= 
const ACCESS_TOKEN_URL = "/auth/reissue/access-token"
const getAccessToken = async (): Promise<string | void> =>{
  try{
    const { data: { accessToken } } = await instance.get<{ accessToken: string; refreshToken: string | null }>(ACCESS_TOKEN_URL);
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  }
  catch(err){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

instance.interceptors.request.use(
  (config) => {
    if(!config.headers) return config;
    let token: string | null = null;
    if(config.url === REFRESH_TOKEN_URL){
      token = localStorage.getItem("refreshToken");
    }else {
      token = localStorage.getItem("accessToken")
    }
    if(token !== null){
      config.headers = {Authorization : `Bearer ${token}`};
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  async (res) => {
    const originalRequest = res.config;
    const data = res.data;
    if(data.status === "Failure"){
      originalRequest.headers = { ...originalRequest.headers } as AxiosHeaders;
      if(data.code==="EU006"){
        originalRequest.headers = {Authorization : `Bearer ${getRefreshToken()}`};
      }
      else if(data.code==="EU004"){
        originalRequest.headers = {Authorization : `Bearer ${getAccessToken()}`};        
      }
      return instance(originalRequest);
    }
    else {
      return data;
    }
  },
  (error) => Promise.reject(error)
);

export default instance;