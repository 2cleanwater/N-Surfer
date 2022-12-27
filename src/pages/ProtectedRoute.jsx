import React from 'react'
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import useStore from '../store/useStore';

const ProtectedRoute = ({children})=>{
  const {value} = useStore();
  if(!value.authStore.user){
    return <Navigate to='/' replace />
  }
  return children;
}
export default observer(ProtectedRoute);