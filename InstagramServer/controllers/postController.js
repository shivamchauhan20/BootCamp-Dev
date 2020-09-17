const { v4: uuidv4 } = require('uuid');
const postModel = require("../models/postModel");

const createPost = async (req, res) => {
    let postObj = req.body;
    try {
        let id = uuidv4();
        postObj.id = id;
        const date = new Date();
        postObj.created_at = date.toISOString().slice(0, 19).replace('T', ' ');
        let nDBPost = await postModel.create(postObj);
        res.status(201).json({
            status: "success",
            post: nDBPost
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failure",
            "message": err.message
        })
    }
}

module.exports.createPost = createPost;