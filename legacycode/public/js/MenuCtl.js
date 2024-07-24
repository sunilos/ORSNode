var menuCtl = function ($scope, ServiceLocator) {

    $scope.menubar = [];
    $scope.name = '';

    $scope.$watch(function () {
        return ServiceLocator.config.menuRefresh;
    }, function (newVal, oldVal) {
        if (ServiceLocator.config.menuRefresh) {
            $scope.display();
            ServiceLocator.config.menuRefresh = false;
        }
    });

    $scope.$watch(function () {
        return ServiceLocator.ctx.name;
    }, function (newVal, oldVal) {
        $scope.name = ServiceLocator.ctx.name;
    });

    $scope.display = function () {

        ServiceLocator.http.get(`auth/menu`, $scope.form, function (response) {
            $scope.success = response.success;
            $scope.menubar = response.result;
            $scope.menubar = response.result;

            if ($scope.menubar && $scope.menubar.length > 1) {
                ServiceLocator.http.get('User/myProfile', null, function (response) {
                    if (response.success) {
                        $scope.name = response.result.firstName + ' ' + response.result.lastName;
                    }
                });
            }
        });
    }

    $scope.display();
}

app.controller("menuCtl", menuCtl)