import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session"
import passport from "passport";



const app = express()

app.use(session({
    secret: 'rahul',
    resave: false,
    saveUninitialized: false
}));

//Initiaize passport.js middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())





export { app }