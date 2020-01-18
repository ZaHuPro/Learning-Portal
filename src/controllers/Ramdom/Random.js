import { successResponce } from '../../utils/Exchange';
import Questions from '../../helper/question';

class RandomQuestions {
    static async index(req, res) {
        req.body.id = req.body.id ? req.body.id : false;
        req.body.type = req.body.type ? req.body.type : false;
        const questions = await Questions.RandomQuestions(req.body);
        return successResponce(req, res, 'Random 10 Question from portal Learning Portal', 202, { questions });
    }
}

export default RandomQuestions;
