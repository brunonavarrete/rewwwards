'use strict';

var mongoose = require('mongoose'),
	mongooseValidate = require('mongoose-validate');

var Schema = mongoose.Schema;

var VisitSchema = new Schema({
	card: { 
		type: Schema.Types.ObjectId,
		ref: 'Card'
	}
}, {timestamps:true} );

var Visit = mongoose.model('Visit',VisitSchema);

module.exports = Visit;