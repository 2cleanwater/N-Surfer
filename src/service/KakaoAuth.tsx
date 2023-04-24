import Loading  from '@components/utils/Loading';
import instance from '@service/axiosInterceptor';

import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const TOKEN_URL = "/auth/login/kakao";
const REDIRECT_URI = process.env.REACT_APP_LOCALHOST_FRONTEND_SERVER + "/auth/kakao/callback";
// const REDIRECT_URI = process.env.REACT_APP_FRONTEND_SERVER + "/auth/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KakaoAuth= function() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const getKakaoToken = async (): Promise<string | void> =>{
    try{
      const { data: { accessToken, refreshToken} } = await instance.get<{ accessToken: string; refreshToken: string }>(`${TOKEN_URL}?redirectUrl=${REDIRECT_URI}&code=${code}`);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      alert('성공적으로 로그인 했습니다');
      navigate("/");
    }
    catch(err){
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.log(err);
      window.alert("로그인실패");
      navigate("/");
    }
  };
  useEffect(()=>{
    if(localStorage.getItem('accessToken')){navigate("/")}
    else{getKakaoToken();}
  },[])
  return (
    <Loading/>
  )
}
export default observer(KakaoAuth);

