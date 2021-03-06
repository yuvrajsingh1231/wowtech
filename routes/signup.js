const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


require("../db/conn");
const Users = require('../model/register');
const {ensureNotAuth} = require('../controllers/auth');





/* GET users listing. */

router.get('/', ensureNotAuth, function(req, res, next) {
  res.render('signup', {data: {message:"", value:""}});
});

router.post('/',(req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  let errors = [];
  
  if(!name || !email || !password || !confirmpassword){
    errors.push({msg: 'plese fill in all feilds'});
  }
    if(password !== confirmpassword){
      errors.push({msg: 'password do not mathch'});
    }

    if(password.length < 6){
      errors.push({msg: 'password shoud be of six chracters'});
    }
    // console.log( 'lenght of err' + errors.lenght);
    if(errors.length > 0) {
      
      res.render('signup',{
        errors,
        name,
        email,
        password,
        confirmpassword
      });
    } else {

      Users.findOne({email: email})
        .then(user => {
          if(user){
            errors.push({msg:"user alredy exist"})
            res.render('signup',{
              errors,
              name,
              email,
              password,
              confirmpassword
            });
          } else {
            const newUser = new Users({
              name,
              email,
              password
            });
            //hash password
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hashPassword) =>{
              if(err) throw err;
              //set password to hash
              newUser.password = hashPassword;
              // save user
              newUser.save()
                .then(user => {
                  req.flash('sucess_msg', 'you are now registred an can log in');
                  res.redirect('login');
                })
                .catch(err => console.log(err))
            }))
          }

        })
    }

  
});



module.exports = router;