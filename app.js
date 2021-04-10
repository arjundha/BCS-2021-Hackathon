const express = require("express");
const app = express();

const path = require('path');
const session = require("express-session");

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static("public"));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// ------------------------- //
//    SESSIONS + COOKIES     //
// ------------------------- //
app.use(session({
	name: "idk",
	secret: "secret",
	resave: true,
	saveUninitialized: true,
}));


//
// ROUTES TO PAGES //
app.get('/', function(req, res) {
    res.render('index')}
    )

app.get('/form', function(req, res) {
    res.render('form', {
        name: "Kyla"
    })
  })
  


var port = process.env.PORT || 8080;

app.listen(port);
console.log("running on port 8080")