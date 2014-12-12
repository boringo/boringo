'use strict';

// Setting up route
angular.module('home').config(['$stateProvider',
	function($stateProvider) {
		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/home/views/home.client.view.html'
		}).
		state('create', {
			url: '/home/create',
			templateUrl: 'modules/home/views/create.client.view.html'
		}).
		state('join', {
			url: '/home/join',
			templateUrl: 'modules/home/views/join.client.view.html'
		}).
		state('login', {
			url: '/home/login',
			templateUrl: 'modules/home/views/login.client.view.html'
		}).
		state('user_profile', {
			url: '/home/user_profile', 
			templateUrl: 'modules/home/views/profile.client.view.html'
		});
		// state('signup', {
		// 	url: '/home/signup',
		// 	templateUrl: 'modules/home/views/signup.client.view.html'
		// });
	}
]);