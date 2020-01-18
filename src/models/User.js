
module.exports = function UserIS(sequelize, DataTypes) {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: 'id',
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        joined_ip: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true,
        freezeTableName: true,
    });

    User.associate = function Associate(db) {
        db.User.hasMany(db.Answer, { foreignKey: 'user_id', sourceKey: 'id' });
    };
    return User;
};
