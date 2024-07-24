var roleCtl = function ($scope, ServiceLocator) {

    //initialize scope
    initScope($scope, 'Role', ServiceLocator);

    //Display list page
    $scope.search();

}
app.controller("roleCtl", roleCtl)

