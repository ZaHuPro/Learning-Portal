import { successResponce, errorResponce } from '../../utils/Exchange';
import userModule from '../../helper/user';
import AuthyModule from '../../helper/authy';

class Authy {
    static async register(req, res) {
        const created = await userModule.createUser(req.body, req.requestIp);
        if (created && created.id) {
            const hashkey = await AuthyModule.createLoginToken(req, created.id);
            return successResponce(req, res, 'User registered successfully!', 202, { id: created.id, email: req.body.email, token: hashkey });
        }
        return errorResponce(req, res, 'Unable to register new user!', 500);
    }

    static async login(req, res) {
        const userIs = await userModule.findOneByEmail(req.body.email);
        if (await AuthyModule.verifyHash(userIs.password, req.body.password, userIs.salt)) {
            const userData = await userModule.resUserData(userIs.id);
            userData.token = await AuthyModule.createLoginToken(req, userIs.id);
            return successResponce(req, res, 'User logged in successfully!', 202, userData);
        }
        return errorResponce(req, res, 'Unable to login this user!', 500);
    }
}

export default Authy;
