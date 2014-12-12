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
    tiles: [],
    tilesSelected: []// This will be an array of arrays that will hold bools for whether a square is selected or not.
});

BoardSchema.virtual('boardId').get(function()
{
    return this._id;
});



mongoose.model('Board', BoardSchema);