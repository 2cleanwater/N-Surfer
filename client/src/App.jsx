import './App.module.css';
import {useState} from 'react';


function App() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  function submitFormToNotion() {
    console.log("we in " + name )
    fetch("http://localhost:3000/submitFormNotion". {
      method: "post",
      header:{
        "Accept": "appclication/json",
        "Concept-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        content: content
      })
    }).then(response => response.json())
    .then(data => {
      console.log("Succes! ", data);
    }).catch(error => {
      console.log("Error ", error)
    });
  }

  return (
    <div className='App'>
      <div>
        <p>Name</p>
        <input type="text" id="name" onChange={(e)=> setName(e.target.value)}></input>

        <p>Content</p>
        <textarea id="content" onChange={(e)=> setContent(e.target.value)} rows={10} cols={25}></textarea>

        <div>
          <button onClick={submitFormToNotion}>submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;