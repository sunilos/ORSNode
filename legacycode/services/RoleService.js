var Role = require("../bean/Role");
var BaseService = require("./BaseService")

class RoleService extends BaseService {

    /**
     * Finds role by primary key id
     * 
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM st_role WHERE ID= ?";
        var params = [id];
        super.executeSQLForObject(sql, params, new Role(), callback);
    };

    /**
     * Search role by Name
     * 
     * @param {*} role 
     * @param {*} callback 
     */
    search(role, pageNo, callback, ctx) {
        var sql = "SELECT * FROM st_role where 1=1 ";

        if (role.name) {
            sql += " and NAME like '" + role.name + "%'";
        }

        if (role.description) {
            sql += " and DESCRIPTION like '" + role.description + "%'";
        }

        super.executeSQLForList(sql, { "pageNo": pageNo }, new Role(), callback);
    }
    /**
     * Adds a record and returns primary key
     * 
     * @param {*} role 
     * @param {*} callback 
     * @param {*} ctx 
     */

    add(role, callback, ctx) {
        var sql = "INSERT INTO st_role (CREATED_DATETIME,MODIFIED_DATETIME,NAME,DESCRIPTION) "
            + " VALUES (NOW(),NOW(),?,?)";
        var params = [role.name, role.description];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.insertId);
            }
        });
    };

    /**
     * Updates a record and returns count.
     * @param {*} role 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(role, callback, ctx) {
        var sql = "UPDATE st_role SET   MODIFIED_DATETIME = NOW(), NAME=?,DESCRIPTION=? WHERE ID=?"
        var params = [role.name, role.description, role.id];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.affectedRows);
            }
        });
    }

    /**
     * Deletes record and return role bean.
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    delete(id, callback, ctx) {
        super.delete(id, 'st_role', callback, ctx);
    }
}

module.exports = RoleService;

