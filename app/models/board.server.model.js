'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
/**
 * BoardSchema
 */
var BoardSchema = new Schema({
    tiles: [Number]
});

BoardSchema.virtual('boardId').get(function()
{
    return this._id;
});



mongoose.model('Board', BoardSchema);