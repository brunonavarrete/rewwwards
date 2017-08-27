'use strict';

var mongoose = require('mongoose'),
	mongooseValidate = require('mongoose-validate');

var Schema = mongoose.Schema;

var ClientSchema = new Schema({
	first_name: String,
	last_name: String,
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [mongooseValidate.email, 'invalid email address']
	},
	phone: String,
	birthday: Date
}, {timestamps:true} );

var Client = mongoose.model('Client',ClientSchema);

module.exports = Client;