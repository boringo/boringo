'use strict';

//Game service used for communicating with the Game REST endpoints
angular.module('game').factory('Game', ['$resource',
	function($resource) {
		return $resource('game/:gameId', {
			gameId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);