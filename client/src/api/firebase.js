import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, GithubAuthProvider,signInWithPopup,signOut, onAuthStateChanged} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("헤이"+firebaseConfig.authDomain)
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export async function login() {
  return signInWithPopup(auth, googleProvider)
  .then((result)=>{
    const user = result.user;
    console.log(user);
    return user;
  })
  .catch(console.error);
}

export function logout() {
  return signOut(auth).then(()=>null);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user)=>{
    callback(user);
  });
}