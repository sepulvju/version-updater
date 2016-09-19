const express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/users'),
  userController = require('../controllers/user');

// define the home page route
router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/logout', function(req, res) {
  req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/application/login');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/login',  passport.authenticate('local',
	{failureRedirect:'/application/login',
	failureFlash: true}),
  function(req, res) {
		if (req.body.remember == "true") {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
    } else {
      req.session.cookie.expires = false; // Cookie expires at end of session
    }
    res.redirect('/');
});

router.post('/register', function(req, res){
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var mail = req.body.mail;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

  req.checkBody('password', 'Password is to short').checkLength();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
    var newUser = new User({
			firstname: firstname,
      lastname: lastname,
			mail:mail,
			username: username,
			password: password
		});

		userController.createUser(newUser, function(err, user){
			if(err) throw err;
		});

		req.flash('success_msg', 'You are registered and can now login');
		res.redirect('/application/login');
	};

});

passport.use(new LocalStrategy(
  function(username, password, done) {
   userController.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	};

   	userController.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		};
   	});
   });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userController.getUserById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = router;
