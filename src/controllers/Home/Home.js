import { successResponce } from '../../utils/Exchange';

class Home {
    static async index(req, res) {
        return successResponce(req, res, 'You have reached Learning Portal', 202, {
            ip: req.requestIp.clientIp,
            user: req.header('User-Agent'),
        });
    }
}

export default Home;
