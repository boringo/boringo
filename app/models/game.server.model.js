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
var GameSchema = new Schema({
	gameName:{
		type: String,
		default: '',
	}, 
    gameTerms:{
    	type: [String],

    }, 
    freeSpace: {
    	type: Boolean,
    },
    termValidation: {
    	type: Array,
    	default: [],
    },
    playerCount: {
    	type: Number,
    },
    players: {
    	type: [Number],
    },
    boardIdPairs: [{ userId: Schema.ObjectId, boardId: Schema.ObjectId }],
    boardLength: {	
    	type: Number,
    },
    winner: {
    	type: Number,
    }
});
GameSchema.virtual('gameId').get(function() 
{
    return this._id;
});



mongoose.model('Game', GameSchema);