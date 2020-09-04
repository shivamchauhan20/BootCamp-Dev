const app = require("express");
let userRouter = require("./routers/userRouter");

app.use(express.json());
app.use("/api/v1/users",userRouter);

app.use("*",(req,res)=>{
    res.status(404).json({
        "message" : "Page Not Found"
    })
})
app.listen(2012,()=>{
    console.log("Server Started at 2012");
})