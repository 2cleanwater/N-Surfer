import {KAKAO_AUTH_URL} from '@service/KakaoAuth'
import ProfileStore from "@store/ProfileStore"

import { runInAction } from "mobx"
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'error',
        title: '카카오를 이용해주세요!',
        text: '이 기능은 준비되지 않았어요ㅠㅠ'
      })
      },
    githubLogin: function(){
      Swal.fire({
        icon: 'error',
        title: '카카오를 이용해주세요!',
        text: '이 기능은 준비되지 않았어요ㅠㅠ'
      })
      },
    naverLogin: function(){
      Swal.fire({
        icon: 'error',
        title: '카카오를 이용해주세요!',
        text: '이 기능은 준비되지 않았어요ㅠㅠ'
      })
      },
    logout: function(){
        // alert("안전 로그아웃 했습니다.");
        ProfileStore().setMyUserData({});
        localStorage.clear();
        this.setIsLogout();
    }
  }
}

export default AuthStore;
