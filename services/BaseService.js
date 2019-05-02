var pool = require("./MySQLPool");

/**
 * It is base class inherited by all service classes.
 * It provides generic operations of services.
 */
class BaseService {
  /**
   * Executes SQL with given parameters. 
   * 
   * @param {*} sql 
   * @param {*} params 
   * @param {*} callback 
   */
  executeSQL(sql, params, callback) {
    console.log('SQL: ' + sql);
    console.log(params);
    pool.getConnection(function (error, connection) {
      if (error) {
        console.error(error);
        callback(error);
        return;
      }
      connection.query(sql, params, function (error, results) {
        callback(error, results);
        connection.release();
      });
    });
  }

  /**
   * Returns bean object of a record.
   */
  executeSQLForObject(sql, params, bean, callback) {
    this.executeSQL(sql, params, function (err, result) {
      console.log('executeSQLForObject',err,result);
      if (err) {
        callback(err);
      } else if (result.length > 0) {
        console.log('----->1')
        bean.populateResult(result[0]);
        callback(err, bean);
      } else {
        console.log('----->2')
        callback("Record not found");
      }
    });
  }

  /**
   * Returns list of bean objects and count of total records satisfying search criteria.
   * It applies pagination if page number is given.
   * 
   * @param {*} sql 
   * @param {*} params 
   * @param {*} bean 
   * @param {*} callback :
   */
  executeSQLForList(sql, params, beanObj, callback) {

    var self = this;
    var pageSize = 10;

    //Apply limit for pagination 
    var sqlWithLimit = sql;

    if (params && params.pageNo > -1) {
      var startIndex = (params.pageNo) * pageSize;
      sqlWithLimit += " limit " + startIndex + "," + pageSize;
    }

    console.log('Params', params);
    console.log('Limit SQL', sqlWithLimit);

    //Count query 
    var sqlCount = "select count(*) as ct " + sql.substring(sql.toLocaleLowerCase().indexOf('from'));

    self.executeSQL(sqlWithLimit, params, function (err, result) {
      if (err) {
        callback(err);
        return;
      }

      //Create list of objects
      var list = [];
      result.forEach(function (e) {
        //Create clone of bean
        var bean = Object.create(beanObj);
        bean.populateResult(e);
        list.push(bean);
      });

      //Get count of records and add at the last of list
      self.executeSQL(sqlCount, params, function (err, result) {
        callback(err, {
          "list": list,
          "count": result[0].ct
        });
      });
    });
  }


  /**
   * Deletes a record and returns deleted record
   */
  delete(id, table, callback, ctx) {
    var sql = "DELETE FROM " + table + " WHERE ID=?";
    var params = [id];
    var self = this;
    this.findByPk(id, function (err, bean) {
      if (err) {
        callback(err);
      } else {
        self.executeSQL(sql, params, function (err, count) {
          if (err) {
            callback(err);
          } else {
            callback(err, bean);
          }
        });
      }
    });
  }

}

module.exports = BaseService;

