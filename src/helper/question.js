import DB from '../providers/Database';
import Common from './commom';

class Questions {
    static async RandomQuestions({ id, type }) {
        const fetchData = {
            exist: false,
            type: false,
        };

        // switch (type) {
        // case 'exam':
        //     fetchData.gone = 'yes';
        //     fetchData.exist = await Common.isValidData(DB.models.Exam, id);
        // }

        if (type) {
            switch (type.toLowerCase()) {
            case 'exam':
                if (await Common.isValidData(DB.models.Exam, id)) {
                    fetchData.exist = true;
                    fetchData.type = DB.models.Exam;
                }
                break;
            case 'subject':
                if (await Common.isValidData(DB.models.QueSubjectstion, id)) {
                    fetchData.exist = true;
                    fetchData.type = DB.models.Subject;
                }
                break;
            case 'chapter':
                if (await Common.isValidData(DB.models.Chapter, id)) {
                    fetchData.exist = true;
                    fetchData.type = DB.models.Chapter;
                }
                break;
            case 'topic':
                if (await Common.isValidData(DB.models.Topic, id)) {
                    fetchData.exist = true;
                    fetchData.type = DB.models.Topic;
                }
                break;
            case 'question':
                if (await Common.isValidData(DB.models.Question, id)) {
                    fetchData.exist = true;
                    fetchData.type = DB.models.Question;
                }
                break;
            default:
                fetchData.exist = false;
                fetchData.type = false;
            }
        }
        if (id && !type) {

        }
        const quesryIs = {
            // order: [
            //     [DB.Sequelize.fn('RANDOM')],
            // ],
            limit: 10,
        };

        const getData = await DB.models.Question.findAll(quesryIs);
        return {
            getData,
        };
    }
}

export default Questions;
