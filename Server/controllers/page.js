const Post = require('../models/post');
const User = require('../models/user');
const Hashtag = require('../models/hashtag');

exports.renderMain = async (req, res, next) => {
    try{
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'], // 작성자의 id와 닉네임 
            },
            order: [['createdAt', 'DESC']], // 최신순으로 정렬, DESC는 내림차순, ASC는 오름차순
        });
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }   
};

exports.renderJoin = (req, res, next) => {
    res.render('join', {title: '회원가입'});
};

exports.renderProfile = (req, res, next) => {
    res.render('profile', {title: '내 정보'});
};

exports.renderHashtag = async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect('/');
    }
    try{
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({
                include: [{ model: User, attributes: ['id', 'nick'] }],
                order : [['createdAt', 'DESC']],
            });
        }
        res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts,
        }); 
    } catch (error) {
        console.error(error);
        next(error);
    }
}
//라우터 -> 컨트롤러 -> 서비스