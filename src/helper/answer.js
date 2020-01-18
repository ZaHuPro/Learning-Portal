import DB from '../providers/Database';

class AnswerModule {
    static async updateAnswer({ answer }, quetionIs, userID) {
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
        const returnIs = await DB.models.Answer.create(insertData);
        return returnIs;
    }

    static async fetchAnswerCount(whereIs) {
        const countIs = await DB.models.Answer.count(whereIs);
        return countIs;
    }
}

export default AnswerModule;
