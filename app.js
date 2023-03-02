const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

var posts = [];

app.get("/compose", function(req, res){
  res.render("compose");
});


mongoose.connect('mongodb+srv://rohitn07:velann123@cluster0.69uq2k3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);


app.post("/compose", function(req, res){
    const post =  new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });
    post.save(post);

    res.redirect("/");
});

app.get("/", function(req, res){

    Post.find( {} ).then( function( posts ){
        res.render("home", { posts: posts });
    }).catch( function( err ){
        console.log( err );
    });

    // res.render("home", { posts: posts });
});

app.get("/posts/:postName", function(req, res){

    var requestedTitle = req.params.postName;

    Post.findOne( {title:requestedTitle} ) .then( function( post ){
          res.render("post", {post:post} ) ; 
    }).catch( function( err ){
        console.log(err);
    });
    

    // posts.forEach(function(post){
    //     var storedTitle = post.title;
    //     if (storedTitle === requestedTitle) {
    //         res.render("post", {post} );
    //     }
    // });
});

app.post("/delete/:postName", function(req, res){
    var requestedTitle = req.params.postName;
    Post.deleteOne( {title:requestedTitle} ).then( function( post ){
        res.redirect("/");
    }).catch( function( err ){
        console.log(err);
    });
});

    


app.listen(3000, function() {
  console.log("Server started on port 3000");
});