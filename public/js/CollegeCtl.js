var collegeCtl = function ($scope, ServiceLocator) {

    //initialize scope
    initScope($scope,'College',ServiceLocator);

    $scope.preload = function () {
        ServiceLocator.http.get('College/preload', null,
            function (response) {
                $scope.stateList = response.stateList;
                $scope.cityList = response.cityList;
            })
    }

    //Display list page
    $scope.search();
    // preload call
    $scope.preload();
}
app.controller("collegeCtl", collegeCtl)
