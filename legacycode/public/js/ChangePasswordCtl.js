/**
 * User Controller
 * @param {*} $scope 
 * @param {*} $localStorage 
 * @param {*} ServiceLocator 
 */
var changePasswordCtl = function ($scope, ServiceLocator) {

    //initialize scope
    initScope($scope, 'User', ServiceLocator, true);

    $scope.confirmPassword = function () {

        if ($scope.form.password != $scope.form.confirmPassword) {
            $scope.form.success = false;
            $scope.form.show = true;
            $scope.form.message = 'Password does not match with confirm password';
        } else {
            $scope.form.success = true;
            $scope.form.show = false;
            $scope.form.message = '';
        }
    }

    // Submit Form to server
    $scope.submit = function () {

        $scope.form.success = true;
        $scope.form.show = false;
        $scope.form.message = '';

        ServiceLocator.http.post(`User/changePassword`, $scope.form,
            function (response) {
                $scope.form.success = response.success;
                $scope.form.show = true;
                if (response.success) {
                    $scope.form.message = "Password is changed";
                } else {
                    $scope.form.message = response.result;
                }
            });
    }
}
app.controller("changePasswordCtl", changePasswordCtl)



