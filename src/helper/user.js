
import DB from '../providers/Database';
import AuthyModule from './authy';

class UserModule {
    static async countByEmail(_email) {
        const returnData = await DB.models.User.count({
            where: {
                email: _email,
            },
        }) > 0;
        return returnData;
    }

    static async findOneByEmail(_email) {
        const returnData = await DB.models.User.findOne({
            where: {
                email: _email,
            },
        }).then((userIs) => (userIs.id ? userIs : {}));
        return returnData;
    }

    static async resUserData(_id) {
        const returnData = await DB.models.User.findOne({
            where: {
                id: _id,
            },
            attributes: ['id', 'email'],
        }).then((userIs) => (userIs.id ? userIs.dataValues : {}));
        return returnData;
    }

    static async createUser({ email, password }, requestIp) {
        const hashed = await AuthyModule.createHash(password);
        const returnData = await DB.models.User.create({
            email, password: hashed.password, salt: hashed.salt, joined_ip: requestIp.clientIp,
        });
        return returnData;
    }
}

export default UserModule;
