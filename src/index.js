import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './index.module.css';
import App from './App';
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import CardList from './pages/cardList/CardList'
import Card from './pages/card/Card'
import NotFound from './pages/notFound/NotFound'
import Test from './pages/test/Test'
import ProtectedRoute from './pages/ProtectedRoute';
import ModalLogin from './components/modalLogin/ModalLogin';
import RootStore from './store/RootStore'; 

export const rootStore = new RootStore();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {index: true, path: '/', element: <Home/>},
      {path: '/user/profile', element: <ProtectedRoute><Profile/></ProtectedRoute>},
      {path: '/card/list', element: <CardList/>},
      {path: '/card/:id', element: <ProtectedRoute><Card/></ProtectedRoute>},
      {path: '/test', element: <Test/>},
      {path: '/modal', element: <ModalLogin/>}
    ]
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider value={rootStore}>
    <RouterProvider router={router}/>
  </Provider>
);