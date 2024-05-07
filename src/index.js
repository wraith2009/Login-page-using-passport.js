import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import "./middlewares/passport-auth.js";
import passport from "passport";
import https from 'https';
import fs from 'fs';

dotenv.config({
    path: "./env"
});

// Load SSL certificate and private key
const options = {
    key: fs.readFileSync('C:\\Users\\Rahul\\key.pem'),
    cert: fs.readFileSync('C:\\Users\\Rahul\\cert.pem')
};

connectDB().then(() => {
    // Create HTTPS server
    https.createServer(options, app).listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log("MongoDB connection failed !!!", err);
});

// Define routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['email'] })
);

app.get('/auth/google/redirect',
    passport.authenticate('google'),
    (req, res) => {
        // This function will only be called if authentication succeeds
        res.send("Authentication successful!");
    }
);

app.get("/", (req, res) => {
    res.send("Authentication Check");
});
