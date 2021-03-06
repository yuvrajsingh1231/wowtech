const express = require('express');
const router = express.Router();
const passport = require('passport');
const {ensureNotAuth} = require('../controllers/auth');


router.get('/', ensureNotAuth, (req, res, next) => {
  res.render('login')
});


router.post('/', (req, res, next) =>{
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'login',
    failureFlash:true
  })(req, res, next);
});




// function checkNotAuthenticated(req, res, next){
//   if(req.isAuthenticated()){
//     return res.redirect("/");
//   }
//   next();
// }


module.exports = router;