
module.exports = function ExamIS(sequelize, DataTypes) {
    const Exam = sequelize.define('exam', {
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

    Exam.associate = function Associate(db) {
        db.Exam.hasMany(db.Subject, { foreignKey: 'exam_id', sourceKey: 'id' });
    };
    return Exam;
};
