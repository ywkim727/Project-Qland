const Sequeilize = require('sequelize');

class Hashtag extends Sequeilize.Model {
    static initiate(sequelize) {
        Hashtag.init({
            title: {
                type: Sequeilize.STRING(15),
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        })

    }
    static associate(db) {
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' }); // 해시태그, N:M 관계

    }
}

module.exports = Hashtag;