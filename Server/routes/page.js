const express = require('express');
const router = express.Router();
const {renderMain, renderJoin, renderProfile} = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.use((req, res, next) => {   // 모든 라우터에 공통으로 적용되는 미들웨어
    res.locals.user = req.user; // res.locals 객체에 user 속성을 추가, 값은 null
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next(); // next 함수를 호출해야 다음 미들웨어로 넘어감
});

router.get('/', renderMain);    // 라우터의 마지막 미들웨어(renderMain)는 컨트롤러로 분리해서 작성한다 
router.get('/join', isNotLoggedIn ,renderJoin);
router.get('/profile', isLoggedIn ,renderProfile);

module.exports = router;