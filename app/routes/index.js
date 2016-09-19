const express = require('express');
const router = express.Router();

// define the home page route
router.get('/', ensureAuthenticated, function(req, res) {
  res.render('index',{
		started:true
	});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/application/login');
	};
};


module.exports = router;
