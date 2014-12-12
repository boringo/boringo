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
var boardPair = new Schema({
    userId: Schema.ObjectId, 
    boardId: Schema.ObjectId
});

var GameSchema = new Schema({
	gameName:{
		type: String,
	}, 
    gameTerms:{
    	type: [String],
    }, 
    freeSpace: {
    	type: Boolean,
    },
    playerCount: {
    	type: Number,
        default: 0,
    },
    players: {
    	type: [Number],
        default: [],
    },
    boardIdPairs: {
        type: [boardPair],
        default: [],
    },
    boardLength: {	
    	type: Number,
    },
    winner: {
    	type: Number,
        default: -1,
    }
});
GameSchema.virtual('gameId').get(function() 
{
    return this._id;
});

mongoose.model('Game', GameSchema);