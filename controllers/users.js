
//here the data comes from the post method in the auth.js here , in this controller, the operation executes and the
//datas gets saved to the db


const mysql=require("mysql2");
const bcrypt=require("bcryptjs"); //this variable is used for encrypting the password and storing it in the db

const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE, //this is the database which we created in the my sql workbench
    
    })



    // controllers/login.js ------------ here use the same name as that of the name given in the auth.js
    exports.index1 = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).render('index', {
        msg: "Please enter email and password",
        msg_type: "error",
      });
    }

    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).render('index', {
          msg: "Database error",
          msg_type: "error",
        });
      }

      if (result.length === 0) {
        return res.status(401).render('index', {
          msg: "Email or password incorrect",
          msg_type: "error",
        });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, result[0].pass);
      if (!isMatch) {
        return res.status(401).render('index', {
          msg: "Email or password incorrect",
          msg_type: "error",
        });
      }

      // Login successful
    return res.status(200).render('profile', {
  msg: "Good",   // Your success message
  msg_type: "success",
  user: result[0].name  // Optional: pass user name if you want to show it
});
    });

  } catch (error) {
    console.log(error);
    return res.status(500).render('index', {
      msg: "Server error",
      msg_type: "error",
    });
  }
  
};



// controllers/users.js
exports.registrations = (req, res) => {
    const { name, email, password, confirm_pass } = req.body;
    console.log("User Registered:", name, email, password, confirm_pass);
    console.log(req.body);

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error);
            return res.send("Database error.");
        }

        if (result.length > 0) {
            return res.render('registeration', { msg: "Email ID already taken" });
        }

        else if(password!==confirm_pass){
              return res.render('registeration', { msg: "Password do not match" });
        }

        console.log("Before hashing password");
        let hashedpassword=await bcrypt.hash(password,8); //when you add await ,you have to use aync function in the db query
        console.log("Hashed password:",hashedpassword) ;

       
        //inserting the values to the db
//here give the property names which match with the db columns and in the design also give the same names as in db column fields
//here "users" is the table name we created in the mysql workbench
        db.query("insert into users set ?",{
            name:name,
            email:email,
            pass:hashedpassword
        },(err,res) => {
            if(err){
                console.log(err);
            }

            else{
                console.log(res);
                return res.render("registeration",{msg:"user registered successfully"});
            }
        })

        // You can now insert the user or proceed further
        res.send("Registration successful!");
    });
};
