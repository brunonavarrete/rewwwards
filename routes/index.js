var express = require('express');
var router = express.Router();
var path = require('path');

// GET root
	router.get('/',function(req,res){
		res.send('../public/index.html');
	});

module.exports = router;
