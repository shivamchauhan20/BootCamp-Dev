let express = require("express");
let userRouter = new express.Router();
let {getAllUsers,createUser,getUser,updateUser,deleteUser} = require("../controllers/userController");

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:uid").get(getUser).patch(updateUser).delete(deleteUser);

module.exports.userRouter = userRouter;