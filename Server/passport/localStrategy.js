const passport = require('passport');
const { Strategy : LocalStrategy } = require('passport-local');
const bycrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email', // req.body.email
        passwordField: 'password', // req.body.password
        passReqToCallback: false
    }, async (email, password, done) => {   // done(에러, 성공, 실패)
        try{
            const exUser = await User.findOne({where : {email}});   // 이메일로 사용자 찾기
            if (exUser) {   // 사용자가 있으면
                const result = await bycrypt.compare(password, exUser.password); // 비밀번호 비교
                if (result) {
                    done(null, exUser); // 성공
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' }); // 실패
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' }); // 실패
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
};