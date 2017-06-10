//This prevents from making common errors
'use strict'; 

//This requires the express module assigns it to the const "express"
const express = require('express'),
      //This is to make use of the mock data
        posts = require('./mock/posts.json');

//Assigning express to the new variable "app"
const app = express();

//app.set defines different settings in express
//This tells express how to render our engine
app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');



//Creating a route (or endpoint) to the root of the server (index) with the get method
app.get('/', function(req, res){
  res.render('index');
});

//A route to /blog with the response of the posts
//Adding a parameter to the blog route with /:id. '?' means parameter is optional
app.get('/blog/:title?', function(req, res){
  
  //assigns the value of the title key in the params object to variable "title"
  const title = req.params.title;
  
  if (title === undefined) {
    //response status of 503 indicates service is unavailable
    res.status(503);
    res.send("This page is under construction!")
  } else {
    
    //if the post does not exist, it's defined as an empty object {}
    const post = posts[title] || {};
    res.render('post', {post: post});
  }
});



//Set up the development server with the listen method w/ one paramater; the port method 3000
app.listen(3000, function(){
  console.log("The front end server is running on port 3000!!");
});