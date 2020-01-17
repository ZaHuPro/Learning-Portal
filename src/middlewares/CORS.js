/**
 * Enables the CORS
 */

import cors from 'cors';

import Log from './Log';
import Locals from '../providers/Locals';

class CORS {
    static mount(_express) {
    // Check if CORS is enabled
        if (Locals.config().isCORSEnabled) {
            Log.info("Booting the 'CORS' middleware...");
            _express.use(cors());
        }
        return _express;
    }
}

export default CORS;
