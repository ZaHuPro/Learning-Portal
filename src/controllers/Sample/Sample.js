import { successResponce } from '../../utils/Exchange';
import Refresh from '../../utils/SampleInsert';

class Sample {
    static async index(req, res) {
        await Refresh();
        return successResponce(req, res, 'Sample data updated to Learning Portal', 202, {});
    }
}

export default Sample;
