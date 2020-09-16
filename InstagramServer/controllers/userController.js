const fs = require("fs");
const path = require("path");
let users = require(path.join(__dirname, "../models/users.json"));
const { v4: uuidv4 } = require('uuid');
const userModel = require("../models/userModel");
const userFollower = require("../models/userFollowerModel");

const getAllUsers = (req, res) => {
    res.status(200).json({
        status: "success",
        users: users
    });
}

const createUser = async (req, res) => {
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

const getUser = async (req, res) => {
    let uid = req.params.uid;
    try {
        let userObj = await userModel.getByID(uid);
        res.status(200).json({
            status: "success",
            user: userObj
        })
    }
    catch (err) {
        res.status(500).json({
            status: "success",
            "message": err.message
        })
    }
}

const updateUser = async (req, res) => {
    let uid = req.params.uid;
    let toBeUpdated = req.body;
    try {
        let result = await userModel.update(uid, toBeUpdated);
        res.status(200).json({
            status: "successs",
            message: result
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failure",
            "message": err.message
        })
    }
}

const deleteUser = async (req, res) => {
    let uid = req.params.uid;
    try {
        let result = await userModel.delete(uid);
        res.status(200).json({
            status: "success",
            message: result
        })
    }
    catch (err) {
        res.status(50).json({
            status: "failure",
            "message": err.message
        })
    }
}

const createRequest = async (req, res) => {
    let obj = req.body; //In obj follower_id is your id and user_id is the id of person to which request is sent.
    try {
        await userFollower.addPendingFollower(obj);
        let { name,is_public } = await userModel.getByID(obj.user_id);
        if (is_public) {
            await userFollower.acceptRequest(obj.user_id, obj.follower_id);
            return res.status(201).json({
                status: "success",
                message: "You are now following "+name
            });
        }
        res.status(201).json({
            status: "success",
            message: "Request sent"
        });
    }
    catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}

const getAllFollowers = async (req, res) => {
    let user_id = req.params.uid;
    try {
        let result = await userFollower.getAllFollowers(user_id);
        res.status(200).json({
            status: "success",
            message: result
        });
    }
    catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        });
    }
}

const acceptRequest = async (req, res) => {
    let user_id = req.params.uid;
    let {follower_id } = req.body;
    try {
        await userFollower.acceptRequest(user_id, follower_id);
        res.status(200).json({
            status: "success",
            message: "Request accepted"
        });
    }
    catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        });
    }
}

const getFollowerCount = async (req,res) =>{
    let user_id = req.params.uid;
    try{
        let result = await userFollower.getFollowerCount(user_id);
        res.status(201).json({
            status:"success",
            message: result
        });
    }
    catch(err){
        res.status(500).json({
            status: "failure",
            message: err.message
        });
    }
}

module.exports.getAllUsers = getAllUsers;
module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.createRequest = createRequest;
module.exports.getAllFollowers = getAllFollowers;
module.exports.acceptRequest = acceptRequest;
module.exports.getFollowerCount = getFollowerCount;