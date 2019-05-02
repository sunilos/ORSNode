var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

class MongoService {
    constructor() { }
    getCollection(collectionName) {
        global.collectionName = collectionName;
    }
    executeAdd(mongo, callback) {
        MongoClient.connect(url, function (err, db) {
            var dbobj = db.db("ors_demo");
            if (err) {
                console.log(err)
                callback(err);
                db.close();
            }
            dbobj.collection(this.collectionName).insertOne(mongo, function (err, result) {
                callback(err, result);
                db.close();
            });
        });

    }
    executeUpdate(id, newvalues, callback) {
        MongoClient.connect(url, function (err, db) {
            var dbobj = db.db("ors_demo");
            if (err) {
                console.log(err)
                callback(err);
                db.close();
            }
            dbobj.collection(collectionName).updateOne(id, newvalues, function (err, result) {
                callback(err, result)
                db.close();
            });
        });

    }
    executedelete(id, callback) {
        MongoClient.connect(url, function (err, db) {
            var dbobj = db.db("ors_demo");
            if (err) {
                console.log(err)
                callback(err);
                db.close();
            }
            dbobj.collection(collectionName).deleteOne(id, function (err, res) {
                callback(err, res);
                db.close();
            });
        });

    }
    executeFindByPk(id, callback) {
        MongoClient.connect(url, function (err, db) {
            var dbobj = db.db("ors_demo");
            if (err) {
                console.log(err)
                callback(err);
                db.close();
            }
            dbobj.collection(collectionName).find(id, function (err, res) {
                callback(err, res);
                db.close();
            });
        });

    }
    executeFind(callback, ctx) {
        console.log(collectionName)
        MongoClient.connect(url, function (err, db) {
            var dbobj = db.db("ors_demo");
            if (err) {
                console.log("mongo", err)
                callback(err);
                db.close();
            }
            dbobj.collection(collectionName).find({}).toArray(function (err, res) {
                callback(err, res);
                db.close();
            });
        });

    }
    executeSearch(pageNo, size, callback) {
        MongoClient.connect(url, function (err, db) {
            var dbobj = db.db("ors_demo");
            if (err) {
                console.log(err)
                callback(err);
                db.close();
            }
            dbobj.collection(collectionName).find().skip(pageNo).limit(size).toArray(function (err, res) {
                callback(err, res);
                db.close();
            });
        });

    }
}
module.exports = MongoService;