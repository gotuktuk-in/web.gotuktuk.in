/**
 * Created by apple on 04/10/16.
 */
angular
    .module('tuktukCamp')

    .run(function ($timeout, $rootScope) {

        $timeout(function () {
            $rootScope.isLoading = false;
        }, 3000);

    })

    .controller('tuktukController', tuktukController);

function tuktukController($scope, tuktukService, $timeout) {

    $scope.formData = {};
    $scope.showBody = false;
    $scope.showForm = true;
    $scope.showThanks = false;
    $scope.showMsg = false;
    $scope.showFinish = false;

    $scope.redeemOfferCode = function () {
        tuktukService.redeemOfferCode(
            {
                offerCode: $scope.formData.offerCode
            },
            function (response) {
                $scope.showFinish = false;
                $scope.showThanks = true;
                if(response && response.status==='opted'){
                  console.log('already opted');
                } else if(response && response.status==='failed'){
                  console.log('failed');
                }
                $scope.data = response;
            }, function (err) {

            });
    };

    $scope.reloadPage = function () {
        $scope.formData.tripID = '';
        $scope.showForm = true;
        $scope.showMsg = false;
        $scope.showFinish = false;
        $scope.showThanks = false;
    }
};
