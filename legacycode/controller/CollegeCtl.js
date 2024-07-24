var BaseCtl = require("../controller/BaseCtl");
var College = require("../bean/College");
var ServiceLocator = require("../services/ServiceLocator");

/**
 * Contains College REST APIs
 */
class CollegeCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getCollegeService();
    }
    /**
     * Returns preload data.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {
        var state = [{ name: 'Maharstra', code: 'MH' },
        { name: 'Madhya Pradesh', code: 'MP' },
        { name: 'Delhi', code: 'DL' }]
        var city = [{ name: 'Indore', code: 'IND', state: 'MP' },
        { name: 'Bhopal', code: 'BHO', state: 'MP' },
        { name: 'Mumbai', code: 'BOM', state: 'MH' },
        { name: 'Pune', code: 'PNQ', state: 'MH' },
        { name: 'Delhi', code: 'DEL', state: 'DL' }]

        var data = {
            "stateList": state,
            "cityList": city
        };
        response.status(200).json(data)
    };

    /**
     * Returns College bean populated from request parameters. 
     */
    getBean(request) {
        var college = new College();
        college.populateRequest(request.body);
        return college;
    };

    /**
     * Returns service of this controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = CollegeCtl;
