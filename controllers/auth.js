module.exports  = {
    ensureAuth: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'plese login to view resources');
        res.redirect('login');
    },
    ensureNotAuth: function(req, res, next){
        if(req.isAuthenticated()){
            return res.redirect('/');
        }
        req.flash('error_msg', 'alredy loged in');
        next();
    }
}

