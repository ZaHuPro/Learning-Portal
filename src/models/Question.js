
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
            type: DataTypes.TEXT,
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
        option_a: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        option_b: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        option_c: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        option_d: {
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
