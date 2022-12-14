import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home/Home";
import Login from "./components/login/login";


function App({authService}) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route path="/login" element={<Login authService={authService}/>}/>
          <Route path="/profile" element={{/* 프로필관련 */}}/>
          <Route paht="/maker"/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App