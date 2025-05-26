
//to run the server ,we have to start the express server

const express=require('express');
const mysql=require("mysql2"); //this is used for connecting the mysql database
//see here when i install mysql it throws db conncetion error, because the latest version wouldnt be installed
//so we have to use the latest version, so uninstall mysql and install mysql2

const doenv=require("dotenv");
const path=require("path");
const hbs=require("hbs");
const app=express(); //create an express object


//for securing the passwords and storing in the path we use this
//create a .env file  and just pass the constants about the db as raw datas
//here pass the env path here for configuration,we can  store any sensitive datas in the env file and call the variable here

doenv.config({
    path:"./.env"
});



//instead of giving the root and passwords here directly ,we pass the values in a .env file to constants
//and then pass the names correctly here
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE, //this is the database which we created in the my sql workbench
    
    })

  

    //to check the connection
  // Test the database connection
db.connect((err) => {
    if (err) {
        console.log(err);

          console.log("DB HOST:", process.env.DATABASE_HOST);
console.log("DB USER:", process.env.DATABASE_USER);
console.log("DB PASS:", process.env.DATABASE_PASS);
console.log("DB NAME:", process.env.DATABASE);
    } else {
        console.log("MySQL Connection Success");
    }
});

console.log(__dirname); //to get the current directory name

//static file location
const location=path.join(__dirname,"./public"); //here we are jioning the public static folder to the existing directory structure
app.use(express.static(location)); //here now we can acess the static files like images etc
app.set('view engine',"hbs"); //here we are going to use the hbs engine,when you see the browser,the hbs engine will run

//create this variable for creating a design like master page where common things will get placed in one part
const partialsPath=path.join(__dirname,"./views/partials");
hbs.registerPartials(partialsPath);



//here all the routes i have givn here moved to the pages.js separately
 app.use('/',require('./routes/pages'))


 // Add these lines - middlewares for sending the request format of the form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


  app.use('/auth',require('./routes/auth'))






//to execute the above in a port, so to open a port we have to create a port to 
//run the application ,here iam using the port 5000
app.listen(5000,() => {
    console.log("server started @ port 5000");
});

//got the package.json and add the start nodemon, for auto refresh of the node scripts
//  "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start":"nodemon app.js" --- //add this part with the file name we are running the code
//   },

// to run the above code in the terminal ,"give the command " -- npm start
//now open the browser ,type "localhost:5000(this is the specified port number")
//in the browser you will see the h1 tag heelo text in the web page