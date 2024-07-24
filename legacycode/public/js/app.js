/**
 * Angular module 
 */
var app = angular.module("myApp", ["ngRoute", "720kb.datepicker"]);

/**
 * Define angular routes
 */
app.config(function ($routeProvider, $httpProvider) {

  $routeProvider
    .when("/", {
      templateUrl: "view/Welcome.html",
      controller: 'welcomeCtl'
    })
    .when("/college", {
      templateUrl: "view/College.html",
      controller: 'collegeCtl'
    })
    .when("/student", {
      templateUrl: "view/Student.html",
      controller: 'studentCtl'
    })
    .when("/marksheet", {
      templateUrl: "view/Marksheet.html",
      controller: 'marksheetCtl'
    })
    .when("/role", {
      templateUrl: "view/Role.html",
      controller: 'roleCtl'
    })
    .when("/user", {
      templateUrl: "view/User.html",
      controller: 'userCtl'
    })
    .when("/login", {
      templateUrl: "view/Login.html",
      controller: 'loginCtl'
    })
    .when("/forgotPassword", {
      templateUrl: "view/ForgotPassword.html",
      controller: 'forgotPasswordCtl'
    })
    .when("/changePassword", {
      templateUrl: "view/ChangePassword.html",
      controller: 'changePasswordCtl'
    })
    .when("/profile", {
      templateUrl: "view/MyProfile.html",
      controller: 'myProfileCtl'
    }).otherwise({
      template: "<h1>Invalid URL...</h1>"
    });
});


/**
 * File upload directive 
 * 
 * Following input tag will store file content in $scope.files.pic attribute.
 * <input class="form-control" type="file" file-model="files.pic">
 * 
 */
app.directive('fileModel', function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;
      element.bind('change', function () {
        scope.$apply(function () {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
});

/**
 * Error handler service will display alert when an http call error is occured.
 */
app.service('ErrorService', function ($location, $window) {
  this.handle = function (res) {
    this.code = res.status;
    this.message = res.statusText;
    console.log('Fail', this.code, this.message);
    if (this.code == 403) {
      $window.alert('OOPS Your session has been expired!');
      $location.path("login")
    } else {
      $window.alert(this.code + ':' + this.message);
    }
  };
});

// Service

/**
 * Provides methods for submitting get, post and multipart from requests.
 * If any error response is received then it calls to ErrorService to handle the error.
 * Internally it calls $http service. 
 */
app.service('httpCallService', function ($http, $location, ErrorService) {

  var self = this;

	/**
	 * Makes HTTP Get request
	 * 
	 * @url: server end point
	 * @form: HTML form object
	 * @callback: response callback method
	 */
  self.get = function (url, form, callback) {

    if (form) {
      var params = "?";
      var flag = false;

      //Form elements are in query string
      angular.forEach(form, function (value, key) {
        params += key + "=" + value + ";"
        flag = true;
      });

      //Add query string to url
      if (flag) {
        url += params;
      }
    }

    //call endpoint
    var promise = $http.get(url);
    promise.then(function (serverResponse) {
      callback(serverResponse.data);
    }, function (serverResponse) {
      ErrorService.handle(serverResponse);
    });
  }

	/**
	 * Makes Post request
	 * 
	 * @url: server end point
	 * @form: HTML form elements JSON object that will go in request body
	 * @callback: response callback method
	 */
  self.post = function (url, form, callback) {
    $http.post(url, form).then(
      function (serverResponse) {
        callback(serverResponse.data);
      },
      function (serverResponse) {
        ErrorService.handle(serverResponse);
      });
  }

  /**
   * Makes POST request to other servers
   */
  self.postToOtherServer = function (url, folder, form, callback) {
    var config = {
      // withCredentials : false,
      // transformRequest : angular.identity,
      headers: {
        'Content-Type': undefined
      }
    };
  }

	/**
	 * Makes Post request and submit multipart form
	 * 
	 * @url: server end point
	 * @folder: containing files to be attached
	 * @form: html form elements will go as mutipart form elements
	 * @ctlResponse: response callback method
	 */
  self.postMutipart = function (url, folder, form, callback) {

    console.log('folder multipart app.js', folder);

    //create multipart form object
    var fd = new FormData();

    // Append form elements
    angular.forEach(form, function (value, key) {
      fd.append(key, value);
      console.log('1', key);
    });

    // Append files
    angular.forEach(folder, function (value, key) {
      fd.append(key, value);
      console.log('2', key);
    });

    var config = {
      headers: {
        'Content-Type': undefined
      }
    };

    var promise = $http.post(url, fd, config);

    promise.then(function (serverResponse) {
      callback(serverResponse.data);
    }, function (serverResponse) {
      ErrorService.handle(serverResponse);
    });
  };
});


/**
 * ServiceLocator locates angular services of application.
 * 
 * ServiceLocator is injected to all controllers of application. 
 * A controller will not create instance of any service rather 
 * controller will use ServiceLocator to locate a service.
 */
app.service('ServiceLocator', function (httpCallService, $location,
  ErrorService) {

  //Confguration parameters of application  
  this.config = {
    menuRefresh: false // if true then menu is reloded by app
  };

  this.ctx = {
    name: null, //Name of logged in User
    role: null // Role of logged in User
  };

  this.http = httpCallService;
  this.location = $location;
  this.error = ErrorService;

});

