let express = require("express");
let userRouter = new express.Router();
let {getAllUsers,createUser,getUser,updateUser,deleteUser,createRequest,getAllFollowers,acceptRequest} = require("../controllers/userController");

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/request").post(createRequest);
userRouter.route("/request/:uid").get(getAllFollowers).post(acceptRequest);
userRouter.route("/:uid").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;