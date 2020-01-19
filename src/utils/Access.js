import validator from 'validator';
import jwt from 'jsonwebtoken';
import DB from '../providers/Database';
import { errorResponce } from './Exchange';
import Locals from '../providers/Locals';


async function checkTokem(authorization) {
    try {
        const token = authorization.split(' ')[1];

        if (!validator.isJWT(token)) {
            return {
                msg: 'Invalid JWT Token',
                success: false,
            };
        }
        const decoded = jwt.verify(token, Locals.config().appSecret);
        const tokenUser = await DB.models.User.findOne({
            where: {
                id: decoded.logger,
                email: decoded.email,
            },
            attributes: ['id', 'email'],
        });
        if (!tokenUser) {
            return {
                msg: 'No User found, Invalid JWT Token',
                success: false,
            };
        }
        return {
            success: true,
            id: decoded.logger,
            email: decoded.email,
        };
    } catch (error) {
        return {
            msg: 'Invalid JWT Token',
            success: false,
        };
    }
}


exports.shouldBeLoggedIn = async function shouldBeLoggedIn(req, res, next) {
    if (req.headers.authorization) {
        const deecodeToken = await checkTokem(req.headers.authorization);
        if (deecodeToken.success) {
            req.userData = {
                id: deecodeToken.id,
                email: deecodeToken.email,
            };
            return next();
        }
        return errorResponce(req, res, deecodeToken.msg, 403);
    }
    return errorResponce(req, res, 'JWT token not found, please add token in header (bearer token)', 403);
};

exports.mightBeLoggedIn = async function mightBeLoggedIn(req, res, next) {
    if (req.headers.authorization) {
        const deecodeToken = await checkTokem(req.headers.authorization);
        if (deecodeToken.success) {
            req.userData = {
                id: deecodeToken.id,
                email: deecodeToken.email,
            };
        }
        return next();
    }
    return next();
};

exports.shouldNotLoggedIn = async function shouldNotLoggedIn(req, res, next) {
    if (req.headers.authorization) {
        return errorResponce(req, res, 'JWT token already found in header!', 403);
    }
    return next();
};
