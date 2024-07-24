var MongoService = require("../services/MongoServices");
var MarksheetBean = require("../bean/MarksheetBean");
MongoService = new MongoService();
BaseService = new BaseService();
class MarksheetService {
    add(marksheet, callback, ctx) {
        var params = {
            ROLL_NO: marksheet.rollNo, STUDENT_ID: marksheet.studentId, NAME: marksheet.name,
            PHYSICS: marksheet.physics, CHEMISTRY: marksheet.chemistry, MATHS: marksheet.maths
        }
        MongoService.executeAdd(params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }
    update(marksheet, callback, ctx) {
        var id = { _id: marksheet.id }
        var newValues = {
            $set: {
                ROLL_NO: marksheet.rollNo, STUDENT_ID: marksheet.studentId, NAME: marksheet.name,
                PHYSICS: marksheet.physics, CHEMISTRY: marksheet.chemistry, MATHS: marksheet.maths
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
    delete(id, callback) {
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
                    var bean = new MarksheetBean();
                    bean.populateResult(e);
                    list.push(bean);
                });
                callback(err, list);
            }
        });
    }
    findByPk(id, callback) {
        MongoService.executeFindByPk(id, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }
    search(marksheet, callback, ctx) {
        var size = marksheet.size;
        var pageNo = marksheet.pageNo;
        MongoService.executeSearch(pageNo, size, function (err, result) {
            if (err) {
                callback(err);
            } else {
                var list = [];
                result.forEach(function (e) {
                    var bean = new MarksheetBean();
                    bean.populateResult(e);
                    list.push(bean);
                });
                callback(err, list);
            }
        });
    }
    setCollection() {
        MongoService.getCollection("st_marksheet");
    }
}
marksheetService = new MarksheetService();
marksheetService.setCollection();
module.exports = MarksheetService;

