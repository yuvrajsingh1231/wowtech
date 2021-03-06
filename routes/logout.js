const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    req.logout();
    req.flash('sucess_msg', 'You are logged out sucessfuly');
    res.redirect("login");
  });

module.exports = router;