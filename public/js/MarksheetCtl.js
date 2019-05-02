var marksheetCtl = function ($scope, ServiceLocator) {

    //initialize scope
    initScope($scope, 'Marksheet', ServiceLocator);

    $scope.preload = function () {
        ServiceLocator.http.get('Marksheet/preload', null, function (response) {
            $scope.studentList = response;
        })
    }

    // Display page
    $scope.search();

    //Preload Data
    $scope.preload();
}
app.controller("marksheetCtl", marksheetCtl)

