import Sequelize from 'sequelize';
import { successResponce, errorResponce } from '../../utils/Exchange';
import questionModule from '../../helper/question';
import answerModule from '../../helper/answer';

const { Op } = Sequelize;
class RandomQuestions {
    static async index(req, res) {
        req.body.id = req.body.id ? req.body.id : false;
        req.body.type = req.body.type ? req.body.type : false;
        if ((!req.body.id && !req.body.type) || (req.body.id && req.body.type)) {
            req.body.answeredQuestions = [];
            const total = await questionModule.counrRandomQuestions(req.body, false);
            // eslint-disable-next-line max-len
            const answeredQuestions = await answerModule.fetchForRandom(req.body, false, req.userData.id);
            answeredQuestions.map((Q) => {
                req.body.answeredQuestions.push(Q.question_id);
                return Q;
            });
            const questions = await questionModule.RandomQuestions(req.body, {
                id: { [Op.notIn]: req.body.answeredQuestions },
            }, total === answeredQuestions.length);
            return successResponce(req, res, 'Random 10 Question from portal Learning Portal', 202, { questions });
        }
        return errorResponce(req, res, 'Please provide both ID and Type or Not!', 403);
    }
}

export default RandomQuestions;
