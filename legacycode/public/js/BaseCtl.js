/**
 * Initialzes $scope with common object and methods for a controller.
 * It initializes form, list and searchFrom object for single record and list display.
 * It initializes display(), submit(), serach() and delete() method for a view page
 * It initializes next() and previous() methods for pagination.
 * 
 * @param {*} scope 
 * @param {*} usecase: it is used to make server endpoint 
 * @param {*} ServiceLocator : Locate service for controller 
 * @param {*} singlePage : truw indicate it is single page does not contain list
 */
function initScope(scope, usecase, ServiceLocator, singlePage) {

    //Contains list which is dipslayed at view
    scope.list = "";

    //contains form data of view
    scope.form = {};

    //Reset form data
    scope.resetForm = function () {
        scope.form = {
            success: true,
            show: false,
            message: ''
        };
    }

    //Contains search elements on which list is filtered.
    scope.searchForm = {};

    //Reset list form
    scope.resetSearchForm = function () {
        scope.searchForm = {
            pageNo: 0,
            success: true,
            show: false,
            message: ''
        };
    }

    //Pagination - go to next page
    scope.next = function () {
        scope.searchForm.pageNo++;
        scope.search();
    }

    //Pagination - go to previous page
    scope.previous = function () {
        if (scope.searchForm.pageNo > 0) {
            scope.searchForm.pageNo--;
        }
        scope.search();
    }

    //reset forms
    scope.resetForm();
    scope.resetSearchForm();


    //Display and Submit list form
    scope.search = function () {

        console.log("Base search");

        scope.searchForm.show = false;
        scope.searchForm.success = true;
        scope.searchForm.message = '';

        ServiceLocator.http.post(usecase + `/search`, scope.searchForm,
            function (response) {
                if (response.success) {
                    scope.list = response.result.list;
                    if ((scope.list && scope.list.length == 0)) {
                        scope.searchForm.message = "No record found";
                        scope.searchForm.show = true;
                    }
                } else {
                    scope.searchForm.message = response.result;
                    scope.searchForm.show = true;
                }
            });
    }


    // Display edit page
    scope.display = function (id) {

        console.log("Base display");
        scope.resetForm();
        //if id is greater than 0 then fetch record and display
        if (id && id > 0) {
            ServiceLocator.http.get(usecase + `/get/` + id,
                null, function (response) {
                    scope.form.success = response.success;
                    if (response.success) {
                        scope.form = response.result;
                    }
                });
        }
    };

    // Submit Form to server
    scope.submit = function () {
        console.log("Base submit");
        scope.form.success = true;
        scope.form.show = false;
        scope.form.message = '';

        ServiceLocator.http.post(usecase + `/save`, scope.form,
            function (response) {
                scope.form.success = response.success;
                scope.form.show = true;
                if (response.success) {
                    scope.form.id = response.result;
                    scope.form.message = "Record has been saved";
                    if (!singlePage) { //if list page then refresh list
                        scope.search();
                    }
                } else {
                    scope.form.message = response.result;
                }
            });
    }

    /**
     * Delete a record
     * @param {*} id 
     */
    scope.delete = function (id) {
        console.log('Base Delete');
        ServiceLocator.http.get(usecase + `/delete/` + id, null,
            function (response) {
                scope.show = response.success;
                if (response.success) {
                    scope.search();
                    scope.msg = "Record has been deleted";
                } else {
                    scope.msg = response.result;
                }
            })
    }

}//End initScope

var welcomeCtl = function ($scope, ServiceLocator) {
}

app.controller("welcomeCtl", welcomeCtl)









