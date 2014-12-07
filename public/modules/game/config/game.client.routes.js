'use strict';

// Setting up route
angular.module('game').config(['$stateProvider',
	function($stateProvider) {
		// Game state routing
		$stateProvider.
		state('gameboard', {
			url: '/gameboard',
			templateUrl: 'modules/game/views/gameboard.client.view.html'
		}).
		state('gamewon', {
			url: '/gamewon',
			templateUrl: 'modules/game/views/gamewon.client.view.html'
		}).
		state('gamelost', {
			url: '/gamelost', 
			templateUrl: 'modules/game/views/gamelost.client.view.html'
		});
	}
]);