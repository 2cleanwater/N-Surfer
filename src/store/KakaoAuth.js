import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const KakaoAuth = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL;
  const REDIRECT_URI_TEST = process.env.REACT_APP_KAKAO_REDIRECT_URL_TEST;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI_TEST}&response_type=code`;

  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");
  
  
  useEffect(()=>{
    axios({
      method: "GET",
      url: `http://123.214.176.116:8080/auth/login/kakao?redirectUrl=${REDIRECT_URI_TEST}&code=${code}`,
    })
    .then((res)=>{
      console.log(res);
      const ACCESS_TOKEN = res.data.data.accessToken;
      console.log(ACCESS_TOKEN);
      
    }).catch((err)=>{
      console.log(err);
      window.alert("로그인실패");
      navigate("/");
    })
  },[])
  
}

export default KakaoAuth