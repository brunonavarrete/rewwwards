var express = require('express');
var router = express.Router();
var path = require('path');
var Card = require('../models/card');

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
		var card = req.body;
		Card.create(card,function(err,card){
			if(err){
				return res.status(500).json({message:err.message});
			}
			return res.status(200).send({message:'success',card:card});
		});
	});

// PUT add visit
	router.put('/:id/visit/:visitId', function(req, res, next) {
		var id = req.params.id;
		var add_visit = req.params.visitId;
		Card.findById(id)
		.exec(function(err,card){
			if(err){
				return res.status(500).json({message:err.message});
			}
			card.visits.push(add_visit);
			card.save(function(){
				if(err){
					return res.status(500).json({message:err.message});
				}
				return res.status(200).send({message:'success',card:card});
			});
		});
	});

// DELETE :id
	router.delete('/:id', function(req, res, next) {
		var id = req.params.id;
		Card.findByIdAndRemove({_id:id},function(err){
			if(err){
				return res.status(500).json({message:err.message});
			}
			return res.status(200).send({message:'success'});
		});
	});

module.exports = router;
