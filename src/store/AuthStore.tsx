import {KAKAO_AUTH_URL} from '@service/KakaoAuth'
import ProfileStore from "@store/ProfileStore"

import { runInAction } from "mobx"

export interface AuthStoreForm{
  isLoginLoading: boolean;
  setIsLoginLoading: (loading: boolean) => void;
  isLogin: boolean;
  setIsLogin: ()=>void;
  setIsLogout: ()=>void;
  kakaoLogin: ()=>void;
  googleLogin: ()=>void;
  githubLogin: ()=>void;
  naverLogin: ()=>void;
  logout: ()=>void;
}

const AuthStore = (): AuthStoreForm => {
  return {
    isLoginLoading: false,
    setIsLoginLoading: function(loading: boolean){
      this.isLoginLoading=loading
    },
    isLogin: false,
    setIsLogin: function(){
      runInAction(() => {
        this.isLogin = true;
      });},
    setIsLogout: function(){
      runInAction(() => {
        this.isLogin = false;
      });},
    kakaoLogin:  async function(){
      window.location.href = KAKAO_AUTH_URL;
      },
    googleLogin: function(){
      alert("아직 구현 되지 않은 기능입니다. 카카오 로그인을 이용해주세요");
      },
    githubLogin: function(){
      alert("아직 구현 되지 않은 기능입니다. 카카오 로그인을 이용해주세요");
      },
    naverLogin: function(){
      alert("아직 구현 되지 않은 기능입니다. 카카오 로그인을 이용해주세요");
      },
    logout: function(){
        alert("안전 로그아웃 했습니다.");
        ProfileStore().setMyUserData({});
        localStorage.clear();
        this.setIsLogout();
    }
  }
}

export default AuthStore;
