var express = require('express');
var router = express.Router();
var path = require('path');

// GET root
	router.get('/',function(req,res){
		res.send('../public/index.html');
	});

// GET register
	router.get('/register',function(req,res){
		res.sendFile(path.join(__dirname + '/../public/register.html'));
	});

module.exports = router;
