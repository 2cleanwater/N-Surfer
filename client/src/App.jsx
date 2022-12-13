import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/home/home";
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


// import './App.module.css';
// import {useState} from 'react';


// function App() {
//   const [name, setName] = useState("");
//   const [content, setContent] = useState("");

//   function submitFormToNotion() {
//     console.log("we in " + name )
//     fetch("http://localhost:4000/submitFormNotion", {
//       method: "post",
//       headers:{
//         "Accept": "appclication/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: name,
//         content: content
//       })
//     }).then(response => response.json())
//     .then(data => {
//       console.log("Success! ", data);
//     }).catch(error => {
//       console.log("Error ", error)
//     });
//   }

//   return (
//     <div className='App'>
//       <div>
//         <p>Name</p>
//         <input type="text" id="name" onChange={(e)=> setName(e.target.value)}></input>

//         <p>Content</p>
//         <textarea id="content" onChange={(e)=> setContent(e.target.value)} rows={10} cols={25}></textarea>

//         <div>
//           <button onClick={submitFormToNotion}>submit</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
