const express = require('express')
const dotenv = require('dotenv').config()
const {Client} = require('@notionhq/client')


const app = express();
const path = require('path')

app.listen(8080, function(){
  console.log('listening on 8080')
})

app.get('/', function)