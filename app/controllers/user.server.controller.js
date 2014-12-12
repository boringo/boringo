'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var errorHandler = require('./errors.server.controller');
var User = mongoose.model('User');

// Returns information about a user.
exports.info = function(req, res) {
	User.findById(req.session.userId, function(err,user){
	 	if(err){
	 		return res.status(500).send({
				message: errorHandler.getErrorMessage(err)
			});
	 	}
	 	else
	 	{
		 	User.findById(req.params.userID, function(err,neededUser){
			 	if(err){
			 		return res.status(500).send({
						message: errorHandler.getErrorMessage(err)
					});
			 	}
			 	else
			 	{
			 		var userData = {
			 			username: neededUser.username,
			 			wins: neededUser.totalWins,
			 			losses: neededUser.totalLosses
			 		};
			 		res.json(userData);
			 	}
			});
	 	}
	});
};
