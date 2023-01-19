import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';

import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import CardList from './pages/cardList/CardList'
import Card from './pages/card/Card'
import NotFound from './pages/notFound/NotFound'
import Test from './pages/test/Test'
import CardAdd from './pages/cardAdd/CardAdd';

import ProtectedRoute from './provider/ProtectedRoute';

import { Provider } from 'mobx-react';
import RootStore from './store/RootStore'; 

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './common/theme';
import './index.module.css';

import KakaoAuth from './service/KakaoAuth';

import { RootProvider } from './provider/rootContext';

// export const rootStore = RootStore();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {index: true, path: '/', element: <Home/>},
      {path: '/user/profile', element: <ProtectedRoute><Profile/></ProtectedRoute>},
      {path: '/card/list', element: <CardList/>},
      {path: '/card', element: <ProtectedRoute><CardAdd/></ProtectedRoute>},
      {path: '/card/:id', element: <Card/>},
      {path: '/test', element: <Test/>},
      {path: '/auth/kakao/callback', element: <KakaoAuth/>}
    ]
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    {/* <Provider value={rootStore}> */}
    <RootProvider>
      <RouterProvider router={router}/> 
    </RootProvider>
    {/* </Provider> */}
  </ThemeProvider>
);