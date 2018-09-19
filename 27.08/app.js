
const express = require('express');
const app = express();
app.set('view engine', 'pug');
var cool = require('cool-ascii-faces')
var ejs=require('ejs');

app.get('/', (req, res) => {
    res.send( 'I love Step IT Academy!' );
  });

  app.get('/pug', (req, res) => {
    res.render('index');
  });

  app.get('/hello', (req, res) => {
    res.send( 'Hello, Node Ninja!' );

  });

  app.get('/cool', (req, res) => {
    res.send(cool());

  });
app.get('/flashcards', (req, res) => {
    res.render('cards', {prompt: "Who is buried in Grant's tomb?",etc : "Tell me!"});
});

app.listen(3000,()=>{
    console.log("Server started on port 3000");
});