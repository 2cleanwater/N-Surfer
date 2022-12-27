import { makeObservable, observable, action, makeAutoObservable } from "mobx"
// import { googleLogin, githubLogin, logout, onUserStateChange, } from '../api/firebase'
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, GithubAuthProvider,signInWithPopup,signOut, onAuthStateChanged} from 'firebase/auth';


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
    firebase.auth().onAuthStateChanged(user=>{
      if(user) {
        this.user = user;
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

  setAuth(){
    this.user = [...this.user];
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
      console.log(user);
      return user;
    })
    .catch(console.error);
  }

  naverLogin() {
    alert("아직 구현 안 된 기능입니다.");
  return 
  }

  logout() {
    return signOut(auth).then(()=>null);
  }
}
