import { makeObservable, observable, action, makeAutoObservable } from "mobx"
import {KAKAO_AUTH_URL} from '../service/KakaoAuth'

export default class AuthStore {
  rootStore;
  user= null;
  isLogin= false;
  constructor() {
    makeObservable(this, {
      user: observable,
      isLogin: observable,
      setAuth: action,
      kakaoLogin: action,
      googleLogin: action,
      githubLogin: action,
      naverLogin: action,
      logout: action
    });
    // makeAutoObservable(this);
    localStorage.getItem('token')?this.isLogin=true:this.isLogin=false;
  }
  setAuth(user){
    this.user = user
  }
  setIsLogin(){
    this.isLogin = true;
  }
  setIsLogout(){
    this.isLogin = false;
  }

  kakaoLogin() {
    window.location.href = KAKAO_AUTH_URL;
  return 
  }

  googleLogin(){
    alert("아직 구현 안 된 기능입니다.");
  return 
  }

  githubLogin() {
    alert("아직 구현 안 된 기능입니다.");
  return 
  }

  naverLogin(){
    alert("아직 구현 안 된 기능입니다.");
  return 
  }

  logout() {
    alert("안전 로그아웃 했습니다.");
    this.setAuth(null);
    // localStorage.setItem('token', null);
    // localStorage.setItem('authorized', false);
    localStorage.clear();
    this.setIsLogout();
    return 
  }
}
