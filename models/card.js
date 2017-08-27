'use strict';

var mongoose = require('mongoose'),
	mongooseValidate = require('mongoose-validate');

var Schema = mongoose.Schema;

var CardSchema = new Schema({
    client: {
    	type: Schema.Types.ObjectId,
    	ref: 'Client'
    }
}, { timestamps:true } );

var Card = mongoose.model('Card',CardSchema);

module.exports = Card;