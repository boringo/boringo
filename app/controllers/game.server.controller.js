'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var errorHandler = require('./errors.server.controller');
var User = mongoose.model('User');
var Game = mongoose.model('Game');
var Board = mongoose.model('Board');

// Generates a game board.
function generateBoard(game)
{
	var terms = game.gameTerms;
	var length = game.boardLength;
	var free = game.freeSpace;
	var indexArray = [];
	for(var t = 0; t < terms.length; t++)
	{
		indexArray[t] = t;
	}
	var boardArray = new Array(length);
	var boolBoard = new Array(length);
	var index;
	var i;
	var j;
	for(i=0; i<length; i++)
	{
		boardArray[i] = new Array(length);
		boolBoard[i] = new Array(length);
	}
	for(i=0; i<length; i++)
	{
		for(j=0; j<length; j++)
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
		var x = Math.floor(Math.random()*length);
		var y = Math.floor(Math.random()*length);
		boardArray[x][y] = -1;
		boolBoard[x][y] = true;
	}
	return {
		tiles: boardArray,
		tilesSelected: boolBoard
	};
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
			var board = new Board(generateBoard(game));

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
	User.findById(req.session.userId, function(err, user){
		if (err) {
	 		return res.status(500).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			Game.findById(req.params.gameID, function(err, game) {
				if (err) {
			 		return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					console.log({username: user.username, currentGames: user.CurrentGames});
					if (user.CurrentGames.indexOf(game._id) > -1) {
						// The user has already joined this game.
				 		return res.status(400).send({
							message: 'You have already joined that game.'
						});
					} else {
						// Generate a board for the user.
						var boardObject = generateBoard(game);
						var board = new Board(boardObject);
						var boardIDPair = {
							userId: user._id,
							boardId: board._id
						};
						game.boardIdPairs.push(boardIDPair);
						// Update other game fields.
						game.players.push(user._id);
						game.playerCount++;
						// Update the user document.
						user.CurrentGames.push(game._id);
						// Save the documents.
						game.save(function(err) {
							if (err) {
						 		return res.status(500).send({
									message: errorHandler.getErrorMessage(err)
								});
							} else {
								user.save(function(err) {
									if (err) {
								 		return res.status(500).send({
											message: errorHandler.getErrorMessage(err)
										});
									} else {
										// Create and return the response object.
										var obj = {
											// Fields from the game document.
											gameTerms: game.gameTerms,
											playerCount: game.playerCount,
											players: game.players,
											boardLength: game.boardLength,
											winner: game.winner,
											// The player's board.
											board: boardObject
										};
										res.json(obj);
									}
								});
							}
						});
					}
				}
			});
		}
	});
};

// Leaves a game.
exports.leave = function(req, res) {
	User.findById(req.session.userId, function(err, user) {
	 	if(err){
	 		return res.status(500).send({
				message: errorHandler.getErrorMessage(err)
			});
	 	}
	 	else
	 	{
		 	Game.findById(req.params.gameID, function(err, game) {
		 		if(err){
		 			return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
		 		}
		 		else
		 		{
		 			var i;
		 			var found = false;
		 			for(i=0; i<user.CurrentGames.length; i++)
		 			{
		 				if(user.CurrentGames[i].equals(game._id))
		 				{
		 					found = true;
		 					user.CurrentGames.splice(i,1);
		 				}
		 			}
		 			if (found) {
			 			for(i = 0; i < game.players.length; i++)
			 			{
			 				if(game.players[i].equals(user._id))
			 				{
			 					game.players.splice(i,1);
			 				}
			 				if(game.boardIdPairs[i].userId.equals(user._id))
			 				{
			 					game.boardIdPairs.splice(i,1);
			 				}
			 			}
			 			game.playerCount--;
						// Save the documents.
						game.save(function(err) {
							if (err) {
						 		return res.status(500).send({
									message: errorHandler.getErrorMessage(err)
								});
							} else {
								user.save(function(err) {
									if (err) {
								 		return res.status(500).send({
											message: errorHandler.getErrorMessage(err)
										});
									} else {
										// The user has left the game. Return 200 OK.
										res.send();
									}
								});
							}
						});
					} else {
				 		return res.status(400).send({
							message: 'You have not joined that game.'
						});
					}
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
exports.select = function(req, res){
	User.findById(req.session.userId, function(err,user){
	 	if(err){
	 		return res.status(500).send({
				message: errorHandler.getErrorMessage(err)
			 });
	 	}
	 	else{
		 	Game.findById(req.params.gameID, function(err,game){
			 	if(err){
			 		return res.status(500).send({
						message: errorHandler.getErrorMessage(err)
					 });
			 	}
			 	else{
			 		if(game.winner === -1){
				 		var x = req.body.x;
				 		var y = req.body.y;
				 		var currentBoard;
				 		var i;
				 		for(i = 0; i < game.boardIdPairs.length; i++){
				 			if(game.boardIdPairs[i].userId.equals(user.userId)){
				 				Board.findById(game.boardIdPairs[i].boardId, function(err,boardDoc){
								 	if(err){
								 		return res.status(500).send({
											message: errorHandler.getErrorMessage(err)
										});
								 	}
								 	else{
								 		currentBoard = boardDoc;
								 		currentBoard.tilesSelected[x][y] = true;
								 		var j;
								 		var k;
								 		var isWinning = false;
								 		//check rows 
								 		for(i = 0; i < game.boardLength; i++){
								 			for(j = 0; j < game.boardLength; j++){
								 				if(game.currentBoard.tilesSelected[i][j] !== true){
								 					isWinning = false;
								 					break;
								 				}
								 				else{
								 					isWinning = true;
								 				}
								 			}
								 			if(isWinning === true){
								 				game.winner = user.userId;
								 				break;
								 			}
				 						}//END CHECK ROWS
				 						if(isWinning === false){
				 							//Check Columns
					 						for(i = 0; i < game.boardLength; i++){
									 			for(j = 0; j < game.boardLength; j++){
									 				if(game.currentBoard.tilesSelected[j][i] !== true){
									 					isWinning = false;
									 					break;
									 				}
									 				else{
									 					isWinning = true;
									 				}
									 			}
									 			if(isWinning === true){
									 				game.winner = user.userId;
									 				break;
									 			}
					 						}//END CHECK Columns
				 						}
				 						if(isWinning === false){
				 							k = game.boardLength-1;
				 							j = 0;
				 							//Check Left Diagonal
					 						for(i = 0; i < game.boardLength; i++){
									 			if(game.currentBoard.tilesSelected[i][j] !== true){
									 				isWinning = false;
									 				break;
									 			}
									 			j++;
					 						}//END CHECK Left DIAGONAL //Start check Right Diagonal
					 						for(i = 0; i < game.boardLength; i++){
									 			if(game.currentBoard.tilesSelected[k][i] !== true){
									 				isWinning = false;
									 				break;
									 			}
									 			k--;

					 						}//END CHECK Right DIAGONAL
					 						if(isWinning === true){
								 				game.winner = user.userId;
								 			}
				 						}
					 					game.save(function(err){
											if (err) {
												console.log('Error saving game to database.');
												return res.status(500).send({
													message: errorHandler.getErrorMessage(err)
												});
											} 
											else {

													boardDoc.save(function(err){
														if (err) {
															console.log('Error saving game to database.');
															return res.status(500).send({
																message: errorHandler.getErrorMessage(err)
															});
														} 
														else {
															// RETURN GAME STATE
														}
													});//Board SAVE END
											}
										});//GAME SAVE END
								 	}// Find Game Else
								});
				 			}

				 		}

				 	}
				 	else{	//TODO get game state
				 		//CHANGE THIS!!!! THERE IS A WINNER ALREADY
				 		res.json({gameID: req.params.gameID});
				 	}
			 	}
			});
	 	}
	});
};
