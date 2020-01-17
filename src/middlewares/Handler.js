/**
 * Define the error & exception handlers
 *
 */

import Log from './Log';
import { errorResponce } from '../utils/Exchange';

class Handler {
    /**
   * Handles all the not found routes
   */
    static notFoundHandler(_express) {
        _express.use('*', (req, res) => {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            Log.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`);
            return errorResponce(req, res, 'API Not Found', 404);
        });

        return _express;
    }

    /**
   * Handles your api/web routes errors/exception
   */
    static clientErrorHandler(err, req, res, next) {
        Log.error(err.stack);
        if (req.xhr) {
            return errorResponce(req, res, 'Something went wrong!', 500);
        }
        return next(err);
    }

    /**
   * Show undermaintenance page incase of errors
   */
    static errorHandler(err, req, res) {
        Log.error(err.stack);
        return errorResponce(req, res, err.stack, 500);
    }

    /**
   * Register your error / exception monitoring
   * tools right here ie. before "next(err)"!
   */
    static logErrors(err, req, res, next) {
        Log.error(err.stack);
        return next(err);
    }
}

export default Handler;
