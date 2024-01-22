const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config(); // .env 파일을 읽어서 process.env로 만듦
const pageRouter = require('./routes/page');

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html'); // 템플릿 엔진을 html로 설정
nunjucks.configure('views', {   // 템플릿 파일들이 위치한 폴더를 지정
  express: app,
  watch: true,
});

app.use(morgan('dev')); //나중에 배포할 때는 combined로 바꾸기
app.use(express.static(path.join(__dirname, 'public'))); // static 미들웨어는 정적인 파일들을 제공하는 라우터 역할
app.use(express.json()); // body-parser와 같은 역할
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie-parser 미들웨어는 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만듦
app.use(session({
    resave: false, // 요청이 올 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지 설정
    saveUninitialized: false, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
    secret: process.env.COOKIE_SECRET, // cookie-parser의 비밀키와 같은 역할
    cookie: {
        httpOnly: true, // 클라이언트에서 쿠키를 확인하지 못하도록 설정
        secure: false, // https가 아닌 환경에서도 사용할 수 있도록 설정, https일 경우 true로 설정
    },
    name: 'session-cookie', // 쿠키의 이름을 설정
    }));

app.use('/', pageRouter);
app.use((req, res, next) => {   // 404 처리 미들웨어
    const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    err.status = 404;
    next(err); // 에러 처리 미들웨어
});
app.use((err, req, res, next) => {  // 에러 처리 미들웨어
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};    // 개발 모드일 때만 에러를 표시, 배포 모드일 때는 보안 상의 이유로 에러 내용을 표시하지 않음
    res.status(err.status || 500); // 에러 발생 시 500 상태 코드
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});