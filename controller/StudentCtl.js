var BaseCtl = require("../controller/BaseCtl");
var Student = require("../bean/Student");
var ServiceLocator = require("../services/ServiceLocator");


/**
 * Contains Student REST APIs.
 */

class StudentCtl extends BaseCtl {
    constructor() {
        super();
        this.service = ServiceLocator.getStudentService();
    }

    /**
     * Returns preload data.
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {
        var clgService = ServiceLocator.getCollegeService();
        clgService.search('', null, function (err, result) {
            response.json(result.list)
        })
    };

    /**
     * Return bean of Sudent controller.
     * @param {*} request 
     */
    getBean(request) {
        var student = new Student();
        student.populateRequest(request.body);
        return student;
    };

    /**
     * return service of Role controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = StudentCtl;