'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Game Schema
 */
var GameSchema = new Schema({
	gameId: {
		type: Number,
		default: 0,
	},
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
    boardIdPairs: {
    	type: Array,
    },
    currentBoardSize: {	
    	type: [Number],
    },
    currentLeader: {
    	type: [Number],
    },
    winner: {
    	type: Number,
    }
});


mongoose.model('Game', GameSchema);