import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import "./middlewares/passport-auth.js"
import passport from "passport";
import session from "express-session"
dotenv.config({
    path: "./env"
})
app.use(session({
    secret: 'rahul',
    resave: false,
    saveUninitialized: false
}));



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDb connection failed !!!", err);
})

//routes

// app.get('/auth/google', passport.authenticate('google'), );
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email'] }
));

app.get('/auth/google/redirect',
    passport.authenticate('google'),
    (req, res) => {
        // This function will only be called if authentication succeeds
        res.send("Authentication successful!");
    }
);



app.get("/",(req,res)=>{res.send("Authentication Check")})
