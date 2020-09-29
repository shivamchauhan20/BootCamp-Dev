let express = require("express");
let userRouter = new express.Router();
let {getAllUsers,createUser,getUser,updateUser,deleteUser,createRequest,getAllFollowers,acceptRequestHandler,getFollowerCount} = require("../controllers/userController");
const multer = require("multer");
const filter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Not an Image!Please upload an image"), false)
    }
}
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/user')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpeg")
    }
})
const upload = multer({
    fileFilter: filter,
    storage: multerStorage
});
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/request").post(createRequest);
userRouter.route("/request/:uid").get(getAllFollowers).patch(acceptRequestHandler);
userRouter.route("/:uid").get(getUser).patch(upload.single("photo"),updateUser).delete(deleteUser);
userRouter.route("/count/:uid").get(getFollowerCount);

module.exports = userRouter;