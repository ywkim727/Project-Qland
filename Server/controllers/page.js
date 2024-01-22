exports.renderMain = (req, res, next) => {
    res.render('main', {
        title: 'NodeBird',
        twits: [],
    });
};

exports.renderJoin = (req, res, next) => {
    res.render('join', {title: '회원가입'});
};

exports.renderProfile = (req, res, next) => {
    res.render('profile', {title: '내 정보'});
};

//라우터 -> 컨트롤러 -> 서비스