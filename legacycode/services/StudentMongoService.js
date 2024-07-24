var MongoService = require("../services/MongoServices");
var StudentBean = require("../bean/StudentBean");
MongoService = new MongoService();
BaseService = new BaseService();
class StudentService {
    add(student, callback, ctx) {
        var params = {
            COLLEGE_ID: student.collegeId, COLLEGE_NAME: student.collegeName, FIRST_NAME: student.firstName, LAST_NAME: student.lastName,
            DATE_OF_BIRTH: student.dob, MOBILE_NO: student.mobileNo, EMAIL: student.email
        }
        MongoService.executeAdd(params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }
    update(student, callback, ctx) {
        var id = { _id: student.id }
        var newValues = {
            $set: {
                COLLEGE_ID: student.collegeId, COLLEGE_NAME: student.collegeName, FIRST_NAME: student.firstName, LAST_NAME: student.lastName,
                DATE_OF_BIRTH: student.dob, MOBILE_NO: student.mobileNo, EMAIL: student.email
            }
        }
        MongoService.executeUpdate(id, newValues, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }
    delete(id, callback, ctx) {
        MongoService.executeDelete(id, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }
    find(callback, ctx) {
        MongoService.executeFind(function (err, result) {
            if (err) {
                callback(err);
            } else {
                var list = [];
                result.forEach(function (e) {
                    var bean = new StudentBean();
                    bean.populateResult(e);
                    list.push(bean);
                });
                callback(err, list);
            }
        });
    }
    findByPk(id, callback, ctx) {
        MongoService.executeFindByPk(id, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }
    search(student, callback, ctx) {
        var size = student.size;
        var pageNo = student.pageNo;
        MongoService.executeSearch(pageNo, size, function (err, result) {
            if (err) {
                callback(err);
            } else {
                var list = [];
                result.forEach(function (e) {
                    var bean = new StudentBean();
                    bean.populateResult(e);
                    list.push(bean);
                });
                callback(err, list);
            }
        });
    }
    setCollection() {
        MongoService.getCollection("student");
    }
}
studentService = new StudentService();
studentService.setCollection();
module.exports = StudentService;

