import { createContext, useEffect, useContext } from "react";
import { useState } from "react";
import { googleLogin, githubLogin, logout, onUserStateChange, } from '../api/firebase'

const AuthContext = createContext();

export function AuthContextProvider({children}){

  const [user,setUser] = useState();

  useEffect(()=>{
    onUserStateChange((user)=>{
      setUser(user);
    });
  },[]);
  
  return (
    <AuthContext.Provider value={{user, googleLogin, githubLogin, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
