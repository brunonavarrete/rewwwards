var module = angular.module('rewards', []);

module.directive('clients',function(){
	return {
		templateUrl: 'templates/list.html',
		controller: 'clientCtrl',
	}
});

module.service('clientService',function($http){
	this.get = function(url,callback){
		$http({ method: 'GET', url: url }).then(callback);
	};
});

module.controller('clientCtrl',function($scope,clientService){
	$scope.helloWorld = 'hello world';

	clientService.get('/clients/all',function(response){
		$scope.clients = response.data;
	});

});