const Sequeilize = require('sequelize');

class User extends Sequeilize.Model {
    static initiate(sequelize) {
        User.init({
            email: {
                type: Sequeilize.STRING(40),
                allowNull: true,    // email이 없을수도 있다 -> 카카오로 로그인한 경우
                unique: true,
            },
            nick: {
                type: Sequeilize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequeilize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequeilize.ENUM('local', 'kakao'), // 로컬, 카카오 둘 중 하나로만 로그인 가능
                allowNull: false,
                defaultValue: 'local',  // 디폴트는 로컬 로그인으로
            },
            snsId: {
                type: Sequeilize.STRING(30),
                allowNull: true,
            },     
        }, {
                sequelize,
                timestamps: true, // createdAt, updatedAt 시간을 자동으로 기록
                underscored: false, // true일떄는 createdAt -> created_at
                modelName: 'User',
                tableName: 'users',
                paranoid: true, // deletedAt, 회원 삭제 시간을 자동으로 기록 -> soft delete를 위함
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
        })
    }
    static associate(db) {
        db.User.hasMany(db.Post); // 게시글, 1:N 관계
        db.User.belongsToMany(db.User, { // 팔로워, N:M 관계
            foreignKey: 'followingId', // foreignKey는 테이블에 저장되는 컬럼 이름
            as: 'Followers', // as는 시퀄라이즈에서 사용하는 이름
            through: 'Follow', // through는 중간 테이블 이름
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',   //팔로잉, N:M 관계
            as: 'Followings',
            through: 'Follow',
        });
    }
}

module.exports = User;