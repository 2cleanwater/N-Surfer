import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import {AuthContextProvider} from './context/AuthContext'
import { ModalContextProvider } from './context/ModalContext';
// import { createStore } from 'redux';
// import {Porvider, useSelector, useDispatch} from 'react-redux';

export default function App({authService}) {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <Navbar />
        <Outlet />
      </ModalContextProvider>
    </AuthContextProvider>
  )
};