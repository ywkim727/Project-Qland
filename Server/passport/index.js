const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {    // user === exUser
        done(null, user.id);    // 세션에 user.id만 저장, 유저 정보를 전부 저장하기는 메모리 부담이 크니까
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then(user => done(null, user)) // req.user에 저장
            .catch(err => done(err));
    });

    local();
    kakao();
};