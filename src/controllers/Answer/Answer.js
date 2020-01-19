import { successResponce } from '../../utils/Exchange';
import questionModule from '../../helper/question';
import AnswerModule from '../../helper/answer';

class AnswerQuestions {
    static async index(req, res) {
        const questions = await questionModule.getQuestions(req.body);
        const isExist = await AnswerModule.fetchAnswerCount({
            where: {
                question_id: questions.id,
                user_id: req.userData.id,
            },
        });
        await AnswerModule.updateAnswer(req.body, questions, req.userData.id, isExist > 0);
        return successResponce(req, res, 'Your answer has been successfully submitted', 202, {});
    }

    static async result(req, res) {
        const data = {};
        data.total = await questionModule.fetchQuestionCount({});
        data.answered = await AnswerModule.fetchAnswerCount({});
        data.correct = await AnswerModule.fetchAnswerCount({
            where: {
                status: 'CORRECT',
            },
        });
        data.worng = await AnswerModule.fetchAnswerCount({
            where: {
                status: 'WRONG',
            },
        });
        data.skipped = await AnswerModule.fetchAnswerCount({
            where: {
                status: 'SKIPPED',
            },
        });
        data.unseen = data.total - data.answered;

        data.percentage = {
            total: `${parseFloat((data.correct / data.total) * 100).toFixed(2)}%`,
            answered: `${parseFloat((data.correct / data.answered) * 100).toFixed(2)}%`,
        };

        return successResponce(req, res, 'Your result genrated successfully', 202, data);
    }
}

export default AnswerQuestions;
