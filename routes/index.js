var express = require('express');
var router = express.Router();
var path = require('path');
var Client = require('../models/client');
var Card = require('../models/card');
var Visit = require('../models/visit');
var mockClients = require('../mock/clients.json');
var mockCards = require('../mock/cards.json');
var mockVisits = require('../mock/visits.json');

// GET root
	router.get('/',function(req,res){
		res.send('../public/index.html');
	});

// POST
	router.post('/seed/clients/',function(req,res){
		Client.remove({})
		.exec(function(err){
			if(err){
				return res.status(500).json({message:err.message});
			}
			Client.create(mockClients,function(err,clients){
				if(err){
					return res.status(500).json({message:err.message});
				}
				res.json(clients)
			});
		});
	});

	router.post('/seed/cards/',function(req,res){
		Card.remove({})
		.exec(function(err){
			if(err){
				return res.status(500).json({message:err.message});
			}
			Card.create(mockCards,function(err,cards){
				if(err){
					return res.status(500).json({message:err.message});
				}
				res.json(cards)
			});
		});
	});

	router.post('/seed/visits/',function(req,res){
		Visit.remove({})
		.exec(function(err){
			if(err){
				return res.status(500).json({message:err.message});
			}
			Visit.create(mockVisits,function(err,visits){
				if(err){
					return res.status(500).json({message:err.message});
				}
				res.json(visits)
			});
		});
	});

module.exports = router;
