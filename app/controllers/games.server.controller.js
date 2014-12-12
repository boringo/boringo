'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var errorHandler = require('./errors.server.controller');
var User = mongoose.model('User');
var Game = mongoose.model('Game');
var Board = mongoose.model('Board');
var _ = require('lodash');

// Creates a Board
function generateBoard(TermArray,boardLength,free)
{
	var ArrayCopy = TermArray.slice();
	var boardArray = new Array(boardLength);
	var index;
	var i;
	var j;
	for(i=0; i<boardLength; i++)
	{
		boardArray[i] = new Array(boardLength);
	}
	for(i=0; i<boardLength; i++)
	{
		for(j=0; j<boardLength; j++)
		{
			index = Math.floor(Math.random() * ArrayCopy.length );
			if(index < ArrayCopy.length)
			{
				boardArray[i][j] = ArrayCopy[index];
				ArrayCopy.splice(index,1);
			}
		}

	}

	if(free === true)
	{
		var x = Math.floor(Math.random()*boardLength);
		var y = Math.floor(Math.random()*boardLength);
		boardArray[x][y] = 'FREESPACE';

	}

	return boardArray;

}



// Creates a game.
exports.create = function(req, res) {
	var body = req.body;
	var user = req.session.user;
	console.log('Creating game...');
	var game = new Game({
		gameName: body.gameName,
		gameTerms: body.gameTerms,
		freeSpace: body.freeSpace,
		boardLength: body.boardLength
	});
	console.log('Done.');
	console.log('Creating board...');
	var board = new Board({
		tiles: generateBoard(body.gameTerms, body.boardLength, body.freeSpace)
	});
	console.log('Done.');
	game.save(function(err) {
		if (err) {
			console.log('Error saving game to database.');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			board.save(function(err) {
				if (err) {
					console.log('Error saving board to database.');
					// TODO: First remove the game from the DB?
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(board);
				}
			});
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
			res.json(games);
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
