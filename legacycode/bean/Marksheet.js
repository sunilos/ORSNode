var BaseBean = require('../bean/BaseBean');

class Marksheet extends BaseBean {
    constructor() {
        super();
        this.rollNo = '';
        this.studentId = 0;
        this.name = '';
        this.physics = 0;
        this.chemistry = 0;
        this.maths = 0;
    };

    /**
       * Set populateResult into bean.
       * @param {*} res 
       */
    populateResult(res) {
        this.id = res.ID;
        this.rollNo = res.ROLL_NO;
        this.studentId = res.STUDENT_ID;
        this.name = res.NAME;
        this.physics = res.PHYSICS;
        this.chemistry = res.CHEMISTRY;
        this.maths = res.MATHS;
        this.createdBy = res.CREATED_BY;
        this.modifiedBy = res.MODIFIED_BY;
        this.createdDateTime = res.CREATED_DATETIME;
        this.modifiedDateTime = res.MODIFIED_DATETIME;
    }
    
    /**
       * Get request data from body.
       * @param {*} body 
       */
    populateRequest(body) {
        if (body.id) {
            this.id = body.id;
        }
        if (body.rollNo) {
            this.rollNo = body.rollNo;
        }
        if (body.studentId) {
            this.studentId = body.studentId;
        }
        if (body.name) {
            this.name = body.name;
        }
        if (body.physics) {
            this.physics = body.physics;
        }
        if (body.chemistry) {
            this.chemistry = body.chemistry;
        }
        if (body.maths) {
            this.maths = body.maths;
        }
        if (body.size) {
            this.size = body.size;
        }
        if (body.pageNo) {
            this.pageNo = body.pageNo;
        }
    };
}

module.exports = Marksheet;