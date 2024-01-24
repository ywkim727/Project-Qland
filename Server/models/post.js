const Sequeilize = require('sequelize');

class Post extends Sequeilize.Model {
    static initiate(sequelize) {
        Post.init({
            content: {
                type: Sequeilize.STRING(140),
                allowNuLL: false,
            },
            img: {
                type: Sequeilize.STRING(200),
                allowNuLL: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        })
    }

    static associate(db) {
        db.Post.belongsTo(db.User); // 게시글, 1:N 관계
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // 해시태그, N:M 관계
    }
}

module.exports = Post;