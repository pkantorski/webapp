hackathonApp.controller('ModalController',
    ['$scope', '$rootScope', '$uibModal', '$uibModalInstance', 'response',
        function($scope, $rootScope, $uibModal, $uibModalInstance, response) {
            $scope.response = response;

            $scope.ok = function() {
                $uibModalInstance.close();
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.close = function() {
                $uibModalInstance.close();
            };

            $rootScope.modalRedirect.result.then(function() {
            }, function() {});
        }
    ]);
hackathonApp.filter('unsafe', ['$sce', function($sce) { return $sce.trustAsHtml; }]);
