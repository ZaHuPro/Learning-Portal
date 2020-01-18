import MD5 from 'md5';
import jwt from 'jsonwebtoken';

import commonModule from './commom';
import Locals from '../providers/Locals';


class AuthyModule {
    static async createHash(_password) {
        const salt = await commonModule.randomGenerator(10);
        return {
            salt,
            password: await MD5(MD5(_password) + salt),
        };
    }

    static async verifyHash(hash, password, salt) {
        return await MD5(MD5(password) + salt) === hash;
    }

    static async createLoginToken(req, userID) {
        const PayLoad = {
            ip: req.requestIp.clientIp,
            logger: userID,
            email: req.body.email,
        };
        const hashkey = await jwt.sign(PayLoad, Locals.config().appSecret, {
            expiresIn: '1d',
        });
        return hashkey;
    }
}

export default AuthyModule;
