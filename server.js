const express = require('express')
const dotenv = require('dotenv').config()
const {Client} = require('@notionhq/client')
const cors = require('cors');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();


const app = express();
// const path = require('path')

app.use(cors());

const PORT = 4000;
const HOST = "localhost";

const client = new Client({
  auth: process.env.NOTION_TOKEN
});

const databaseId = process.env.NOTION_DATABASE_ID;

app.post('/submitFormNotion', jsonParser, async (req, res)=>{
  //req body
  /*{

  }*/
  const name = req.body.name;

  try{
    const response = await notion.pages.create({
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
    })
  } catch {
    console.log(error);
  }
});

app.listen(PORT, HOST, function(){
  console.log('listening on ' + HOST + ":" + PORT);
});

// app.get('/', function)