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
	phone: Number,
	birthday: Date,
	cards: [] // [{type: Schema.Types.ObjectId, ref: 'Card'}]
}, {timestamps:true} );

var Client = mongoose.model('Client',ClientSchema);

module.exports = Client;