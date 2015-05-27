var con = angular.module('youtube-controller', []);

controllers.controller('youtube-controller', ['$scope', function($scope, youtubePlayer){

	$scope.width = 640;
	$scope.height = 360;

	$scope.add = '';
	$scope.showControls = 0;
	$scope.autoplay = 0;
	$scope.addvideo = function(){
		$scope.videos.push({ 
			id: $scope.add,
			showControls: $scope.showControls,
			autoplay: $scope.autoplay
		});
	}
}]);