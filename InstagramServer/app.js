const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routers/userRouter");

app.use(cors());
app.use(express.json());

app.use("/api/v1/user",userRouter);

app.use("*",(req,res)=>{
    res.status(404).json({
        "message" : "Page Not Found"
    })
})
app.listen(2012,()=>{
    console.log("Server Started at 2012");
})