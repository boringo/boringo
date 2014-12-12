'use strict';

var users = require('../../app/controllers/users.server.controller');
var user = require('../../app/controllers/user.server.controller');

module.exports = function(app) {
	app.route('/user/:userID/info').get(users.requiresLogin, user.info);
};
