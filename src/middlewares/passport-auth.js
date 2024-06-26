import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "../model/user.model.js";

// serializing user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//deserializing user
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
    
});

// Strategy setup
passport.use(
    new Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://cf7e-103-248-95-25.ngrok-free.app/auth/google/redirect",
            passReqToCallback: true
        },

        async (req, accessToken, refreshToken, profile, done) => {
            
            // finding user in data base
            let findUser;
            try {
                findUser = await User.findOne({profileId : profile.id});    
            } catch (error) {
                console.log("there seems to be some problem in finding User in DB");
                return done(error, null);
            }
            
            try {
                if(!findUser){
                    const newUser = new User({
                        profileId : profile.id, 
                        username : profile.displayName,
                        email: profile.emails ? profile.emails[0].value : null
                    });

                    console.log("Data of new user going in DB", newUser);
                    const newsavedUser = await newUser.save();
                    done(null, newsavedUser);
                }
                else{
                    console.log("User already exist in DB");
                    console.log("the details are", findUser);
                    done(null, findUser);
                }
                     
            } catch (error) {
                console.log("problem in creating / saving user in db", error);
            }
            
            
        }
    )
);

export default passport;
