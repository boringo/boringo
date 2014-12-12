'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var errorHandler = require('./errors.server.controller');
var User = mongoose.model('User');
var Game = mongoose.model('Game');
var Board = mongoose.model('Board');

// Generates a game board.
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
	User.findById(req.session.userId, function(err,user){
	 	if(err){
	 		return res.status(500).send({
				message: errorHandler.getErrorMessage(err)
			});
	 	}
	 	else
	 	{
			var body = req.body;
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

// Joins a game.
exports.join = function(req, res) {
	// TODO
	res.json({gameID: req.params.gameID});
};

// Leaves a game.
exports.leave = function(req, res) {
	User.findById(req.session.userId, function(err,user){
	 	if(err){
	 		return res.status(500).send({
				message: errorHandler.getErrorMessage(err)
			});
	 	}
	 	else
	 	{
		 
		 	Game.findById(req.params.gameID, function(err,game){
		 		if(err){
		 			return res.status(500).send({
						message: errorHandler.getErrorMessage(err)
					});
		 		}
		 		else
		 		{
		 			var i;
		 			for(i = 0; i < game.players.length; i++)
		 			{
		 				if(game.players[i] === user.userId)
		 				{
		 					game.players.splice(i,1);
		 				}
		 				if(game.boardIdPairs[i].userId === user.userId)
		 				{
		 					game.boardIdPairs[i].splice(i,1);
		 				}
		 			}
		 			game.playerCount --;

		 			for(i=0; i<user.CurrentGames.length; i++)
		 			{
		 				if(user.CurrentGames[i] === game.gameID)
		 				{
		 					user.CurrentGames.splice(i,1);
		 				}

		 			}

					res.json({gameID: req.params.gameID});
				}

			});
			
		}
	});


};

// Returns the state of a game.
exports.state = function(req, res) {
	// TODO
	res.json({gameID: req.params.gameID});
};

// Selects a tile in a game.
exports.select = function(req, res) {
	// TODO
	res.json({gameID: req.params.gameID});
};
