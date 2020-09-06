const connection = require("./connection");
let util = require("util");

const create = (userObj) => {
    return new Promise(function (resolve, reject) {
        // let sql = `INSERT INTO user (uid, name, phone, email, handle, bio) VALUES ('${userObj.uid}','${userObj.name}','${userObj.phone}','${userObj.email}','${userObj.handle}','${userObj.bio}');`;
        connection.query('INSERT INTO user SET ?', userObj, function (err, result) {
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

const getByID = (uid) => {
    return new Promise(function (resolve, reject) {
        connection.query(`SELECT * FROM user WHERE uid="${uid}"`, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result[0]);
            }
        });
    })
}

const update = (uid, toBeUpdated) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE user SET ? WHERE uid = ?';
        connection.query(query, [toBeUpdated, uid], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

const del = (uid) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM user WHERE uid = ?";
        connection.query(query,[uid],(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
}

module.exports.create = create;
module.exports.getByID = getByID;
module.exports.update = update;
module.exports.delete = del;