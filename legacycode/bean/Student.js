var BaseBean = require('../bean/BaseBean');
var DataUtility = require("../utility/DataUtility");


class Student extends BaseBean {
    constructor() {
        super();
        this.collegeId = 0;
        this.collegeName = '';
        this.firstName = '';
        this.lastName = '';
        this.dob = '';
        this.mobileNo = '';
        this.email = '';
    }

    /**
       * Set populateResult into bean.
       * @param {*} res 
       */
    populateResult(res) {
        this.id = res.ID;
        this.collegeId = res.COLLEGE_ID;
        this.collegeName = res.COLLEGE_NAME;
        this.firstName = res.FIRST_NAME;
        this.lastName = res.LAST_NAME;
        this.dob =  DataUtility.formatDate(res.DOB);
        this.mobileNo = res.MOBILE_NO;
        this.email = res.EMAIL;
        this.createdBy = res.CREATED_BY;
        this.modifiedBy = res.MODIFIED_BY;
        this.createdDateTime = res.CREATED_DATETIME;
        this.modifiedDateTime = res.MODIFIED_DATETIME;
    };
    
    /**
       * Get request data from body.
       * @param {*} body 
       */
    populateRequest(body) {
        if (body.id) {
            this.id = body.id;
        }
        if (body.collegeId) {
            this.collegeId = body.collegeId;
        }
        if (body.collegeName) {
            this.collegeName = body.collegeName;
        }
        if (body.firstName) {
            this.firstName = body.firstName;
        }
        if (body.lastName) {
            this.lastName = body.lastName;
        }
        if (body.dob) {
            this.dob = body.dob;
        }
        if (body.mobileNo) {
            this.mobileNo = body.mobileNo;
        }
        if (body.email) {
            this.email = body.email;
        }
        if (body.size) {
            this.size = body.size;
        }
        if (body.pageNo) {
            this.pageNo = body.pageNo;
        }
    };
}
module.exports = Student;