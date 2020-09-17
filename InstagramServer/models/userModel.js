const connection = require("./connection");
let util = require("util");
const factory = require("./factoryModel");

// const create = (userObj) => {
//     return new Promise(function (resolve, reject) {
//         // let sql = `INSERT INTO user (id, name, phone, email, handle, bio) VALUES ('${userObj.id}','${userObj.name}','${userObj.phone}','${userObj.email}','${userObj.handle}','${userObj.bio}');`;
//         connection.query('INSERT INTO user SET ?', userObj, function (err, result) {
//             if (err) {
//                 console.log(err);
//                 reject(err);
//             }
//             else {
//                 console.log("1 record inserted");
//                 resolve(result);
//             }
//         });
//     })
// }
let create = factory.createFactory("user");


const getByID = (id) => {
    return new Promise(function (resolve, reject) {
        connection.query(`SELECT * FROM user WHERE id="${id}"`, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result[0]);
            }
        });
    })
}

const update = (id, toBeUpdated) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE user SET ? WHERE id = ?';
        connection.query(query, [toBeUpdated, id], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

const del = (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM user WHERE id = ?";
        connection.query(query,[id],(err,result)=>{
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