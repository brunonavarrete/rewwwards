var express = require('express');
var router = express.Router();
var path = require('path');
var Card = require('../models/card');

// POST /
	router.post('/', function(req, res, next) {
		var card = req.body;
		Card.create(card,function(err,card){
			if(err){
				return res.status(500).json({message:err.message});
			}
			return res.status(200).send({message:'success',card:card});
		});
	});

module.exports = router;
