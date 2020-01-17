
module.exports = function SubjectIS(sequelize, DataTypes) {
    const Subject = sequelize.define('subject', {
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

    Subject.associate = function Associate(db) {
        db.Subject.belongsTo(db.Exam, { foreignKey: 'exam_id', sourceKey: 'id' });
        db.Subject.hasMany(db.Topic, { foreignKey: 'subject_id', sourceKey: 'id' });
    };
    return Subject;
};
