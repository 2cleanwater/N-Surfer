import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.module.css';
import App from './App';
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import CardList from './pages/cardList/CardList'
import Card from './pages/card/Card'
import NotFound from './pages/notFound/NotFound'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {index: true, path: '/', element: <Home/>},
      {path: '/user/profile', element: <Profile/>},
      {path: '/card/list', element: <CardList/>},
      {path: '/card/:id', element: <Card/>}
    ]
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// const authService = new AuthService();
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <App 
//       authService={authService}
//     />
//   </React.StrictMode>
// );