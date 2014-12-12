'use strict';

var users = require('../../app/controllers/users.server.controller');
var game = require('../../app/controllers/game.server.controller');

module.exports = function(app) {
	app.route('/game/create').post(users.requiresLogin, game.create);
	app.route('/game/:gameID/join').post(users.requiresLogin, game.join);
	app.route('/game/:gameID/leave').post(users.requiresLogin, game.leave);
	app.route('/game/:gameID/state').get(users.requiresLogin, game.state);
	app.route('/game/:gameID/select').post(users.requiresLogin, game.select);
};
