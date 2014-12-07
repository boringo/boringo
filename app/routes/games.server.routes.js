'use strict';

// Module dependencies.
var games = require('../../app/controllers/games.server.controller');

module.exports = function(app) {

	app.route('/games/list')
		.get(games.list);
};
