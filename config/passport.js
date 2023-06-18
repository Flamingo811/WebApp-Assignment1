/*
        File Name: WebApp Assignment2
        Student Name: Ka Wah Lau
        Student ID: 301255100
        Date: 18-June-2023
*/

    const User = require('../models/User');
    const LocalStrategy = require("passport-local").Strategy;
    const bcrypt = require('bcryptjs');
    
    module.exports = function (passport) {
        passport.use(
            new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
            User.findOne({ username: username })
            .then((user) => {
                if (!user) {
                    return done(null, false, { message: 'Invalid username or password' });
                }
    
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
    
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Invalid username or password' });
                    }
                });
            })
            .catch((err) => {
              console.log(err);
              return done(err);
            });
            })
        );
    
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });
    
        passport.deserializeUser((id, done) => {
            User.findById(id).exec()
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err);
            });
        });
    };
    
    
    // Create user login details
    /*
    const userRecord = new User({
      username: 'annieyip',
      password: 'password', 
      email: 'annieyip@gmail.com',
    });*/