var express = require('express');
var router = express.Router();
var passport = require('passport');
const {ensureAuth} = require('../controllers/auth'); 

/* GET home page. */
router.get('/', ensureAuth, function(req, res, next) {

  res.render('index', { name: req.user.name });
});



module.exports = router;
