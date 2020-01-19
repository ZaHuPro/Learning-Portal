import DB from '../providers/Database';

class AnswerModule {
    static async updateAnswer({ answer }, quetionIs, userID, isUpdate) {
        const insertData = {
            result: answer,
            question_id: quetionIs.id,
            user_id: userID,
            status: 'SKIPPED',
        };

        if (quetionIs.answer === answer.toLowerCase()) {
            insertData.status = 'CORRECT';
        } else if (answer.toLowerCase() === 'skip') {
            insertData.status = 'SKIPPED';
        } else {
            insertData.status = 'WRONG';
        }
        let returnIs = {};
        if (isUpdate) {
            returnIs = await DB.models.Answer.update({
                result: answer,
                status: insertData.status,
            }, {
                where: {
                    question_id: quetionIs.id,
                    user_id: userID,
                },
            });
        } else {
            returnIs = await DB.models.Answer.create(insertData);
        }
        return returnIs;
    }

    static async fetchAnswerCount(whereIs) {
        const countIs = await DB.models.Answer.count(whereIs);
        return countIs;
    }

    static async fetchAnswers(conditions) {
        const countIs = await DB.models.Answer.findAll(conditions);
        return countIs;
    }

    static async fetchForRandom({ id, type }, allAnsered, userID) {
        const quesryIs = {
            where: {
                user_id: userID,
            },
            attributes: ['question_id'],
            include: [
                {
                    model: DB.models.Question,
                    required: true,
                    attributes: [],
                    include: [
                        {
                            model: DB.models.Chapter,
                            required: true,
                            attributes: [],
                            include: [
                                {
                                    model: DB.models.Topic,
                                    required: true,
                                    attributes: [],
                                    include: [
                                        {
                                            model: DB.models.Subject,
                                            required: true,
                                            attributes: [],
                                            include: [
                                                {
                                                    model: DB.models.Exam,
                                                    required: true,
                                                    attributes: [],

                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        if (allAnsered) {
            quesryIs.where.status = 'SKIPPED';
        }

        if (type && id) {
            if (type.toLowerCase() === 'exam') {
                quesryIs.include[0].include[0].include[0].include[0].include[0].where = {
                    id,
                };
            } else if (type.toLowerCase() === 'subject') {
                quesryIs.include[0].include[0].include[0].include[0].where = {
                    id,
                };
            } else if (type.toLowerCase() === 'topic') {
                quesryIs.include[0].include[0].include[0].where = {
                    id,
                };
            } else if (type.toLowerCase() === 'chapter') {
                quesryIs.include[0].include[0].where = {
                    id,
                };
            } else if (type.toLowerCase() === 'question') {
                quesryIs.include[0].where = {
                    id,
                };
            }
        }
        const countIs = await DB.models.Answer.findAll(quesryIs);
        return countIs;
    }
}

export default AnswerModule;
