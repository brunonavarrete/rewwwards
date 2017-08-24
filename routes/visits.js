var express = require('express');
var router = express.Router();
var path = require('path');
var Visit = require('../models/visit');

// GET /
	router.get('/', function(req, res, next) {
		Card.find({})
		.exec(function(err,cards){
			if(err){
				return res.status(500).json({message:err.message});
			}
			res.json(cards);
		})
	});

// POST /
	router.post('/', function(req, res, next) {
		var visit = req.body;
		Visit.create(visit,function(err,visit){
			if(err){
				return res.status(500).json({message:err.message});
			}
			return res.status(200).send({message:'success',visit:visit});
		});
	});

module.exports = router;
