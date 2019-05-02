var BaseCtl = require("../controller/BaseCtl");
var Marksheet = require("../bean/Marksheet");
var ServiceLocator = require("../services/ServiceLocator");

/**
 * Contains Marksheet REST APIs
 */

class MarksheetCtl extends BaseCtl {
    constructor() {
        super();
        this.service = ServiceLocator.getMarksheetService();
    }

    /**
     * Returns preload data. 
     * 
     * @param {*} request
     * @param {*} response
     */
    preload(request, response) {
        console.log('Marksheet preload');
        var stdService = ServiceLocator.getStudentService();
        stdService.search('', null, function (err, result) {
            response.json(result.list)
        })
    };

    /**     
     * Returns Marksheet bean populated from request parameters.
     */
    getBean(request) {
        var marksheet = new Marksheet();
        marksheet.populateRequest(request.body);
        return marksheet;
    };

    /**
     * Returns service of this controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = MarksheetCtl;
