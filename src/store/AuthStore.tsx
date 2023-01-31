import axios from "axios";
import { makeObservable, observable, action, makeAutoObservable } from "mobx"
import { useEffect } from "react";
import {KAKAO_AUTH_URL} from '../service/KakaoAuth'

//임시 JSON 데이터
import userJsonData from "../testjson/useData.json"

interface waveList{
  date:string;
  count:number;
}

export interface UserData{
  useId?: number;
  userEmail?: string;
  provider?: string;
  userName?: string;
  userBirth?: string;
  userType?: string;
  imgURL?: string;
  waveList?: waveList[];
}

export interface AuthData{
  userData: UserData;
  isLogin: boolean;
  setAuth: (userData: UserData)=>void;
  setIsLogin: ()=>void;
  setIsLogout: ()=>void;
  kakaoLogin: ()=>void;
  googleLogin: ()=>void;
  githubLogin: ()=>void;
  naverLogin: ()=>void;
  getUserData: ()=>void;
  logout: ()=>void;
}

const AuthStore = (): AuthData => {
  return {
    userData: {},
    isLogin: false,
    setAuth: function(userData: UserData){
      this.userData = userData},
    setIsLogin: function(){
      this.isLogin = true;},
    setIsLogout: function(){
      this.isLogin = false;},
    kakaoLogin: function(){
      window.location.href = KAKAO_AUTH_URL;
      this.getUserData();
      },
    googleLogin: function(){
      alert("아직 구현 안 된 기능입니다.");
      },
    githubLogin: function(){
      alert("아직 구현 안 된 기능입니다.");
      },
    naverLogin: function(){
      alert("아직 구현 안 된 기능입니다.");
      },
    getUserData: async function(){
      // 백엔드 완료시 적용

      // await axios({
      //   method: "GET",
      //   // 백엔드 서버
      //   // url: process.env.REACT_APP_BACKEND_SERVER+ "/user/profile",
      //   // 로컬 서버
      //   url: process.env.REACT_APP_LOCALHOST_BACKEND_SERVER+ "/my-page/profile",
      //   headers: {
      //     'Authorization': 'Bearer ' + localStorage.getItem('token'),
      //     'Content-Type': 'application/json'
      //   }
      //   })
      //   .then((res)=>{
      //     console.log("유저의 정보는" + res);
      //   }).catch((err) => {
      //     console.log(err);
      //     window.alert("정보를 가져올 수 없습니다.");
      // });

      this.setAuth(userJsonData[0] as UserData);
    },
    logout: function(){
      alert("안전 로그아웃 했습니다.");
      this.setAuth({});
      localStorage.clear();
      this.setIsLogout();
    }
  }
}

export default AuthStore;
