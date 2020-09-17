let express = require("express");
let userRouter = new express.Router();
let {getAllUsers,createUser,getUser,updateUser,deleteUser,createRequest,getAllFollowers,acceptRequestHandler,getFollowerCount} = require("../controllers/userController");

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/request").post(createRequest);
userRouter.route("/request/:uid").get(getAllFollowers).patch(acceptRequestHandler);
userRouter.route("/:uid").get(getUser).patch(updateUser).delete(deleteUser);
userRouter.route("/count/:uid").get(getFollowerCount);

module.exports = userRouter;