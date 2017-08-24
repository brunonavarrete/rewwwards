var express = require('express');
var router = express.Router();
var path = require('path');
var Visit = require('../models/visit');

// GET /
	router.get('/', function(req, res, next) {
		Visit.find({})
		.exec(function(err,visits){
			if(err){
				return res.status(500).json({message:err.message});
			}
			res.json(visits);
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

// DELETE /
	router.delete('/:id', function(req, res, next) {
		var id = req.params.id;
		Visit.findByIdAndRemove({_id:id},function(err){
			if(err){
				return res.status(500).json({message:err.message});
			}
			return res.status(200).send({message:'success'});
		});
	});

module.exports = router;
