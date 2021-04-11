const express = require("express");
const app = express();

const path = require('path');
const session = require("express-session");

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static("public"));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// MONGODB  //

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://masteruser:ariana123@cluster0.d8qen.mongodb.net/wannaWatch?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("wannaWatch").collection("posts");
    console.log("Connected to the database")
    // perform actions on the collection object
});



//    SESSION  //
app.use(session({
	name: "test",
	secret: "secret",
	resave: false,
	saveUninitialized: true,
}));

// ROUTES TO PAGES //
app.get('/', function(req, res) {
    res.render('index')
    console.log(req.session)
}
    )

app.get('/form', function(req, res) {
    console.log(req.session)
    res.render('form', {
        name: "Arjun"
    })
  })
app.get('/aboutus', function(req, res) {
    console.log(req.session)
    res.render('aboutus')}
)

app.get('/main', function(req, res) {
    console.log(req.session)
    const collection = client.db("wannaWatch").collection("posts");
    collection.find().toArray()
    .then(results => {
        console.log("success loading")
        res.render('main', {
            posts: results
        })
        })
        .catch(error => console.error(error))


})

// POSTING //
app.post('/create_post', (req, res) => {
    // let name = input.name;
    // let title = input.title;
    // let comment = input.title;
    const collection = client.db("wannaWatch").collection("posts");
    collection.insertOne(req.body)
    .then(result => {
        console.log("success")
        res.redirect("/main")
    })
    .catch(error => console.error(error))
})

// ignore this, I couldn't get it to work :(
// app.post('/login', (req, res) => {
//     let input = req.body;
//     let name = input.name;
//     console.log(input);
//     req.session.name = name;
//     req.session.loggedin = true;
//     req.session.cookie.maxAge = 600000;
//     console.log(req.session)

// })



var port = process.env.PORT || 8080;

app.listen(port);
console.log("running on port 8080")