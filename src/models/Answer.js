
module.exports = function AnswerIS(sequelize, DataTypes) {
    const Answer = sequelize.define('answer', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: 'id',
            unique: true,
        },
        result: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: [
                'CORRECT',
                'WRONG',
                'SKIPPED',
            ],
            defaultValue: 'SKIPPED',
        },
    }, {
        timestamps: true,
        freezeTableName: true,
    });

    Answer.associate = function Associate(db) {
        db.Answer.belongsTo(db.Question, { foreignKey: 'question_id', sourceKey: 'id' });
        db.Answer.belongsTo(db.User, { foreignKey: 'user_id', sourceKey: 'id' });
    };
    return Answer;
};
