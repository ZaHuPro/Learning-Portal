
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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        hash: {
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
    }, {
        timestamps: true,
        freezeTableName: true,
    });

    User.associate = function Associate(db) {
        db.User.hasMany(db.Answer, { foreignKey: 'user_id', sourceKey: 'id' });
    };
    return User;
};
