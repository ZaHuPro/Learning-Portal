import DB from '../providers/Database';

class Questions {
    static async RandomQuestions({ id, type }, whereIs, allAnsered) {
        const quesryIs = {
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
            limit: 10,
            attributes: ['id', 'title', 'type', 'option_a', 'option_b', 'option_c', 'option_d'],
        };

        if (allAnsered) {
            quesryIs.include.push({
                model: DB.models.Answer,
                required: true,
                attributes: [],
                where: {
                    status: 'SKIPPED',
                },
            });
        } else {
            quesryIs.where = whereIs;
        }

        if (type && id) {
            if (type.toLowerCase() === 'exam') {
                quesryIs.include[0].include[0].include[0].include[0].where = {
                    id,
                };
            } else if (type.toLowerCase() === 'subject') {
                quesryIs.include[0].include[0].include[0].where = {
                    id,
                };
            } else if (type.toLowerCase() === 'topic') {
                quesryIs.include[0].include[0].where = {
                    id,
                };
            } else if (type.toLowerCase() === 'chapter') {
                quesryIs.include[0].where = {
                    id,
                };
            } else if (type.toLowerCase() === 'question') {
                quesryIs.where = {
                    id,
                };
            }
        }


        const getData = await DB.models.Question.findAll(quesryIs);
        return getData;
    }


    static async counrRandomQuestions({ id, type }, allAnsered) {
        const quesryIs = {
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
        };

        if (allAnsered) {
            quesryIs.include.push({
                model: DB.models.Answer,
                required: true,
                attributes: [],
                where: {
                    status: 'SKIPPED',
                },
            });
        }

        if (type && id) {
            if (type.toLowerCase() === 'exam') {
                quesryIs.include[0].include[0].include[0].include[0].where = {
                    id,
                };
            } else if (type.toLowerCase() === 'subject') {
                quesryIs.include[0].include[0].include[0].where = {
                    id,
                };
            } else if (type.toLowerCase() === 'topic') {
                quesryIs.include[0].include[0].where = {
                    id,
                };
            } else if (type.toLowerCase() === 'chapter') {
                quesryIs.include[0].where = {
                    id,
                };
            } else if (type.toLowerCase() === 'question') {
                quesryIs.where = {
                    id,
                };
            }
        }


        const getData = await DB.models.Question.count(quesryIs);
        return getData;
    }

    static async getQuestions({ id }) {
        const getData = await DB.models.Question.findOne({
            where: {
                id,
            },
        });
        return getData;
    }

    static async fetchQuestionCount(whereIs) {
        const getData = await DB.models.Question.count(whereIs);
        return getData;
    }
}

export default Questions;
