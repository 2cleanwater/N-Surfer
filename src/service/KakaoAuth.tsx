import Loading  from '@components/utils/Loading';
import instance from '@service/axiosInterceptor';

import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import Swal from 'sweetalert2'

const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const TOKEN_URL = "/auth/login/kakao";
const REDIRECT_URI = process.env.REACT_APP_FRONTEND_SERVER + "/auth/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KakaoAuth= function() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const getKakaoToken = async (): Promise<string | void> =>{
    try{
      const { data: { accessToken, refreshToken} } = await instance.get<{ accessToken: string; refreshToken: string }>(`${TOKEN_URL}?redirectUrl=${REDIRECT_URI}&code=${code}`);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      Swal.fire(
        '환영합니다!',
        'N-Sufer를 즐길 준비 되셨나요?',
        'success'
      )
      //로그인 모달창 추가 예정
      navigate("/");
    }
    catch(err){
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "서버 통신 실패...",
        text: "신호가 바닷속으로 가라앉았습니다!! 꼬르륵 🙃",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
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

