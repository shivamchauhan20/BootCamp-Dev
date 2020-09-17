const express = require("express");
const postRouter = express.Router();

let {createPost} = require("../controllers/postController");

postRouter.route("/").post(createPost);

module.exports = postRouter;