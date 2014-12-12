'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var errorHandler = require('./errors.server.controller');
var User = mongoose.model('User');

// Returns information about a user.
exports.info = function(req, res) {
	// TODO
	res.json({userID: req.params.userID});
};
