const connection = require("./connection");
const e = require("express");

const addPendingFollower = (obj) =>{
    const query = 'INSERT INTO user_follower SET ?';
    return new Promise((resolve,reject)=>{      //user_id will be the person receiving request and follower_id is the person sending request.
        connection.query(query,obj,(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
}

const getAllFollowers = (user_id) =>{
    const query = 'SELECT * from user_follower WHERE user_id=?';
    return new Promise((resolve,reject)=>{
        connection.query(query,user_id,(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
}

const acceptRequest = (user_id,follower_id) => {
    return new Promise((resolve,reject)=>{
        const query = 'UPDATE user_follower SET is_accepted=true where user_id =? AND follower_id =?';
        connection.query(query,[user_id,follower_id],(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
}

const getFollowerCount = (user_id)=>{
    return new Promise((resolve,reject)=>{
        const query = 'SELECT COUNT(*) AS COUNT FROM user_follower where user_id =? AND is_accepted = "1"';
        connection.query(query,[user_id],(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
}

module.exports.addPendingFollower = addPendingFollower;
module.exports.getAllFollowers = getAllFollowers;
module.exports.acceptRequest = acceptRequest;
module.exports.getFollowerCount = getFollowerCount;