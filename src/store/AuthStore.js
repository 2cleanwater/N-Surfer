import { makeObservable, observable, action, makeAutoObservable } from "mobx"
import {KAKAO_AUTH_URL} from '../service/KakaoAuth'

//임시 JSON 데이터
import userData from "../testjson/useData.json"

export default class AuthStore {
  rootStore;
  user= null;
   //user = [userId, userImgs, userType, userBirth, userName, userWaves, userKakaoId, userGoogleId]

  isLogin= false;
  constructor() {
    makeObservable(this, {
      user: observable,
      isLogin: observable,
      setAuth: action,
      setIsLogin: action,
      setIsLogout: action,
      kakaoLogin: action,
      googleLogin: action,
      githubLogin: action,
      naverLogin: action,
      logout: action
    });
    // makeAutoObservable(this);
    localStorage.getItem('token')?this.isLogin=true:this.isLogin=false;
    if (localStorage.getItem('token')){
      //임시 JSON 데이터
      this.setAuth(userData.filter((data)=>{return data.usesId===0}))
      this.setIsLogin();
    }else{
      this.setAuth(null);
      this.setIsLogout();
    }
  }

  //유저 값 set
  setAuth(user){
    this.user = user
  }

  //로그인 유무 변경
  setIsLogin(){
    this.isLogin = true;
  }
  setIsLogout(){
    this.isLogin = false;
  }

  //로그인 method
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

  //로그아웃 method
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
