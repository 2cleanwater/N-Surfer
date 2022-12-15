import { createContext, useEffect, useContext } from "react";
import { useState } from "react";
import { login, logout, } from '../api/firebase'

const AuthContext = createContext();

export function AuthContextProvider({children}){
  const [user, setUser] = useState();

  useEffect(()=>{
    setUser(user);
  }, []);
  return (
    <AuthContext.Provider value={{user, uid: user && user.uid, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
