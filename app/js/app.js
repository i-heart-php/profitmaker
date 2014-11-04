// 'use strict';
// // Declare app level module which depends on filters, and services
// var app= angular.module('myApp', ['ngRoute']);
// app.config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'});
//   $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'homeCtrl'});
//   $routeProvider.otherwise({redirectTo: '/login'});
// }]);


// app.run(function($rootScope, $location, loginService){
// 	var routespermission=['/home'];  //route that require login
// 	$rootScope.$on('$routeChangeStart', function(){
// 		if( routespermission.indexOf($location.path()) !=-1)
// 		{
// 			var connected=loginService.islogged();
// 			connected.then(function(msg){
// 				if(!msg.data) $location.path('/login');
// 			});
// 		}
// 	});
// });

define(['routes','services/dependencies'], function(config, dependencyResolver)
{
    var app = angular.module('app', ['ngRoute']);

    app.config(
    [
        '$routeProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide)
        {
	        app.controller = $controllerProvider.register;
	        app.directive  = $compileProvider.directive;
	        app.filter     = $filterProvider.register;
	        app.factory    = $provide.factory;
	        app.service    = $provide.service;
            
            $locationProvider.html5Mode(false);

            if(config.routes !== undefined)
            {
                angular.forEach(config.routes, function(route, path)
                {
                    $routeProvider.when(path, {templateUrl:route.templateUrl, resolve:dependencyResolver(route.dependencies)});
                });
            }

            if(config.defaultRoutePaths !== undefined)
            {
                $routeProvider.otherwise({redirectTo:config.defaultRoutePaths});
            }
        }
    ]);
    
    app.run(['$location', '$rootScope', function($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.$$route.title;
            $rootScope.isActive = function(route) {
                return route === $location.path();
        }
        });
   }]);
   
   return app;
});