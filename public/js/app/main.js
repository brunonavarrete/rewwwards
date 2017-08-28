'use strict';

var module = angular.module('rewards', []);

// services
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

// controllers
	module.controller('clientCtrl',['$scope', 'dataService', function($scope,dataService){

		$scope.helloWorld = 'hello world';

		dataService.get('/clients/all', function(res){
			$scope.clients = res.data;
		});

		$scope.getClient = function(id){
			dataService.get('/clients/'+id, function(res){
				$scope.currentClient = res.data;
				$scope.getCards(id);
			});
		}

		$scope.getCards = function(clientId){
			dataService.get('/cards/client/'+clientId, function(res){
				if( res.data.length > 0 ){
					$scope.clientCards = res.data;
					$scope.lastCard = res.data[res.data.length -1];
					if( !$scope.lastCard.visits.length || $scope.lastCard.visits.length < 10 ) {
						$scope.allowNewCard = false;
					} else {
						$scope.allowNewCard = true;
					}
				} else {
					$scope.allowNewCard = true;
				}
			});


			// 	var last_visit = $scope.clientCards[0].visits[ $scope.clientCards[0].visits.length - 1 ];
			// 	var today = new Date();
			// 	var last_time = new Date(last_visit.createdAt);
			// 	var timeDiff = Math.abs(last_time.getTime() - today.getTime());
			// 	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));


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
			$scope.currentClient = undefined;
			$scope.clientCards = undefined;
			dataService.get('/clients/all', function(res){
				$scope.clients = res.data;
			});
		}

		$scope.addCard = function(clientId){
			dataService.post('/cards',{ client: clientId }, function(res){
				$scope.getClient(clientId);
				$scope.allowNewCard = false;
			})
		}

		$scope.addVisit = function(clientId,cardId){
			if( $scope.clientCards[0].visits.length > 0 ){
				var last_visit = $scope.clientCards[0].visits[ $scope.clientCards[0].visits.length - 1 ];
				var today = new Date();
				var last_time = new Date(last_visit.createdAt);
				var timeDiff = Math.abs(last_time.getTime() - today.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

				if(diffDays > 1){ // if last visit was yesterday
					dataService.post('/visits',{ card: cardId }, function(res){
						dataService.put('/cards/'+cardId+'/visit/'+res.data.visit._id,res.visit, function(res){
							$scope.getClient(clientId);
							alert('new visit!');
						});
					})
				} else {
					alert('already visited today ('+last_time+':00)');
				}
			} else {
				dataService.post('/visits',{ card: cardId }, function(res){
					dataService.put('/cards/'+cardId+'/visit/'+res.data.visit._id,res.visit, function(res){
						$scope.getClient(clientId);
						alert('new visit!');
					});
				})
			}
		}

	}]);

// directives
	module.directive('clientList', function(){
		return {
			templateUrl: 'templates/client-list.html',
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

	module.directive('cardList', function(){
		return {
			templateUrl: 'templates/card-list.html',
			controller: 'clientCtrl',
			replace: true
		}
	});