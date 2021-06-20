//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash")
const mongoose=require('mongoose');
const { result } = require("lodash");

mongoose.connect("mongodb://localhost:27017/blogApp",{useNewUrlParser:true})

const postSchema= mongoose.Schema({
  title:String,
  content:String
})
const Post=mongoose.model("Post",postSchema)



const homeStartingContent ="Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";


const contactContent ="Lacasasus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

let day1= new Post({
  title:"day 1",
  content:"Great day"
})

let day2= new Post({
  title:"day2",
  content:"Another Great day"
})




const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//GLOBAL variables

let defaultPosts=[day1,day2];

// Get methods

// Home page
app.get("/", (req, res) => {
  Post.find((err,result)=>{
    if(err){
      console.log("Error"+err)
    }
    else{
      if (result.length==0){
        Post.insertMany(defaultPosts,(err)=>{
          if(err){
            console.log(err)
          }
          else{
            "default items saved to DB"
          }
        })
        res.redirect("/");
      }
      else{
        
        res.render("home",{posts:result,homecontent:homeStartingContent})
    }
  }})
}
);




// About page
app.get("/about", (req, res) => {
 
  res.render("about",{para2:aboutContent});
});

// Contact page
app.get("/contact", (req, res) => {
 
  res.render("contact",{para3:contactContent});
});
// Compose page

app.get("/compose",(req,res)=>{
  res.render("compose")

});


//routing parameter based

app.get('/posts/:postId',(req,res)=>{
  const requestedid=String(req.params.postId);
  
  
  Post.findById(requestedid,(err,element)=>{
    if (err){
      console.log(err);
    }
    else{
      if((!element)){
       
        res.redirect('/')

      }
      else{
        
        res.render('post',{element:element})
      }
    }
  })



})






// Post Methods

app.post("/compose",(req,res)=>{
  const post= new Post({
    content:String(req.body.contentPost),
    title:String(req.body.contentTitle)
  });

  post.save((err,result)=>{
    if(err){
      console.log(err)
    }
    else{
      console.log("successfully posted")
      res.redirect("/") 
    }

  })    

 
})


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
