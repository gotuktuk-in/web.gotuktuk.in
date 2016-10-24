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

    $scope.campaign = function () {
        tuktukService.getCamp(
            {
                trip: $scope.formData.tripID
            },
            function (response) {
                $scope.data = response;
                $scope.getStatus();
            }, function (err) {
                $scope.errmsg = err.data.message;
                $timeout(function () {
                    $scope.errmsg = false;
                }, 5000);
            });
    };



    $scope.campaignFinish = function () {
        tuktukService.postCamp(
            {
                trip: $scope.formData.tripID
            },
            function (response) {
                $scope.showFinish = false;
                $scope.showThanks = true;
                $scope.data = response;
            }, function (err) {

            });
    };

    $scope.getStatus = function () {
        if ($scope.data.status == 'done') {
            console.log($scope.data.status);
            $scope.showForm = false;
            $scope.showMsg = true;
            $scope.showFinish = false;
        } else {
            $scope.showForm = false;
            $scope.showMsg = false;
            $scope.showFinish = true;
        }
    };
    $scope.reloadPage = function () {
        $scope.formData.tripID = '';
        $scope.showForm = true;
        $scope.showMsg = false;
        $scope.showFinish = false;
        $scope.showThanks = false;
    }
};