const connection = require("./connection");

module.exports.createFactory = function(entity){
    return function create(entityObj){
        return new Promise(function (resolve, reject) {
            let sql = `INSERT INTO ${entity} SET ?`;
            connection.query(sql,entityObj, function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log("1 record inserted");
                    resolve(result);
                }
            });
        }) 
    }
}