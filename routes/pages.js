
const express=require("express");

const router = express.Router(); // ✅ Correct

//now cut all the routing part from the app.js and place it here in this section
//for easier segregation of the routes separately instead of dumping it in the same app.js 
//change the app in the routings copied from app.js and change it to router

//specify the routing here
//redirecting to home page
//sending a request and reciveing the response
//here give the paths inside the index.hbs template and in registration.hbs
router.get("/",(req,res)=>{
//res.send("<h1>Hello Welcome to redisolve</h1>");
res.render('index'); //rendering the templates in the index.hbs instead of the manual one
}) ;

router.get("/registeration",(req,res)=>{
//res.send("<h1>Hello Welcome to redisolve</h1>");
res.render("registeration"); //rendering the templates in the index.hbs instead of the manual one
}) ;

router.get("/profile",(req,res)=>{
//res.send("<h1>Hello Welcome to redisolve</h1>");
res.render("profile"); //rendering the templates in the index.hbs instead of the manual one
}) ;



//now with this modules we can export the routes to various pages
//after this go to app.js
module.exports=router;