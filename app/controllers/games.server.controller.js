'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var errorHandler = require('./errors.server.controller');
var User = mongoose.model('User');
var Game = mongoose.model('Game');
var _ = require('lodash');

// Creates a game.
exports.create = function(req, res) {
	var body = req.body;
	var game = new Game({
		gameName: body.gameName,
		gameTerms: body.gameTerms,
		freeSpace: body.freeSpace,
		boardLength: body.boardLength
	});
	game.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(game);
		}
	});
};

// Lists all games.
exports.list = function(req, res) {
	Game.find(null, 'gameId gameName playerCount', function(err, games) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(req.session.user);
		}
	});
};

// Joins a game.
exports.join = function(req, res) {
	res.json(req.session.user);
};

// /**
//  * Article middleware
//  */
// exports.articleByID = function(req, res, next, id) {
// 	Article.findById(id).populate('user', 'displayName').exec(function(err, article) {
// 		if (err) return next(err);
// 		if (!article) return next(new Error('Failed to load article ' + id));
// 		req.article = article;
// 		next();
// 	});
// };

// /**
//  * Article authorization middleware
//  */
// exports.hasAuthorization = function(req, res, next) {
// 	if (req.article.user.id !== req.user.id) {
// 		return res.status(403).send({
// 			message: 'User is not authorized'
// 		});
// 	}
// 	next();
// };
