var MongoService = require("../services/MongoServices");
var UserBean = require("../bean/UserBean");
MongoService = new MongoService();
BaseService = new BaseService();
class UserService {
    add(user, callback, ctx) {
        var params = {
            FIRST_NAME: user.firstName, LAST_NAME: user.lastName, LOGIN: user.login, PASSWORD: user.password, DOB: user.dob,
            MOBILE_NO: user.mobileNo, ROLE_ID: user.roleId, GENDER: user.gender
        }
        MongoService.executeAdd(params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }
    update(user, callback, ctx) {
        var id = { _id: user.id }
        var newValues = {
            $set: {
                FIRST_NAME: user.firstName, LAST_NAME: user.lastName, LOGIN: user.login, PASSWORD: user.password, DOB: user.dob,
                MOBILE_NO: user.mobileNo, ROLE_ID: user.roleId, GENDER: user.gender

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
                    var bean = new UserBean();
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
    search(user, callback, ctx) {
        var size = user.size;
        var pageNo = user.pageNo;
        MongoService.executeSearch(pageNo, size, function (err, result) {
            if (err) {
                callback(err);
            } else {
                var list = [];
                result.forEach(function (e) {
                    var bean = new UserBean();
                    bean.populateResult(e);
                    list.push(bean);
                });
                callback(err, list);
            }
        });
    }
    setCollection() {
        MongoService.getCollection("st_user");
    }
}
userService = new UserService();
userService.setCollection();

module.exports = UserService;

