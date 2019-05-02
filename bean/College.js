var BaseBean = require('../bean/BaseBean');

class College extends BaseBean {

    constructor() {
        super();
        this.name = '';
        this.address = '';
        this.state = '';
        this.city = '';
        this.phoneNo = '';
    };

    /**
     * Set populateResult into bean.
     * @param {*} res 
     */
    populateResult(res) {
        this.id = res.ID;
        this.name = res.NAME;
        this.address = res.ADDRESS;
        this.state = res.STATE;
        this.city = res.CITY;
        this.phoneNo = res.PHONE_NO;
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
        if (body.name) {
            this.name = body.name;
        }
        if (body.address) {
            this.address = body.address;
        }
        if (body.state) {
            this.state = body.state;
        }
        if (body.city) {
            this.city = body.city;
        }
        if (body.phoneNo) {
            this.phoneNo = body.phoneNo;
        }
        if (body.size) {
            this.size = body.size;
        }
        if (body.pageNo) {
            this.pageNo = body.pageNo;
        }
    }
}

module.exports = College;