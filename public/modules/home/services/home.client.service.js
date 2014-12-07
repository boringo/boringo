'use strict';

//Home service used for communicating with the articles REST endpoints
angular.module('home').factory('Home', ['$resource',
	function($resource) {
		return ; //$resource('home/:articleId', {
		// 	articleId: '@_id'
		// }, {
		// 	update: {
		// 		method: 'PUT'
		// 	}
		// });
	}
]);