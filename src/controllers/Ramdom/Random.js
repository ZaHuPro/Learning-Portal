import { successResponce } from '../../utils/Exchange';
import Questions from '../../helper/question';

class RandomQuestions {
    static async index(req, res) {
        req.params.id = req.params.id ? req.params.id : false;
        req.params.type = req.params.type ? req.params.type : false;
        const questions = await Questions.RandomQuestions(req.params);
        return successResponce(req, res, 'You have reached Learning Portal', 202, { questions, params: req.params });
    }
}

export default RandomQuestions;
