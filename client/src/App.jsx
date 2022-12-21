import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import {AuthContextProvider} from './context/AuthContext'
import { ModalsProvider } from './context/ModalContext';


export default function App({authService}) {
  return (
    <ModalsProvider>
      <AuthContextProvider>
        <Navbar />
        <Outlet />
        {/* <Modal/> */}
      </AuthContextProvider>
    </ModalsProvider>
  )
};