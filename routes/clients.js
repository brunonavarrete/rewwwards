var express = require('express');
var router = express.Router();
var path = require('path');
var Client = require('../models/client');

// GET /
	router.get('/', function(req, res, next) {
		Client.find({})
		.exec(function(err,clients){
			if(err){
				return res.status(500).json({message:err.message});
			}
			res.json(clients);
		})
	});

// POST /
	router.post('/', function(req, res, next) {
		var client = req.body;
		Client.create(client,function(err,client){
			if(err){
				return res.status(500).json({message:err.message});
			}
			// req.session.clientId = client._id; // creates req.session and gives it clientId property
			// req.session.clientEmail = client.email;
			return res.status(200).send({message:'success',client:client});
		});
	});

module.exports = router;
