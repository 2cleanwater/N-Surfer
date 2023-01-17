import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import useStore from '../store/useStore';

const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const TOKEN_URL = process.env.REACT_APP_KAKAO_TOKEN_URL;
const TOKEN_URL_TEST = process.env.REACT_APP_KAKAO_TOKEN_URL_TEST;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KakaoAuth = () => {
  const {value} = useStore();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const getToken = async () =>{
    await axios({
      method: "GET",
      // url: `${TOKEN_URL}?redirectUrl=${REDIRECT_URI}&code=${code}`,
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
}
export default observer(KakaoAuth);

