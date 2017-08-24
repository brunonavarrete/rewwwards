'use strict';

var mongoose = require('mongoose'),
	mongooseValidate = require('mongoose-validate');

var Schema = mongoose.Schema;

var CardSchema = new Schema({
    visits: [],
    client: String // {type: Schema.Types.ObjectId, ref: 'Card'}
}, {timestamps:true} );

var Card = mongoose.model('Card',CardSchema);

module.exports = Card;