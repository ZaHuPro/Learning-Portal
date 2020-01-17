import Log from '../middlewares/Log';

import rootRouter from '../routes/index';

class Routes {
    static mountWeb(_express) {
        Log.info('Routes :: Mounting Web Routes...');
        return _express.use('/', rootRouter);
    }
}

export default Routes;
