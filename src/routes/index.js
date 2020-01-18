/* eslint-disable import/named */
import { Router } from 'express';

import { registerRules, loginRules } from '../utils/Validator';
import { validateRequest } from '../utils/Exchange';
import { shouldBeLoggedIn, mightBeLoggedIn, shouldNotLoggedIn } from '../utils/Access';
import homeController from '../controllers/Home/Home';
import authyController from '../controllers/Auth/Auth';
import sampleController from '../controllers/Sample/Sample';
import randomController from '../controllers/Ramdom/Random';
import answerController from '../controllers/Answer/Answer';

const router = Router();

router.get('/', mightBeLoggedIn, homeController.index);
router.get('/sample', sampleController.index);

router.post('/register', [shouldNotLoggedIn, registerRules, validateRequest, authyController.register]);
router.post('/login', [shouldNotLoggedIn, loginRules, validateRequest, authyController.login]);


router.post('/questions', shouldBeLoggedIn, randomController.index);
router.post('/answer', shouldBeLoggedIn, answerController.index);
router.post('/result', shouldBeLoggedIn, answerController.result);


export default router;
