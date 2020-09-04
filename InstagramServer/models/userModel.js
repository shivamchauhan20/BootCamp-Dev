const connection = require("./connection");

let create = (userObj) => {
    return new Promise(function (resolve, reject) {
        // let sql = `INSERT INTO user (uid, name, phone, email, handle, bio) VALUES ('${userObj.uid}','${userObj.name}','${userObj.phone}','${userObj.email}','${userObj.handle}','${userObj.bio}');`;
        connection.query('INSERT INTO user SET ?', userObj, function (err, result) {
            if (err){
                console.log(err);
                reject(err);
            }
            else{
                console.log("1 record inserted");
                resolve(result);
            }
        });
    })
}

let getByID = (uid) =>{
    return new Promise(function (resolve, reject) {
        connection.query(`SELECT * FROM user WHERE uid="${uid}"`, function (err, result) {
            if (err){
                reject(err);
            }
            else{
                resolve(result[0]);
            }
        });
    })
}

module.exports.create = create;
module.exports.getByID = getByID;