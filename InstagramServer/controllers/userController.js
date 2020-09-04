const fs = require("fs");
let users = require("../models/users.json");
const { v4: uuidv4 } = require('uuid');

const getAllUsers = (req,res)=>{
    res.status(200).json({
        status : "success",
        users : users
    });
}

const createUser = (req,res)=>{
    let userObj = req.body;
    let uid = uuidv4();
    userObj.uid = uid;
    users.push(JSON.stringify(userObj));
    fs.writeFileSync("../models/users.json",users);
    res.status(200).json({
        status : "user added",
        "user" : userObj
    });
}

const getUser = (req,res)=>{
    let uid = req.params.uid;
    let user = users.filter((users)=>{
        return user.uid == uid;
    });
    res.status(200).json({
        status : "success",
        "data" : user.length == 0 ? "user not found" : user
    });
}

const updateUser = (req,res)=>{
    let uid = req.params.uid;
    let user = getUserByID(uid);
    let toBeUpdated = req.body;

    for(let key in toBeUpdated){
        user[key] = toBeUpdated[key];
    }
    fs.writeFileSync("../models/users.json",users);

    res.status(200).json({
        status : "successs",
        message : "user updated"
    })
}

const deleteUser = (req,res)=>{
    let uid = req.params.uid;
    users = users.filter((user)=>{
        return user.uid != uid;
    });
    fs.writeFileSync("../models/users.json",users);
    
    res.status(200).json({
        status : "success",
        "message" : "user deleted"
    })
}

function getUserByID(uid){
    let userArr = users.filter((user)=>{
        return user.uid == uid;
    })

    return userArr[0];
}

module.exports.getAllUsers = getAllUsers;
module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;