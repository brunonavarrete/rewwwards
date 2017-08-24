'use strict';

var mongoose = require('mongoose'),
	mongooseValidate = require('mongoose-validate');

var Schema = mongoose.Schema;

var VisitSchema = new Schema({
	client: String, // { type: Schema.Types.ObjectId, ref: 'Client'},
	card: String, // { type: Schema.Types.ObjectId, ref: 'Card'},
	confirmed: { type: Boolean, default: false }
}, {timestamps:true} );

var Visit = mongoose.model('Visit',VisitSchema);

module.exports = Visit;