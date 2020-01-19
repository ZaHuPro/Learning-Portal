import { successResponce } from '../../utils/Exchange';
import SampleInsert from '../../utils/SampleInsert';

class Sample {
    static async index(req, res) {
        await SampleInsert();
        return successResponce(req, res, 'Sample data updated to Learning Portal', 202, {});
    }
}

export default Sample;
