const Sequelize = require('sequelize');
// const User = require('./user');
// const Post = require('./post');
// const Hashtag = require('./hashtag');
// ---->>>> 자동화
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';  //config.json에서 정보를 가져오는 환경설정
const config = require('../config/config')[env];
const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
// db.User = User;
// db.Post = Post;
// db.Hashtag = Hashtag;

// User.initiate(sequelize);
// Post.initiate(sequelize);
// Hashtag.initiate(sequelize);

// User.associate(db);
// Post.associate(db);
// Hashtag.associate(db); 
// ---->>>> 자동화
const basename = path.basename(__filename); // basename => index.js
fs.readdirSync(__dirname) 
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'; // 숨김파일 제외 && index.js(자기 자신) 제외 && .js로 끝나는 파일만
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file));
        db[model.name] = model;
        model.initiate(sequelize);
    });
Object.keys(db).forEach(modelName => {  //initiate가 모두 끝난 후에 associate를 실행해야 하므로 forEach문을 사용
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});  


module.exports = db;
