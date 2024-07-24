var MongoService = require("../services/MongoServices");
var RoleBean = require("../bean/RoleBean");
MongoService = new MongoService();
BaseService = new BaseService();
class RoleService {
    add(role, callback, ctx) {
        var params = { NAME: role.name, DESCRIPTION: role.description }
        MongoService.executeAdd(params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }
    update(role, callback, ctx) {
        var id = { _id: role.id }
        var newValues = { $set: { NAME: role.name, DESCRIPTION: role.description } }
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
                    var bean = new RoleBean();
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
    search(role, callback, ctx) {
        var size = role.size;
        var pageNo = role.pageNo;
        MongoService.executeSearch(pageNo, size, function (err, result) {
            if (err) {
                callback(err);
            } else {
                var list = [];
                result.forEach(function (e) {
                    var bean = new RoleBean();
                    bean.populateResult(e);
                    list.push(bean);
                });
                callback(err, list);
            }
        });
    }
    setCollection() {
        MongoService.getCollection("st_role");
    }
}
roleService = new RoleService();
roleService.setCollection();

module.exports = RoleService;

