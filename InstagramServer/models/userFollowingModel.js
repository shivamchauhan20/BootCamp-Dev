const connection = require("./connection");
const e = require("express");

const addFollowing = (obj) =>{
    const query = 'INSERT INTO user_following SET ?';
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

const getAllFollowing = (user_id) =>{
    const query = 'SELECT * from user_following WHERE user_id=?';
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

const getFollowingCount = (user_id)=>{
    return new Promise((resolve,reject)=>{
        const query = 'SELECT COUNT(*) AS COUNT FROM user_following where user_id =? AND is_accepted = "1"';
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

module.exports.addFollowing = addFollowing;
module.exports.getAllFollowing = getAllFollowing;
module.exports.getFollowingCount = getFollowingCount;