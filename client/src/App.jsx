import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import {AuthContextProvider} from './context/AuthContext'
import { Provider } from 'mobx-react';
import RootStore from './store/RootStore'; 
import ModalStore from './store/ModalStore';

export const rootStore = new RootStore();

// export const rootStore = new ModalStore();

export default function App({authService}) {
  return (
    <Provider value={rootStore}>
      <AuthContextProvider>
        <Navbar />
        <Outlet />
      </AuthContextProvider>
    </Provider>
      
  )
};
