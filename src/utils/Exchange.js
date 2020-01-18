const { validationResult } = require('express-validator');

exports.validateRequest = async function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(200)
            .json({
                success: false,
                message: errors.array(),
                error_code: 403,
                data: {},
            })
            .end();
    }
    return next();
};


exports.successResponce = async function successResponce(
    req,
    res,
    message,
    successCode,
    payload,
) {
    return res
        .status(successCode)
        .json({
            success: true,
            message,
            data: payload,
        })
        .end();
};

exports.errorResponce = async function errorResponce(req, res, message, errorCode) {
    return res
        .status(errorCode)
        .json({
            success: true,
            message,
            errorCode,
            data: {},
        })
        .end();
};
