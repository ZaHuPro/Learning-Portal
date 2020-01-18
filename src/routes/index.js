/* eslint-disable import/named */
import { Router } from 'express';

import { registerRules, loginRules } from '../utils/Validator';
import { validateRequest } from '../utils/Exchange';
import { shouldBeLoggedIn, mightBeLoggedIn, shouldNotLoggedIn } from '../utils/Access';
import HomeController from '../controllers/Home/Home';
import AuthyController from '../controllers/Auth/Auth';
import SampleController from '../controllers/Sample/Sample';
import randomController from '../controllers/Ramdom/Random';


const router = Router();

router.get('/', mightBeLoggedIn, HomeController.index);
router.get('/sample', SampleController.index);

router.post('/register', [shouldNotLoggedIn, registerRules, validateRequest, AuthyController.register]);
router.post('/login', [shouldNotLoggedIn, loginRules, validateRequest, AuthyController.login]);


router.get(['/questions', '/questions/:type/:id', '/questions/:id'], shouldBeLoggedIn, randomController.index);
// router.get('/answer/:id', answerController.index);


export default router;
