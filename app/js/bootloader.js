require.config({
    baseUrl: '/js',
    paths: {
		'angular': '/js/angular.min',
		'angular-route': '/js/angular-route.min',
		'bootstrap': '/js/bootstrap.min',
		'jquery': '/js/jquery.min'
    },
	shim: {
		'app': {
			deps: ['angular', 'angular-route', 'bootstrap']
		},
		'angular-route': {
			deps: ['angular']
		},
		'bootstrap': {
			deps: ['jquery']
		}
	}
});

require
(
    [
        'app'
    ],
    function(app)
    {
        angular.bootstrap(document, ['app']);
    }
);