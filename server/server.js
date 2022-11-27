// const express = require('express')
// // const dotenv = require('dotenv').config()
// const {Client} = require('@notionhq/client')
// const cors = require('cors');
// let bodyParser = require('body-parser');
// let jsonParser = bodyParser.json();


// const app = express();
// const path = require('../n-surfer/src/App');

// app.use(cors());
// app.use("/api", path);

// const PORT = 4000;
// const HOST = "localhost";

// const client = new Client({
//   auth: process.env.NOTION_TOKEN
// });

// const databaseId = process.env.NOTION_DATABASE_ID;

// app.post('/submitFormNotion', jsonParser, async (req, res)=>{
//   //req body
//   /*{

//   }*/
//   const name = req.body.name;

//   try{
//     const response = await notion.pages.create({
//       parent: {database_id: databaseId},
//       properties: {
//         Name: {
//           title: [
//             {
//               text: {
//                 content: name
//               }
//             }
//           ]
//         }
//       } 
//     });
//     console.log(response);
//     console.log("SUCCESS");
//   } catch(error) {
//     console.log(error);
//   }
// });

// app.listen(PORT, HOST, function(){
//   console.log('listening on ' + HOST + ":" + PORT);
// });

// // app.get('/', function)

const express = require('express');
const app = express();
const test = require("./Router/test");

app.use("/api", test);

const port = 5000;
app.listen(port, ()=>console.log(`${port}`));