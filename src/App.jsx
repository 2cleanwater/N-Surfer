import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import {AuthContextProvider} from './context/AuthContext'
import { observer } from 'mobx-react';
import ModalLogin from './components/modalLogin/ModalLogin';
import useStore from './store/useStore';

// const App = ({authService})=>{
const App = ()=>{
  const {value} = useStore();
  return (
    <>
    {/*<AuthContextProvider>*/}
      <Navbar />
      <Outlet />
      {value.modalStore._IsModalOpen&&<ModalLogin/>}
    {/*</AuthContextProvider>*/}
    </>
  )
}

export default observer(App);