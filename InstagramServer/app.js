const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/v1/user",userRouter);
app.use("/api/v1/post",postRouter);

app.use("*",(req,res)=>{
    res.status(404).json({
        "message" : "Page Not Found"
    })
})
app.listen(2012,()=>{
    console.log("Server Started at 2012");
})