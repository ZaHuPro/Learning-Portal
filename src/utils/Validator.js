import { check, body } from 'express-validator';
import userModule from '../helper/user';
import questionModule from '../helper/question';

const isEmail = check('email')
    .isEmail()
    .withMessage('Provied a valid Email ID!');

const isPassword = check('password')
    .isLength({ min: 8 })
    .withMessage('Provide a valid Password with min 8 letters');

const isEmailTaken = body('email').custom(async (value, { req }) => {
    if (await userModule.countByEmail(req.body.email)) {
        throw new Error('This Email ID is already registered, Try to Login!');
    }
    return true;
});

const isEmailExist = body('email').custom(async (value, { req }) => {
    if (!await userModule.countByEmail(req.body.email)) {
        throw new Error('This Email ID is not registered yet, Try to Register!');
    }
    return true;
});


const isUUID = check('id')
    .isUUID()
    .optional()
    .withMessage('Provied a valid UUID ID!');

const isValidType = check('type')
    .isIn(['exam', 'subject', 'topic', 'chapter', 'question'])
    .optional()
    .withMessage('Provied a valid type!, must be exam, subject, topic, chapter or question');

const isAnswer = check('answer')
    .isIn(['a', 'b', 'c', 'd', 'skip'])
    .withMessage('Provied a valid answer!, must be a, b, c, d or skip');


const isUUIDMust = check('id')
    .isUUID()
    .withMessage('Provied a valid UUID ID!');


const isQuestionExist = body('id').custom(async (value, { req }) => {
    if (await questionModule.fetchQuestionCount({
        where: {
            id: req.body.id,
        },
    }) === 0) {
        throw new Error('This Question ID not fount in DB');
    }
    return true;
});
export const registerRules = [isEmail, isPassword, isEmailTaken];
export const loginRules = [isEmail, isPassword, isEmailExist];
export const questionRules = [isUUID, isValidType];
export const answerRules = [isAnswer, isUUIDMust, isQuestionExist];
