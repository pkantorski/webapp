hackathonApp.controller('HeaderController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.cities = [];
    $scope.parameters = [];
    $rootScope.marker = [];
    $rootScope.markerDetail = [];
    $scope.search = {};
    $scope.showInfo = false;
    $rootScope.parametersList = [{ param1: "oferty pracy" }, { param2: "interpolacje" }, { param3: "zarządzenia prezydenta" }, { param4: "zarządzenia rady miasta" }, { param5: "przetargi" }];

    $http.get('/cities').then(function(success) {
        $scope.cities = success.data.cities;
        $scope.parameters = success.data.parameters;
    });

    $scope.showResult = function() {
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
                city: $scope.search.city,
                parameter: searchList
            };
            $http.get('/markers', searchData).then(function(success) {
                $rootScope.marker = success.data;
                console.log($rootScope.marker);
                $rootScope.markerDetail = success.data;
            }, function(e) {
                console.log(e);
            });

            if ($rootScope.markerDetail) {
                $rootScope.hideFilters = true;
                $rootScope.rightBar = true;
                $rootScope.mapZoom = 11;
            }
        } else {
            $scope.showInfo = true;
        }
    };
}]);