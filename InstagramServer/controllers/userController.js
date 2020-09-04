const fs = require("fs");
const path = require("path");
let users = require(path.join(__dirname, "../models/users.json"));
const { v4: uuidv4 } = require('uuid');
const userModel = require("../models/userModel");

const getAllUsers = (req,res)=>{
    res.status(201).json({
        status : "success",
        users : users
    });
}

const createUser = async (req,res)=>{
    let userObj = req.body;
    let uid = uuidv4();
    userObj.uid = uid;
    try {
        let nDBUser = await userModel.create(userObj);
        res.status(201).json({
            status: "success",
            user: nDBUser
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "success",
            "message": err.message
        })
    }
}

const getUser = async (req,res)=>{
    let uid = req.params.uid;
    try{
        let userObj = await userModel.getByID(uid);
        res.status(201).json({
            status : "success",
            user : userObj
        })
    }
    catch(err){
        res.status(500).json({
            status: "success",
            "message": err
        })
    }
}

const updateUser = (req,res)=>{
    let uid = req.params.uid;
    let user = getUserByID(uid);
    let toBeUpdated = req.body;

    for(let key in toBeUpdated){
        user[key] = toBeUpdated[key];
    }
    fs.writeFileSync(path.join(__dirname, "../models/users.json"),JSON.stringify(users));

    res.status(201).json({
        status : "successs",
        message : "user updated"
    })
}

const deleteUser = (req,res)=>{
    let uid = req.params.uid;
    users = users.filter((user)=>{
        return user.uid != uid;
    });
    fs.writeFileSync(path.join(__dirname, "../models/users.json"),JSON.stringify(users));
    
    res.status(201).json({
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