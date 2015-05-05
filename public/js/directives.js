var app = angular.module('directives', []);

app.directive('thumb', function() {
	return {
		restrict: 'A',
		templateUrl: 'thumb.html'
  };
});

app.directive('inlineThumb', function() {
	return {
		restrict: 'A',
		templateUrl: 'inlinethumb.html'
  };
});