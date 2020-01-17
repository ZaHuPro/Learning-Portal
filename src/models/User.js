
module.exports = function UserIS(sequelize, DataTypes) {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: 'id',
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
        // eslint-disable-next-line no-console
        console.log(db);
    };
    return User;
};
