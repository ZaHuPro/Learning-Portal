import { Router } from 'express';

import HomeController from '../controllers/Home/Home';
import SampleController from '../controllers/Sample/Sample';


const router = Router();

router.get('/', HomeController.index);
router.get('/sample', SampleController.index);

export default router;
