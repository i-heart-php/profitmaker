define(['app'], function(app) {


	app.controller('loginCtrl', ['$scope','loginService', function ($scope,loginService) {
		$scope.msgtxt='';
		$scope.login=function(data){
			loginService.login(data,$scope); //call login service
		};
	}]);


	
});