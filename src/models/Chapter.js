
module.exports = function ChapterIS(sequelize, DataTypes) {
    const Chapter = sequelize.define('chapter', {
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

    Chapter.associate = function Associate(db) {
        db.Chapter.belongsTo(db.Topic, { foreignKey: 'topic_id', sourceKey: 'id' });
        db.Chapter.hasMany(db.Question, { foreignKey: 'chapter_id', sourceKey: 'id' });
    };
    return Chapter;
};
