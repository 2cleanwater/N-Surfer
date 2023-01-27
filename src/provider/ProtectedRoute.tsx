import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

interface MyChildren {
  children: ReactNode
};

const ProtectedRoute = ({children}: MyChildren):JSX.Element=>{
  if(!localStorage.getItem('token')){
    return <Navigate to='/' replace />
  }
  return <>{children}</>;
}
export default ProtectedRoute;