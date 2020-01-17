
module.exports = function QuestionIS(sequelize, DataTypes) {
    const Question = sequelize.define('question', {
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
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        option_1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        option_2: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        option_3: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        option_4: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        type: {
            type: DataTypes.ENUM,
            values: [
                'EASY',
                'MEDIUM',
                'HARD',
            ],
            defaultValue: 'EASY',
        },
    }, {
        timestamps: true,
        freezeTableName: true,
    });

    Question.associate = function Associate(db) {
        db.Question.belongsTo(db.Chapter, { foreignKey: 'chapter_id', sourceKey: 'id' });
        db.Question.hasMany(db.Answer, { foreignKey: 'question_id', sourceKey: 'id' });
    };
    return Question;
};
