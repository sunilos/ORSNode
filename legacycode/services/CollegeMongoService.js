var MongoService = require("../services/MongoServices");
var CollegeBean = require("../bean/CollegeBean");
MongoService = new MongoService();
class CollegeService {
    add(college, callback, ctx) {
        var params = { NAME: college.name, ADDRESS: college.address, STATE: college.state, CITY: college.city, PHONE_NO: college.phoneNo }
        MongoService.executeAdd(params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }
    update(college, callback, ctx) {
        var id = { _id: college.id }
        var newValues = { $set: { NAME: college.name, ADDRESS: college.address, STATE: college.state, CITY: college.city, PHONE_NO: college.phoneNo } }
        console.log(mongo);
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
                    var bean = new CollegeBean();
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
    search(college, callback, ctx) {
        var size = college.size;
        var pageNo = college.pageNo;
        MongoService.executeSearch(pageNo, size, function (err, result) {
            if (err) {
                callback(err);
            } else {
                var list = [];
                result.forEach(function (e) {
                    var bean = new CollegeBean();
                    bean.populateResult(e);
                    list.push(bean);
                });
                callback(err, list);
            }
        });
    }
    setCollection() {
        MongoService.getCollection("st_college");
    }
}
collegeService = new CollegeService();
collegeService.setCollection();
module.exports = CollegeService;

