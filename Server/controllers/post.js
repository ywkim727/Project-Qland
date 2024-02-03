const Post = require('../models/post');
const Hashtag = require('../models/hashtag');

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
}

exports.uploadPost = async (req, res, next) => {
    //req.body.content, req.body.image
    try{
        const post = await Post.create({
            content : req.body.content,
            img : req.body.url,
            UserId : req.user.id,
        })
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => {
                return Hashtag.findOrCreate({   // findOrCreate -> 검색해서 있으면 가져오고, 없으면 만들어서 가져오기
                    where: { title: tag.slice(1).toLowerCase() }    //#을 떼고 소문자로 저장
                });
            }));
            console.log(result);
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
}