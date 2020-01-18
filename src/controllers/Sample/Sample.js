import { successResponce } from '../../utils/Exchange';
import Refresh from '../../utils/Refresh';

class Sample {
    static async index(req, res) {
        await Refresh();
        return successResponce(req, res, 'You have reached Learning Portal', 202, {
            ip: req.requestIp.clientIp,
            user: req.header('User-Agent'),
        });
    }
}

export default Sample;
