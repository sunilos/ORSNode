/**
 * User Controller
 * @param {*} $scope 
 * @param {*} $localStorage 
 * @param {*} ServiceLocator 
 */
var myProfileCtl = function ($scope, ServiceLocator) {
    
	//initialize scope
    initScope($scope, 'User', ServiceLocator, true);

    $scope.preload = function () {
        ServiceLocator.http.get('User/preload', null, function (response) {
            $scope.roleList = response;
        })
    }

    $scope.display = function (id) {
        ServiceLocator.http.get('User/myProfile',
            null, function (response) {
                $scope.form.success = response.success;
                if (response.success) {
                    $scope.form = response.result;
                }
            });
    }

    $scope.display();
    $scope.preload();

}
app.controller("myProfileCtl", myProfileCtl);