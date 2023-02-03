import { runInAction } from "mobx"
import {KAKAO_AUTH_URL} from '../service/KakaoAuth'
import ProfileStore from "./ProfileStore";

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
  imgUrl?: string;
  waveList?: waveList[];
}

export interface AuthData{
  isLogin: boolean;
  setIsLogin: ()=>void;
  setIsLogout: ()=>void;
  kakaoLogin: ()=>void;
  googleLogin: ()=>void;
  githubLogin: ()=>void;
  naverLogin: ()=>void;
  logout: ()=>void;
}

const AuthStore = (): AuthData => {
  return {
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
      alert("아직 구현 안 된 기능입니다.");
      },
    githubLogin: function(){
      alert("아직 구현 안 된 기능입니다.");
      },
    naverLogin: function(){
      alert("아직 구현 안 된 기능입니다.");
      },
    logout: function(){
        alert("안전 로그아웃 했습니다.");
        ProfileStore().setUserData({});
        localStorage.clear();
    }
  }
}

export default AuthStore;