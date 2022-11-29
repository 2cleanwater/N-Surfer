const express = require('express')
const dotenv = require('dotenv').config()
const {Client} = require('@notionhq/client')
const cors = require('cors');
const bodyParser = require('body-parser');
// let jsonParser = bodyParser.json();


const app = express();
// const path = require('../client/src/App');

app.use(cors());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
// app.use("/api", path);
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const PORT = 4000;
const HOST = "localhost";

const client = new Client({
  auth: process.env.NOTION_TOKEN
  // auth: "Bearer secret_eTYz3lbEKzm7oy9RKvYD2GbBwUht26v4cXyIPdBQ0QL"
});

const databaseId = process.env.NOTION_DATABASE_ID;

app.post('/submitFormNotion', async (req, res)=>{
  //req body
  /*{

  }*/
  const name = req.body.name;
  const content = req.body.content;
  console.log(req.body);
  console.log("북" + name);
  try{
    const response = await client.pages.create({
      parent: {database_id: databaseId},
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name
              }
            }
          ]
        }
      } 
    });
    console.log(response);
    console.log("SUCCESS");
  } catch(error) {
    console.log(error);
  }
});

app.listen(PORT, HOST, function(){
  console.log('listening on ' + HOST + ":" + PORT);
});

// app.get('/', function)

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


// const express = require("express");
// const app = express();
// const test = require("./Router/test");

// app.use("/api", test);

// const port = 5000;
// app.listen(port, ()=> console.log(`${port}`));