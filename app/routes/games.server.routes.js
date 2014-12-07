'use strict';

var users = require('../../app/controllers/users.server.controller');
var games = require('../../app/controllers/games.server.controller');

module.exports = function(app) {

	app.route('/games/create')
		.post(users.requiresLogin, games.create);

	app.route('/games/list')
		.get(users.requiresLogin, games.list);

	app.route('/games/join')
		.post(users.requiresLogin, games.join);
};
