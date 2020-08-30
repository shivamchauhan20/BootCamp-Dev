const express = require("express");
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
let users = require("./users.json");

//To accept data in json
app.use(express.json());

app.post("/user", function (req, res) {
    let userObj = req.body;
    let uuid = uuidv4();
    userObj.uid = uuid;
    console.log(userObj);
    users.push(userObj);
    fs.writeFileSync("./users.json", JSON.stringify(users));
    res.status(201).json({
        "status": "accepted",
        "user": userObj,
        "msg": "user created"
    });
})

app.get("/user/:uid",(req,res)=>{
    let uid = req.params.uid;
    let userArr = users.filter(user=>user.uid == uid);
    res.status(201).json({
        "status": "accepted",
        "user": userArr.length == 0 ? "No user found" : userArr[0]
    });
})

app.delete("/user/:uid",(req,res)=>{
    console.log("hello");
    let uid = req.params.uid;
    let tempArr = users;
    users = users.filter(user=>user.uid != uid);
    fs.writeFileSync('./users.json',JSON.stringify(users));
    res.status(201).json({
        "status":"accepted",
        "msg":tempArr.length == users.length ? "No users found" : "User deleted"
    })
})

app.get("/getusers",(req,res)=>{
    res.status(201).json({
        "status":"accepted",
        "users":users
    })
})

app.patch("/user/:uid",(req,res)=>{
    let uid = req.params.uid;
    let userObj = req.body;
    let isFound = false;
    for(let i = 0; i < users.length; i++){
        if(uid == users[i].uid){
            let user = users[i];
            for(let key in userObj){
                user[key] = userObj[key];
            }
            isFound = true;
            break;
        }
    }
    fs.writeFileSync('./users.json',JSON.stringify(users));
    res.status(200).json({
        "status":"success",
        "msg":isFound ? "User Updated" : "No user found"
    })
})

app.listen(2012, () => {
    console.log("Server started at 2012");
})