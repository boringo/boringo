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
	var indexArray = [];
	for(var t = 0; t < TermArray.length; t++)
	{
		indexArray[t] = t;
	}
	var boardArray = new Array(boardLength);
	var boolBoard = new Array(boardLength);
	var index;
	var i;
	var j;
	for(i=0; i<boardLength; i++)
	{
		boardArray[i] = new Array(boardLength);
		boolBoard[i] = new Array(boardLength);
	}
	for(i=0; i<boardLength; i++)
	{
		for(j=0; j<boardLength; j++)
		{
			
			boolBoard[i][j] = false;
			index = Math.floor(Math.random() * indexArray.length );
			if(index < indexArray.length)
			{
				boardArray[i][j] = indexArray[index];
				indexArray.splice(index,1);
			}
		    
		}

	}
	var freeCoords;
	if(free === true)
	{
		var x = Math.floor(Math.random()*boardLength);
		var y = Math.floor(Math.random()*boardLength);
		boardArray[x][y] = -1;
		boolBoard[x][y] = true;

	}

	var boardInfo = ({
		board: boardArray,
		tilesSelected: boolBoard
	});
	return boardInfo;

}


// Creates a game.
exports.create = function(req, res) {
	var body = req.body;
	var user;
	 User.findById(req.session.userId, function(err,userDoc){
	 	if(err){
	 		return res.status(500).send({
				message: errorHandler.getErrorMessage(err)
			});
	 	}
	 	else
	 	{

	 		user = userDoc;
			var game = new Game({
				gameName: body.gameName,
				gameTerms: body.gameTerms,
				freeSpace: body.freeSpace,
				boardLength: body.boardLength
			});
			//Create Board, both the term reference board and the selected tiles Board.
			console.log('Done.');
			console.log('Creating board...');
			var boardinfo = generateBoard(body.gameTerms, body.boardLength, body.freeSpace);
			var board = new Board({
				tiles: boardinfo.board,
				tilesSelected: boardinfo.tilesSelected
			});

			user.CurrentGames.push(game.gameId);
			game.playerCount ++;
			game.players.push(user.userId);

			var boardIdPair = ({
				userId: user.userId,
				boardId: board.boardId
			});
			game.boardIdPairs.push(boardIdPair);

			console.log('Done.');
			game.save(function(err) {
				if (err) {
					console.log('Error saving game to database.');
					return res.status(500).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					board.save(function(err) {
						if (err) {
							console.log('Error saving board to database.');
							Game.remove({gameId: game.gameId}, function(err) {
								if (err) {
									return res.status(500).send({
										message: errorHandler.getErrorMessage(err)
									});
								}
							});
							return res.status(500).send({
								message: errorHandler.getErrorMessage(err)
							});
						} else {
							user.save(function(err){
								if (err) {
									return res.status(500).send({
										message: errorHandler.getErrorMessage(err)
									});
								}
							});
							res.json(board);
						}
					});
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
