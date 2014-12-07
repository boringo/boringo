'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
/**
 * Game Schema
 */
var BoardSchema = new Schema({
    tiles: {
        type: [[Number]],
    }

});
BoardSchema.virtual('boardId').get(function()
{
    return this._id;
});



mongoose.model('Board', BoardSchema);