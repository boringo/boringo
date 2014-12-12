'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var errorHandler = require('./errors.server.controller');
var Game = mongoose.model('Game');

// Lists all games.
exports.list = function(req, res) {
	Game.find(null, 'gameId gameName playerCount', function(err, games) {
		if (err) {
			return res.status(500).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(games);
		}
	});
};
