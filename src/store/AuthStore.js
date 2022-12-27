import { makeObservable, observable, action, makeAutoObservable } from "mobx"
// import { googleLogin, githubLogin, logout, onUserStateChange, } from '../api/firebase'
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, GithubAuthProvider,signInWithPopup,signOut} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export default class AuthStore {
  rootStore;
  user=null;

  constructor() {
    // 새로고침을 해도 캐시에 남아있는 로그인 정보를 기억해줌
    auth.onAuthStateChanged((user)=>{
      if (user) {
        this.setAuth(user);
      }
    });
    makeObservable(this, {
      user: observable,
      setAuth: action,
      googleLogin: action,
      githubLogin: action,
      logout: action
    });
    // makeAutoObservable(this);
  }

  setAuth(user){
    this.user = user
  }

  async googleLogin(){
    return signInWithPopup(auth, googleProvider)
    .then((result)=>{
      const user = result.user;
      console.log(user);
      return user;
    })
    .catch(console.error);
  }

  async githubLogin() {
    return signInWithPopup(auth, githubProvider)
    .then((result)=>{
      const user = result.user;
      console.log("깃허브 로그인" + user);
      return user;
    })
    .catch(console.error);
  }

  naverLogin() {
    alert("아직 구현 안 된 기능입니다.");
  return 
  }

  logout() {
    console.log("로그아웃합니다");
    return signOut(auth).then(this.setAuth(null));
  }
}
