var express = require('express');
var router = express.Router();
var path = require('path');
var Client = require('../models/client');


// GET 
	// view (list)
		router.get('/', function(req, res, next) {
			res.sendFile(path.join(__dirname + '/../public/clients.html'));
		});

	// GET all clients
		router.get('/all',function(req, res, next){
			Client.find({})
			.exec(function(err,clients){
				if(err){
					return res.status(500).json({message:err.message});
				}
				res.status(201);
				return res.json(clients);
			});
		});

	// GET single client
		router.get('/:id',function(req, res, next){
			var id = req.params.id;
			Client.findById(id)
			.exec(function(err,client){
				if(err){
					return res.status(500).json({message:err.message});
				}
				return res.json(client);
			});
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

// PUT
	// update data
		router.put('/:id', function(req, res, next) {
			var id = req.params.id;
			Client.findById(id)
			.exec(function(err,client){
				if(err){
					return res.status(500).json({message:err.message});
				}
				client.first_name = req.body.first_name;
		        client.last_name = req.body.last_name;
		        client.email = req.body.email;
		        client.phone = req.body.phone;
		        client.birthday = req.body.birthday;
				client.save(function(err){
					if(err){
						return res.status(500).json({message:err.message});
					}
					return res.status(200).send({message:'success',client:client});
				});
			});
		});
	// add card
		router.put('/:id/card/:cardId', function(req, res, next) {
			var id = req.params.id;
			var add_card = req.params.cardId;
			Client.findById(id)
			.exec(function(err,client){
				if(err){
					return res.status(500).json({message:err.message});
				}
				client.cards.push(add_card);
				//client.cards = [];
				client.save(function(){
					if(err){
						return res.status(500).json({message:err.message});
					}
					return res.status(200).send({message:'success',client:client});
				});
			});
		});

// DELETE :id
	router.delete('/:id', function(req, res, next) {
		var id = req.params.id;
		Client.findByIdAndRemove({_id:id},function(err){
			if(err){
				return res.status(500).json({message:err.message});
			}
			return res.status(200).send({message:'success'});
		});
	});

module.exports = router;
