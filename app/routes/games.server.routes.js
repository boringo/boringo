'use strict';

var games = require('../../app/controllers/games.server.controller');

module.exports = function(app) {

	app.route('/games/list')
		.get(games.list);

	app.route('/games/join')
		.post(games.join);
};
