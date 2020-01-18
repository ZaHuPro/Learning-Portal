import { successResponce } from '../../utils/Exchange';
import Questions from '../../helper/question';
import Answer from '../../helper/answer';

class AnswerQuestions {
    static async index(req, res) {
        const questions = await Questions.getQuestions(req.body);
        await Answer.updateAnswer(req.body, questions, req.userData.id);
        return successResponce(req, res, 'Your answer has been successfully submitted', 202, {});
    }

    static async result(req, res) {
        const data = {};
        data.total = await Questions.fetchQuestionCount({});
        data.answered = await Answer.fetchAnswerCount({});
        data.correct = await Answer.fetchAnswerCount({
            where: {
                status: 'CORRECT',
            },
        });
        data.worng = await Answer.fetchAnswerCount({
            where: {
                status: 'WRONG',
            },
        });
        data.skipped = await Answer.fetchAnswerCount({
            where: {
                status: 'SKIPPED',
            },
        });
        data.unseen = data.total - data.answered;

        data.percentage = {
            total: `${(data.correct / data.total) * 100}%`,
            answered: `${(data.correct / data.answered) * 100}%`,
        };

        return successResponce(req, res, 'Your result genrated successfully', 202, data);
    }
}

export default AnswerQuestions;
