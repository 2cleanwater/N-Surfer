import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const TOKEN_URL = process.env.REACT_APP_KAKAO_TOKEN_URL;
const TOKEN_URL_TEST = process.env.REACT_APP_KAKAO_TOKEN_URL_TEST;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KakaoAuth = () => {

  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");
  
  const [token, setToken] = useState(null);

  const getToken = async () =>{
    await axios({
      method: "GET",
      // url: `${TOKEN_URL}?redirectUrl=${REDIRECT_URI}&code=${code}`,
      url: `${TOKEN_URL_TEST}?redirectUrl=${REDIRECT_URI}&code=${code}`,
    })
    .then((res)=>{
      console.log(res);
      const ACCESS_TOKEN = res.data.data.accessToken;
      window.alert(ACCESS_TOKEN);
      console.log(ACCESS_TOKEN);
      setToken(ACCESS_TOKEN);
      navigate("/");
    }).catch((err)=>{
      console.log(err);
      window.alert("로그인실패");
      navigate("/");
    });
  } 
  useEffect(()=>{
    getToken()
  },[])
}
export default KakaoAuth