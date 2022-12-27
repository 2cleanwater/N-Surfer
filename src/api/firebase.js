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

export async function googleLogin() {
  return signInWithPopup(auth, googleProvider)
  .then((result)=>{
    const user = result.user;
    console.log(user);
    return user;
  })
  .catch(console.error);
}

export async function githubLogin() {
  return signInWithPopup(auth, githubProvider)
  .then((result)=>{
    const user = result.user;
    console.log(user);
    return user;
  })
  .catch(console.error);
}

export function naverLogin() {
  alert("아직 구현 안 된 기능입니다.");
  return 
}

export function logout() {
  return signOut(auth).then(()=>null);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user)=>{
    callback(user);
  });
}