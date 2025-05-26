// routes/auth.js
const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();

router.post('/registeration', userController.registrations);
//here pass the exact name "usercontroller.registerations", use this registerations name in the user.js export variable exactly


//inside the user.js we are giving this same login code as that of the register
//when the login btn is clicked ,this below method gets hit and the login controller gets executed finally
router.post('/index', userController.index1);


module.exports = router;


//after this when the register btn from the registeration.hbs is clicked, it comes here ,
//from here the controller method gets hit, the controller code is given inside the users.js
//from user.js we connect to the database