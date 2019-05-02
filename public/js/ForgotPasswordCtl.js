/**
 * Forgot Password Controller
 * @param {*} $scope 
 * @param {*} ServiceLocator 
 */
var forgotPassword = function ($scope, ServiceLocator) {

    //initialize  scope
    initScope($scope, 'User', ServiceLocator, true);

    $scope.submit = function () {
        ServiceLocator.http.post(`auth/forgotPassword`, $scope.form, function (response) {
            $scope.form.show = true;
            $scope.form.success = response.success;
            $scope.form.message = response.result;
        });
    }

    $scope.display = function () {
        $scope.resetForm();
    }

    $scope.display();

}
app.controller("forgotPasswordCtl", forgotPassword);