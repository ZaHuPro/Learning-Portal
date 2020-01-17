import { Router } from 'express';

import HomeController from '../controllers/Home/Home';

const router = Router();

router.get('/', HomeController.index);

export default router;
