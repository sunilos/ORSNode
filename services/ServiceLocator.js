var CollegeService = require("./CollegeService");
var MarksheetService = require("./MarksheetService");
var RoleService = require("./RoleService");
var StudentService = require("./StudentService");
var UserService = require("./UserService");
/**
 * Locate service 
 */
class ServiceLocator {

  constructor() {
    this.db = 'MySQL';
  }
  static getCollegeService() {
    return new CollegeService();
  }
  static getMarksheetService() {
    return new MarksheetService();
  }
  static getRoleService() {
    return new RoleService();
  }
  static getStudentService() {
    return new StudentService();
  }
  static getUserService() {
    return new UserService();
  }


}
module.exports = ServiceLocator;
