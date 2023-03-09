// import { useRootStore } from "@/provider/rootContext";
// import axios, { AxiosHeaders } from "axios";



// // axios에 baseURL 설정 =====================================================
// const instance = axios.create({
//   // 백엔드 서버
//   // baseURL : process.env.REACT_APP_BACKEND_SERVER
//   // 로컬 서버
//   baseURL : process.env.REACT_APP_LOCALHOST_BACKEND_SERVER
// });

// // RefreshToken 갱신 =================================
// // const REFRESH_TOKEN_URL = "auth/reissue/access-refresh-token"; 
// // const getRefreshToken = async (): Promise<string | void> =>{
// //   try{
// //     const { data: { accessToken, refreshToken } } = await instance.get<{ accessToken: string; refreshToken: string}>(REFRESH_TOKEN_URL);
// //     localStorage.setItem('accessToken', accessToken);
// //     localStorage.setItem('refreshToken', refreshToken);
// //     console.log("리프레스 엑세스 받는중.")
// //     return accessToken;
// //   }
// //   catch(err){
// //     console.log(err);
// //     localStorage.removeItem("accessToken");
// //     localStorage.removeItem("refreshToken");
// //   }
// // }

// // AccessToken 갱신 ================================= 
// const ACCESS_TOKEN_URL = "/auth/reissue/access-token"
// const getAccessToken = async (): Promise<string | void> =>{
//   try{
//     const { data: { accessToken } } = await instance.get<{ accessToken: string; refreshToken: string | null }>(ACCESS_TOKEN_URL);
//     localStorage.setItem('accessToken', accessToken);
//     console.log("엑세스만 받는중.")
//     window.alert("엑세스만 받는중.")
//     return accessToken;
//   }
//   catch(err){
//     console.log(err);
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//   }
// }

// // const getAccessToken = async (): Promise<string | void> =>{
// //   try{
// //     await axios({
// //       method: "GET",
// //       url: process.env.REACT_APP_LOCALHOST_BACKEND_SERVER+ACCESS_TOKEN_URL,
// //       headers: {
// //         Authorization : `Bearer ${localStorage.getItem("refreshToken")}`
// //       }
// //     }).then((res)=>{
// //       console.log(res.data);
// //       let accessToken = res.data.accessToken;
// //       localStorage.setItem('accessToken', accessToken);
// //       return accessToken
// //     })
// //     .catch((err)=>{
// //       console.log(err);
// //       console.log("엑세스토큰 재요청 하는 부분에서 에러남")
// //     });
// //   }
// //   catch(err){
// //     console.log(err);
// //     localStorage.removeItem("accessToken");
// //     localStorage.removeItem("refreshToken");
// //   }
// //   // localStorage.setItem('accessToken', accessToken);
// // }


// instance.interceptors.request.use((config) => {
//     if(!config.headers) return config;
//     let token: string | null = null;
//     // refresh token url 일 경우
//     if(config.url === ACCESS_TOKEN_URL){
//       token = localStorage.getItem("refreshToken");
//       console.log("리프레시토큰을 실어보냅니다")
//     }
//     // 기본적인 요청일 경우
//     else {
//       token = localStorage.getItem("accessToken");
//       console.log("엑세스토큰을 실어보냅니다")
//     }
//     // 토큰이 있을 경우에만 토큰을 실어보냄
//     if(token !== null){
//       config.headers = {Authorization : `Bearer ${token}`};
//     }
//     // 토큰이 없을시 그냥 전송
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// instance.interceptors.response.use(
//   async (res) => {
//     const originalRequest = res.config;
//     const data = res.data;
//     if(data.status === "Failure"){
//       originalRequest.headers = { ...originalRequest.headers } as AxiosHeaders;
//       // refresh token만 만료
//       if(data.code==="EU006"){
//         console.log("EU006")
//         //로그아웃 시키기
//         window.alert("기한이 만료되어 로그아웃 됩니다.")
//         localStorage.clear();
//         console.log("로그아웃이야")
//         return Promise.reject(res);
//         // originalRequest.headers = {Authorization : `Bearer ${getRefreshToken()}`};
//         // console.log("리프레쉬 받고 엑세스 갈음")
//       }
//       // access token만 만료
//       else if(data.code==="EU004"){
//         console.log("EU004")
//         window.alert("엑세스만 받고 엑세스 갈음, 명령어 재전송 준비")
//         // 엑세스 토큰이 존재할 때만 받았던 req를 재전송,
//         let token = getAccessToken();
//         if(localStorage.getItem("accessToken")) {
//           originalRequest.headers = {Authorization : `Bearer ${await token}`};
//           // return await instance(originalRequest);
//         }   
//       }
//       else {return instance(originalRequest);}
//     }
//     else {
//       return data;
//     }
//   },
//   (error) => Promise.reject(error)
// );

// export default instance;

import axios from "axios";

// axios에 baseURL 설정 =====================================================
const instance = axios.create({
  // 백엔드 서버
  baseURL : process.env.REACT_APP_BACKEND_SERVER
  // 로컬 서버
  // baseURL : process.env.REACT_APP_LOCALHOST_BACKEND_SERVER
});

let isRefreshing = false;
let requestsQueue: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  requestsQueue.push(cb);
}

function onRefreshed(token: string) {
  requestsQueue.forEach((cb) => cb(token));
}

// AccessToken 갱신 ================================= 
const ACCESS_TOKEN_URL = "/auth/reissue/access-token"
const getAccessToken = async (): Promise<string | void> =>{
  try{
    const { data: { accessToken, refreshToken } } = await instance.get<{ accessToken: string; refreshToken: string | null }>(ACCESS_TOKEN_URL);
    isRefreshing= false;
    onRefreshed(accessToken);
    requestsQueue=[];
    localStorage.setItem('accessToken', accessToken);
    if(refreshToken!==null){
      localStorage.setItem('refreshToken', refreshToken);
    }
    return accessToken;
  }
  catch(err){
    isRefreshing = false;
    requestsQueue = [];
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw(err);
  }
}

instance.interceptors.request.use(
  async (config) => {
    if(!config.headers) return config;
    let token: string | null = null;
    // refresh token url 일 경우
    if(config.url === ACCESS_TOKEN_URL){
      token = localStorage.getItem("refreshToken");
      console.log("리프레시토큰을 실어보냅니다")
    }
    // 기본적인 요청일 경우
    else {
      console.log(localStorage.getItem("accessToken"))
      console.log(localStorage.getItem("refreshToken"))
      token = localStorage.getItem("accessToken");
      console.log("엑세스토큰을 실어보냅니다")
    }
    // 토큰이 있을 경우에만 토큰을 실어보냄
    if(token !== null){
      config.headers = {Authorization : `Bearer ${token}`};
    }
    // 토큰이 없을시 그냥 전송
    return config;
  },
  async (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  async(res) => {
    console.log(res);
    return res.data
  },
  async (err) => {
    const {config, response: { status }} = err;
    const originalRequest = config;

    if(config.url===ACCESS_TOKEN_URL||status !==401) return Promise.reject(err);
    
    if(isRefreshing){
      return new Promise((resolve)=>{
        subscribeTokenRefresh((token:string)=>{
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(instance(originalRequest));
        });
      });
    }
    isRefreshing= true;
    const accessToken = await getAccessToken();
    
    if (typeof(accessToken) === 'string') {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return instance(config);
    }
    return  Promise.reject(err);
  }
);

export default instance;