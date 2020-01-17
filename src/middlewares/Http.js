/**
 * Defines all the requisites in HTTP
 */

import compress from 'compression';
import express from 'express';
import userAgent from 'express-useragent';
import ipware from 'ipware';
import Log from './Log';
import Locals from '../providers/Locals';

class Http {
    static mount(_express) {
        Log.info('Booting the \'HTTP\' middleware...');

        // Enables the request body parser
        _express.use(express.json({
            limit: Locals.config().maxUploadLimit,
        }));

        _express.use(express.urlencoded({
            limit: Locals.config().maxUploadLimit,
            parameterLimit: Locals.config().maxParameterLimit,
            extended: false,
        }));

        // Disable the x-powered-by header in response
        _express.disable('x-powered-by');

        // API requesed details in request
        _express.use(userAgent.express());

        // Enables the "gzip" / "deflate" compression for response
        _express.use(compress());

        // Client IP Address in request
        _express.use((req, res, next) => {
            // eslint-disable-next-line camelcase
            const { get_ip } = ipware();
            req.requestIp = get_ip(req);
            next();
        });

        return _express;
    }
}

export default Http;
