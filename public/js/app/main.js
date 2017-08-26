'use strict';

var module = angular.module('rewards', []);

module.service('clientService',function($http){
	this.get = function(url,callback){
		$http({ method: 'GET', url: url }).then(callback);
	};

	this.put = function(url,data,callback){
		$http({ method: 'PUT', data, url: url }).then(callback);
	};

});

module.controller('clientCtrl',['$scope', 'clientService', function($scope,clientService){

	$scope.helloWorld = 'hello world';

	clientService.get('/clients/all',function(res){
		$scope.clients = res.data;
	});

	$scope.getClient = function(id){
		clientService.get('/clients/'+id,function(res){
			$scope.currentClient = res.data;
		});
	}

	$scope.update = function(client){
		clientService.put('/clients/'+client._id,client,function(res){
			$scope.currentClient = res.data.client;
			$scope.edit = false;
		});
	}

	$scope.showAll = function(){
		$scope.currentClient = null;
		clientService.get('/clients/all',function(res){
			$scope.clients = res.data;
		});
	}

}]);

// directives

	module.directive('list',function(){
		return {
			templateUrl: 'templates/list.html',
			controller: 'clientCtrl',
			replace:true
		}
	});

	module.directive('register',function(){
		return {
			templateUrl: 'templates/registerClient.html',
			controller: 'clientCtrl',
			replace:true
		}
	});