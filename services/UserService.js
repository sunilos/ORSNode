var User = require("../bean/User");
var BaseService = new require("./BaseService");
var RoleService = new require("./RoleService");
var EmailService = require('../utility/EmailService');
var MailMessage = require('../utility/MailMessage');
var EmailBuilder = require('../utility/EmailBuilder');

class UserService extends BaseService {

    /**
     * Get preload data 
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {
        var rService = ServiceLocator.getRoleService();
        rService.search('', null, function (err, result) {
            response.json(result.list)
        })
    };

    /**
     *Find user by primary key id and return User Object.
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM st_user WHERE ID= ?";
        var params = [id];
        super.executeSQLForObject(sql, params, new User(), function (err, bean) {
            callback(err, bean);
        });
    };

    /**
     * Find user by login id
     * @param {*} login 
     * @param {*} callback 
     * @param {*} ctx 
     */
    findByLogin(login, callback, ctx) {
        var sql = "SELECT * FROM st_user WHERE LOGIN = ?";
        var params = [login];
        super.executeSQLForObject(sql, params, new User(), function (err, bean) {
            callback(err, bean);
        });
    };


    /**
     * Authenticate login and password and return result.
     * @param {*} user 
     * @param {*} callback 
     * @param {*} ctx 
     */
    authenticate(user, callback, ctx) {
        var sql = "SELECT * FROM st_user WHERE LOGIN=? and PASSWORD=?";
        var params = [user.login, user.password];
        super.executeSQLForObject(sql, params, new User(), function (err, bean) {
            if (err) {
                callback("Invalid ID/Password");
            } else {
                callback(err, bean);
            }
        });
    };

    /**
     * Search user by FirstName,LastName,Login,MobileNo,DOB
     * Returns User bean
     * @param {*} user 
     * @param {*} callback 
     */
    search(user, pageNo, callback) {
        var sql = "SELECT * FROM st_user where 1=1 ";

        if (user.firstName) {
            sql += " and FIRST_NAME = '" + user.firstName + "'";
        }
        if (user.lastName) {
            sql += " and LAST_NAME = '" + user.lastName + "'";
        }
        if (user.login) {
            sql += " and LOGIN = '" + user.login + "'";
        }
        if (user.mobileNo) {
            sql += " and MOBILE_NO = '" + user.mobileNo + "'";
        }
        if (user.dob) {
            sql += " and DOB = '" + user.dob + "'";
        }
        super.executeSQLForList(sql, { "pageNo": pageNo }, new User(), function (err, list) {
            callback(err, list);
        });
    }

    /**
     * Add a record and returns primary key.
     * @param {*} user 
     * @param {*} callback 
     * @param {*} ctx 
     */
    add(user, callback, ctx) {

        var sql = "INSERT INTO st_user (CREATED_DATETIME,MODIFIED_DATETIME,FIRST_NAME,LAST_NAME,LOGIN,PASSWORD,DOB,MOBILE_NO,ROLE_ID,GENDER) "
            + " VALUES (NOW(),NOW(),?,?,?,?,?,?,?,?,?)";
        var params = [user.firstName, user.lastName, user.login,
        user.password, user.dob, user.mobileNo, user.roleId, user.gender];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                var pk = result.insertId;
                var roleService = new RoleService();
                roleService.findByPk(user.roleId, function (rerr, role) {
                    if (!rerr) {
                        var upateSql = "UPDATE st_user SET role_name = '" + role.name + "' WHERE ID = " + pk;
                        roleService.executeSQL(upateSql, null, function (rerr, rresult) { });
                    }
                }, ctx);
                callback(err, pk);
            }
        });
    };

    /**
     * Update record and return count.
     * @param {*} user 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(user, callback, ctx) {
        var sql = "UPDATE st_user SET MODIFIED_DATETIME = NOW(), FIRST_NAME=?,LAST_NAME=?,LOGIN=?,PASSWORD=?,DOB=?,MOBILE_NO=?,ROLE_ID=?,GENDER=? WHERE ID=?"
        var params = [user.firstName, user.lastName, user.login,
        user.password, user.dob, user.mobileNo, user.roleId, user.gender, user.id];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.affectedRows);
            }
        });
    }


    /**
  * Delete record and return user bean.
  * @param {*} id 
  * @param {*} callback 
  * @param {*} ctx 
  */
    delete(id, callback, ctx) {
        super.delete(id, 'st_user', callback, ctx);
    }

    /**
     * Update user picture
     * @param {*} pic 
     * @param {*} callback 
     * @param {*} ctx 
     */
    updatePicture(pic, callback, ctx) {
        var sql = "UPDATE st_user SET PIC_NAME=?, PIC_TYPE =?, PIC = ? WHERE ID=?"
        var params = [pic.name, pic.type, pic.data, pic.id];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.affectedRows);
            }
        });
    }

    /**
     * Get the picture of User
     * 
     * @param {*} id Primary key 
     * @param {*} callback 
     * @param {*} ctx User Context
     */
    getPicture(id, callback, ctx) {
        var sql = "SELECT PIC_NAME, PIC_TYPE, PIC FROM st_user WHERE ID=?";
        var params = [id];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                //Check if record is found and name of picture is not null
                if (result[0] && result[0].PIC_NAME) {
                    var pic = {
                        "id": id,
                        "name": result[0].PIC_NAME,
                        "type": result[0].PIC_TYPE,
                        "data": result[0].PIC
                    }
                    callback(err, pic);
                } else {
                    callback('No picture');
                }
            }
        });
    }

    /**
     * Change user password
     * 
     * @param {*} user 
     * @param {*} callback 
     * @param {*} ctx 
     */
    changePassword(form, callback, ctx) {
        var self = this;
        self.findByPk(form.id, function (err, user) {
            if (form.oldPassword == user.password) {
                var sql = "UPDATE st_user SET PASSWORD=? WHERE id=?";
                var params = [form.password, form.id];
                self.executeSQL(sql, params, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, result.affectedRows);
                        //Send email
                        var m = {
                            login: user.login,
                            password: form.password,
                            firstName: user.firstName,
                            lastName: user.lastName
                        };

                        var msg = EmailBuilder.getChangePasswordMessage(m);
                        msg.to = user.login;
                        
                        var ser = new EmailService()
                        ser.sendEmail(msg, function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                });
            } else {
                callback("Current password does not match");
            }
        });
    }

}
module.exports = UserService;

