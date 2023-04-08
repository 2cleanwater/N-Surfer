import axios from "axios";

// axios에 baseURL 설정 =====================================================
const instance = axios.create({
  // 백엔드 서버
  // baseURL : process.env.REACT_APP_BACKEND_SERVER
  // 백엔드 테스트 서버
  // baseURL: process.env.REACT_APP_BACKEND_TEST_SERVER
  // 로컬 서버
  baseURL : process.env.REACT_APP_LOCALHOST_BACKEND_SERVER
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
    }
    // 기본적인 요청일 경우
    else {
      token = localStorage.getItem("accessToken");
    }
    // 토큰이 있을 경우에만 토큰을 실어보냄
    if(token !== null){
      config.headers = {Authorization : `Bearer ${token}`};
    }
    // 토큰이 없을시 그냥 전송
    return config;
  },
  // async (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  async(res) => {
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




// import axios from "axios";

// // axios에 baseURL 설정 =====================================================
// const instance = axios.create({
//   // 백엔드 서버
//   // baseURL : process.env.REACT_APP_BACKEND_SERVER
//   // 로컬 서버
//   baseURL : process.env.REACT_APP_LOCALHOST_BACKEND_SERVER
// });

// let isRefreshing = false;
// let requestsQueue: ((token: string) => void)[] = [];

// function subscribeTokenRefresh(cb: (token: string) => void) {
//   requestsQueue.push(cb);
// }

// function onRefreshed(token: string) {
//   requestsQueue.forEach((cb) => cb(token));
// }

// // AccessToken 갱신 ================================= 
// const ACCESS_TOKEN_URL = "/auth/reissue/access-token"
// const getAccessToken = async (): Promise<string | void> =>{
//   try{
//     const { data: { accessToken, refreshToken } } = await instance.get<{ accessToken: string; refreshToken: string | null }>(ACCESS_TOKEN_URL);
//     isRefreshing= false;
//     onRefreshed(accessToken);
//     requestsQueue=[];
//     localStorage.setItem('accessToken', accessToken);
//     if(refreshToken!==null){
//       localStorage.setItem('refreshToken', refreshToken);
//     }
//     return accessToken;
//   }
//   catch(err){
//     isRefreshing = false;
//     requestsQueue = [];
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     throw(err);
//   }
// }

// let requestsCount = 0;
// let cancelTokenSource = axios.CancelToken.source();


// instance.interceptors.request.use(
//   async (config) => {
//     if(!config.headers) return config;
//     let token: string | null = null;
//     // refresh token url 일 경우
//     if(config.url === ACCESS_TOKEN_URL){
//       token = localStorage.getItem("refreshToken");
//     }
//     // 기본적인 요청일 경우
//     else {
//       token = localStorage.getItem("accessToken");
//     }
//     // 토큰이 있을 경우에만 토큰을 실어보냄
//     if(token !== null){
//       config.headers = {Authorization : `Bearer ${token}`};
//     }
//     // 토큰이 없을시 그냥 전송

//     requestsCount++;
//     if (requestsCount > 5) {
//       cancelTokenSource.cancel("Too many requests in a short amount of time.");
//       cancelTokenSource = axios.CancelToken.source();
//       requestsCount = 0;
//     }
//     config.cancelToken = cancelTokenSource.token;


//     return config;
//   },
//   // async (error) => Promise.reject(error)
// );

// instance.interceptors.response.use(
//   async(res) => {
//     return res.data
//   },
//   async (err) => {
//     const {config, response: { status }} = err;
//     const originalRequest = config;

//     if(config.url===ACCESS_TOKEN_URL||status !==401) return Promise.reject(err);
    
//     if(isRefreshing){
//       return new Promise((resolve)=>{
//         subscribeTokenRefresh((token:string)=>{
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           resolve(instance(originalRequest));
//         });
//       });
//     }
//     isRefreshing= true;
//     const accessToken = await getAccessToken();
    
//     if (typeof(accessToken) === 'string') {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//       return instance(config);
//     }
//     return  Promise.reject(err);
//   }
// );

// export default instance;



