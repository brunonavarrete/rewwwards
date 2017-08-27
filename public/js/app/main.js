'use strict';

var module = angular.module('rewards', []);

module.service('dataService', function($http){
	this.get = function(url,callback){
		$http({ method: 'GET', url: url }).then(callback);
	};

	this.post = function(url,data,callback){
		$http({ method: 'POST', data, url: url }).then(callback);
	};

	this.put = function(url,data,callback){
		$http({ method: 'PUT', data, url: url }).then(callback);
	};

});

module.controller('clientCtrl',['$scope', 'dataService', function($scope,dataService){

	$scope.helloWorld = 'hello world';

	dataService.get('/clients/all', function(res){
		$scope.clients = res.data;
	});

	$scope.getClient = function(id){
		dataService.get('/clients/'+id, function(res){
			$scope.currentClient = res.data;
		});
		dataService.get('/cards/client/'+id, function(res){
			$scope.clientCards = res.data;
		});
	}

	$scope.update = function(client){
		dataService.put('/clients/'+client._id,client, function(res){
			$scope.currentClient = res.data.client;
			$scope.edit = false;
		});
	}

	$scope.add = function(client){
		dataService.post('/clients/',client, function(res){
			dataService.get('/clients/all', function(res){
				$scope.clients = res.data;
			});
			$scope.register = false;
		});
	}

	$scope.showAll = function(){
		$scope.currentClient = null;
		dataService.get('/clients/all', function(res){
			$scope.clients = res.data;
		});
	}

	$scope.addCard = function(clientId){
		dataService.post('/cards',{ client: clientId }, function(res){
			console.log(res);
		})
	}

}]);

// directives

	module.directive('list', function(){
		return {
			templateUrl: 'templates/list.html',
			controller: 'clientCtrl',
			replace: true
		}
	});

	module.directive('register', function(){
		return {
			templateUrl: 'templates/register-client.html',
			controller: 'clientCtrl',
			replace: true
		}
	});

	module.directive('edit', function(){
		return {
			templateUrl: 'templates/edit-client.html',
			controller: 'clientCtrl',
			replace: true
		}
	});