const express = require("express");
const app = express();

const path = require('path');
const session = require("express-session");

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static("public"));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// const MongoClient = require('mongodb').MongoClient

// 'mongodb+srv://masteruser:ariana123@cluster0.d8qen.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// MongoClient.connect('mongodb-connection-string', (err, client) => {
//     'mongodb+srv://masteruser:ariana123@cluster0.d8qen.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// })


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://masteruser:ariana123@cluster0.d8qen.mongodb.net/wannaWatch?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("wannaWatch").collection("posts");
    console.log("Connected to the database")
    // perform actions on the collection object
});


// ------------------------- //
//    SESSIONS + COOKIES     //
// ------------------------- //
app.use(session({
	name: "",
	secret: "secret",
	resave: true,
	saveUninitialized: true,
}));

// ROUTES TO PAGES //
app.get('/', function(req, res) {
    res.render('index')}
    )

app.get('/form', function(req, res) {
    res.render('form', {
        name: "Kyla"
    })
  })

  app.get('/main', function(req, res) {
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



var port = process.env.PORT || 8080;

app.listen(port);
console.log("running on port 8080")