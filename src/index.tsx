import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';

import Home from '@pages/Home'
import Profile from '@pages/Profile'
import CardList from '@pages/CardList'
import Card from '@pages/Card'
import NotFound from '@pages/NotFound'
import CardForm from '@pages/CardForm';
import KakaoAuth from '@service/KakaoAuth';

import ProtectedRoute from '@provider/ProtectedRoute';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';
import './index.module.css';

import { RootProvider } from '@provider/rootContext';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {index: true, path: '/', element: <Home/>},
      {path: '/user/profile', element: <Profile/>},
      {path: '/card', element: <CardList/>},
      {path: '/cardForm', element: <ProtectedRoute><CardForm/></ProtectedRoute>},
      {path: '/card/:id', element: <Card/>},
      {path: '/auth/kakao/callback', element: <KakaoAuth/>}
    ]
}]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <RootProvider>
      <RouterProvider router={router}/> 
    </RootProvider>
  </ThemeProvider>
);