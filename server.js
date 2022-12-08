const express = require('express')
const dotenv = require('dotenv').config()
const {Client} = require('@notionhq/client')
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const PORT = 4000;
const HOST = "localhost";

const client = new Client({
  auth: process.env.NOTION_TOKEN
});

const databaseId = process.env.NOTION_DATABASE_ID;

// Node.js 파일 위치 지정
app.use(express.static('client/public'));

// 포스트
app.post('/submitFormNotion', async (req, res)=>{
  const name = req.body.name;
  const content = req.body.content;
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