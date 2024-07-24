/**
 * User Controller
 * @param {*} $scope 
 * @param {*} $localStorage 
 * @param {*} ServiceLocator 
 */
var userCtl = function ($scope, ServiceLocator) {

    //initialize scope
    initScope($scope, 'User', ServiceLocator);

    $scope.preload = function () {
        ServiceLocator.http.get('User/preload', null, function (response) {
            $scope.roleList = response;
        })
    }

    /**
     * Uploads User Picture 
     * 
     * @param {*} id 
     */
    $scope.uploadPic = function (id) {
        if (id && id > 0) {
            ServiceLocator.http.postMutipart('User/profilePic', $scope.files, { "id": id }, function (response) {
                console.log(response);
            })
        }
    }

    // Display page
    $scope.search();

    //Preload Data
    $scope.preload();

}
app.controller("userCtl", userCtl)



