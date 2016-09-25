hackathonApp.controller('MainController', ['$scope', '$rootScope', '$', 'NgMap', '$http', '$uibModal',
    function($scope, $rootScope, $, NgMap, $http, $uibModal) {

    if ('geolocation' in navigator) {
        $rootScope.geolocation = true;
        navigator.geolocation.getCurrentPosition(function(position) {
            $scope.actualCoords = [position.coords.latitude, position.coords.longitude];
        }, function(err) {
            console.log(err);
            $scope.actualCoords = [52.4064,16.9252];
        });
    } else {
        $rootScope.geolocation = false;
    }

    $rootScope.mapZoom = 11;
    $rootScope.rightBar = false;
    $scope.showBackButton = false;

    NgMap.getMap().then(function(map) {
        map.getCenter();
    });

    $scope.showDescription = function(k, v) {
        $rootScope.markerDetail = [$rootScope.marker[v]];
        if ($rootScope.markerDetail) {
            $scope.actualCoords = [$rootScope.markerDetail[0].positions[0], $rootScope.markerDetail[0].positions[1]];
            $rootScope.mapZoom = 14;
            $rootScope.rightBar = true;
            $scope.showBackButton = true;
        }
    };

    $scope.showDescriptionFromList = function(k, v) {
        if ($rootScope.markerDetail.length > 1) {
            $rootScope.markerDetail = [$rootScope.marker[v]];
            if ($rootScope.markerDetail) {
                $scope.actualCoords = [$rootScope.markerDetail[0].positions[0], $rootScope.markerDetail[0].positions[1]];
                $rootScope.mapZoom = 14;
                $rootScope.rightBar = true;
                $scope.showBackButton = true;
            }
        }
    };

    $scope.showAllMarker = function() {
        $scope.showBackButton = false;
        $rootScope.mapZoom = 11;
        $rootScope.markerDetail = $rootScope.marker;
        if ($rootScope.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.actualCoords = [position.coords.latitude, position.coords.longitude];
            }, function(err) {
                console.log(err);
                $scope.actualCoords = [52.4064,16.9252];
            });
        }
    };

    $scope.showModal = function() {
        $rootScope.modalRedirect = $uibModal.open({
            templateUrl: 'modal',
            controller: 'ModalController',
            size: 'lg modal',
            resolve: {
                response: function() {
                    return false;
                }
            }
        });
    };


    $(window).on("load",function(){
        $(".right-bar").mCustomScrollbar();
    });
}]);
