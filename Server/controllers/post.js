const Post = require('../models/post');

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
}

exports.uploadPost = async (req, res, next) => {
    //req.body.content, req.body.image
    try{
        const post = awiat Post.create({
            content : req.body.content,
            img : req.body.url,
            UserId : req.user.id,
        })
        const hashtags = req.body.content.match(/#[^\s#]*/g);
    } catch (error) {
        console.error(error);
        next(error);
    }
}