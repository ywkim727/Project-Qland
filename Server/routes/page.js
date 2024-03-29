const express = require('express');
const router = express.Router();
const { renderMain, renderJoin, renderProfile, renderHashtag } = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.use((req, res, next) => {   // 모든 라우터에 공통으로 적용되는 미들웨어
    res.locals.user = req.user; // res.locals 객체에 user 속성을 추가, 값은 null
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followerIdList = [];
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next(); // next 함수를 호출해야 다음 미들웨어로 넘어감
});

router.get('/', renderMain);    // 라우터의 마지막 미들웨어(renderMain)는 컨트롤러로 분리해서 작성한다 
router.get('/join', isNotLoggedIn ,renderJoin);
router.get('/profile', isLoggedIn ,renderProfile);
router.get('/hashtag', renderHashtag);

module.exports = router;