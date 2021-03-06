const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
require("../db/conn");
const User = require('../model/register');

module.exports = function(passport){
    passport.use(
        new localStrategy({ usernameField: 'email' }, (email, password, done) =>{
            //match user
            User.findOne({email: email})
                .then(user => {
                    if(!user){
                        return done(null, false, {message: 'user not found'})
                    } 
                    //math the password
                    bcrypt.compare(password, user.password, (err, isMatch)=>{
                        if(err) throw err;
                        
                        if(isMatch){
                            return done(null,user);
                        }else {
                            return done(null, false, {message: 'password do not match'})
                        }
                    });

                })
        })
        );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    })
    
 }

