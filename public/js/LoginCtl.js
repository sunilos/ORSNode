var loginCtl = function ($scope, ServiceLocator) {

    initScope($scope, 'User', ServiceLocator,true);

    //Submit login form
    $scope.submit = function () {
        console.log($scope.form);
        ServiceLocator.http.post(`auth/login`, $scope.form,
            function (response) {
                if (response.success) {
                    ServiceLocator.config.menuRefresh = true;
                    var name = response.result.firstName + " " + response.result.lastName;
                    ServiceLocator.ctx.name = name;
                    ServiceLocator.location.path("/");
                } else {
                    ServiceLocator.ctx.name = null;
                    $scope.form.message = response.result;
                    $scope.success = response.success;
                }
            });
    }

    $scope.display = function () {
        //destroy old session
        ServiceLocator.http.post(`auth/logout`, $scope.form,
            function (response) {
                ServiceLocator.ctx.name = null;
                ServiceLocator.config.menuRefresh = true;
            });
    }

    $scope.display();

}
app.controller("loginCtl", loginCtl)

