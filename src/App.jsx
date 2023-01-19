import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import { observer } from 'mobx-react';
import ModalLogin from './components/modalLogin/ModalLogin';
import { useRootStore } from './provider/rootContext';
// import useStore from './store/useStore';

// const App = ({authService})=>{
const App = ()=>{
  // const {value} = useStore();
  const value = useRootStore();
  // console.log("앱")
  console.log(value.modalStore.oepnModal);
  value.modalStore.oepnModal();
  return (
    <>
      <Navbar />
      <Outlet />
      {value.modalStore._IsModalOpen&&<ModalLogin/>}
    </>
  )
}

export default observer(App);