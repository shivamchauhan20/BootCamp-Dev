const app = require("express");

app.use(express.json());

app.listen(2012,()=>{
    console.log("Server Started at 2012");
})