/**
 * Define App Locals & Configs
 */
import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
    static config() {
        dotenv.config({ path: path.join(__dirname, '../../.env') });
        const env = process.env.NODE_ENV || 'develoment';
        const port = process.env.PORT || 4040;
        const url = process.env.APP_URL || `http://localhost:${port}`;
        const root = path.join(__dirname, '../..');
        const appSecret = process.env.APP_SECRET || '1242#$%$^%!@@$!%*(%^jnadkjcn';
        const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
        const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || '5000';
        const mysqlDB = {
            username: process.env.DB_USERNAME || 'cube',
            password: process.env.DB_PASSWORD || 'square',
            database: process.env.DB_DATABASE || 'portal',
            host: process.env.DB_HOST || 'localhost',
            dialect: process.env.DB_DIALECT || 'mysql',
            logging:
        !process.env.DB_LOGGING || process.env.DB_LOGGING === 'false'
            ? false
            // eslint-disable-next-line no-console
            : console.log,
        };

        const name = process.env.APP_NAME || 'Learning Portal';
        const company = process.env.COMPANY_NAME || 'ZaHuPro@GitHub';
        const description = process.env.APP_DESCRIPTION || 'An assignment project based on adaptive learning portal';
        const isCORSEnabled = !(
            !process.env.CORS_ENABLED || process.env.CORS_ENABLED === 'false'
        );
        const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 3;

        return {
            env,
            appSecret,
            company,
            description,
            isCORSEnabled,
            jwtExpiresIn,
            maxUploadLimit,
            maxParameterLimit,
            mysqlDB,
            name,
            port,
            url,
            root,
        };
    }
}

export default Locals;
