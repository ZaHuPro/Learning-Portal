/* eslint-disable no-console */
/**
 * Primary file for your Clustered API Server
 */

import express from 'express';

import Log from '../middlewares/Log';
import Locals from './Locals';
import Bootstrap from '../middlewares/Kernel';
import ExceptionHandler from '../middlewares/Handler';

class Express {
    /**
   * Initializes the express server
   */
    constructor() {
        this.express = express();
        this.mountMiddlewares();
    }

    /**
   * Mounts all the defined middlewares
   */
    mountMiddlewares() {
        this.express = Bootstrap.init(this.express);
    }

    /**
   * Starts the express server
   */
    init() {
        const { port } = Locals.config();

        // Registering Exception / Error Handlers
        this.express.use(ExceptionHandler.logErrors);
        this.express.use(ExceptionHandler.clientErrorHandler);
        this.express.use(ExceptionHandler.errorHandler);
        this.express = ExceptionHandler.notFoundHandler(this.express);

        // Start the server on the specified port
        this.express.listen(port, (_error) => {
            if (_error) {
                return console.log('Error: ', _error);
            }
            Log.info(`Server :: Running @ ${port}`);
            return console.log(
                '\x1b[33m%s\x1b[0m',
                `Server :: Running @ 'http://localhost:${port}'`,
            );
        });
    }
}

/** Export the express module */
export default new Express();
