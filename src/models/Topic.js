
module.exports = function TopicIS(sequelize, DataTypes) {
    const Topic = sequelize.define('topic', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: 'id',
            unique: true,
        },
        title: {
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

    Topic.associate = function Associate(db) {
        db.Topic.belongsTo(db.Subject, { foreignKey: 'subject_id', sourceKey: 'id' });
        db.Topic.hasMany(db.Chapter, { foreignKey: 'topic_id', sourceKey: 'id' });
    };
    return Topic;
};
