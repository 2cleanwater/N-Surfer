import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useRootStore } from '../provider/rootContext';

const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const TOKEN_URL = process.env.REACT_APP_BACKEND_SERVER + "/auth/login/kakao";
const TOKEN_URL_TEST = process.env.REACT_APP_LOCALHOST_BACKEND_SERVER+ "/auth/login/kakao";
const REDIRECT_URI = process.env.REACT_APP_LOCALHOST_FRONTEND_SERVER + "/auth/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KakaoAuth= function() {
  const value = useRootStore()!;
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const getToken = async () =>{
    await axios({
      method: "GET",
      // 백엔드 서버
      // url: `${TOKEN_URL}?redirectUrl=${REDIRECT_URI}&code=${code}`,
      // 로컬 서버
      url: `${TOKEN_URL_TEST}?redirectUrl=${REDIRECT_URI}&code=${code}`,
    })
    .then((res)=>{
      console.log(res);
      localStorage.setItem('token', res.data.data.accessToken);
      value.authStore.setIsLogin();
      alert('성공적으로 로그인 했습니다');
      navigate("/");
    }).catch((err)=>{
      console.log(err);
      window.alert("로그인실패");
      navigate("/");
    });
  } 
  useEffect(()=>{
    getToken()
  },[]);
  return null
}
export default observer(KakaoAuth);

