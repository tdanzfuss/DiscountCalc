"use strict"
/* 

Main application entry page. 

*/
var express = require('express');
var Bill = require('./model/bill.js');
var app = express();

app.get('/', function (req, res) {  
  res.send('Hello World!');
});

app.listen(3000, function () {    
  console.log('Example app listening on port 3000!');
});