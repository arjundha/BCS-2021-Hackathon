const express = require("express");
const app = express();

// const path = require('path');
// const session = require("express-session");

// ROUTES TO PAGES //
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
  })


  
var port = process.env.PORT || 8080;

app.listen(port);
console.log("running on port 8080")