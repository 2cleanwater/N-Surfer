import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'

function App({authService}) {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route path="/login" element={<Login authService={authService}/>}/>
          <Route path="/profile" element={{}}/>
          <Route paht="/maker"/>
        </Routes>
      </BrowserRouter> */}
    </div>
  )
}

export default App