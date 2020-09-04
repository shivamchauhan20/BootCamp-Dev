
let users = require("../models/users.json");

const getAllUsers = (req,res)=>{
    res.status(200).json({
        status : "success",
        users : users
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
