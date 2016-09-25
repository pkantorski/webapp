hackathonApp.controller('HeaderController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.cities = [];
    $scope.parameters = [];
    $rootScope.marker = [];
    $rootScope.markerDetail = [];
    $scope.search = {};
    $scope.showInfo = false;
    $rootScope.parametersList = [{ param1: "oferty pracy" }, { param2: "interpelacje" }];

    $http.get('/cities').then(function(success) {
        $scope.cities = success.data;
        $scope.parameters = success.data.parameters;
    });

    $scope.showResult = function() {
        $scope.search.city = JSON.parse($scope.search.city);
        $rootScope.actualCoords = [$scope.search.city.lat, $scope.search.city.long];
        if ($scope.search.city) {
            $scope.showInfo = false;
            var searchList = [];
            angular.forEach($scope.search, function(value, key) {
                if (key !== 'city') {
                    var number = key.split('param');
                    var param = $rootScope.parametersList[number[1]-1];
                    searchList.push(param);
                }
            });
            var searchData = {
                city: $scope.search.city.city,
                parameter: searchList
            };
            $http.get('/markers', searchData).then(function(success) {
                $rootScope.marker = success.data;
                $rootScope.markerDetail = success.data;
            }, function(e) {
                console.log(e);
            });

            if ($rootScope.markerDetail) {
                $rootScope.hideFilters = true;
                $rootScope.rightBar = true;
                $rootScope.mapZoom = 12;
            }
        } else {
            $scope.showInfo = true;
        }
    };
}]);