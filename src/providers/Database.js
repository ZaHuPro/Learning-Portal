/**
 * Define Database connection
 */

import path from 'path';
import fs from 'fs';
import Sequelize from 'sequelize';
import Log from '../middlewares/Log';
import Locals from './Locals';

export class Database {
    // Initialize database
    constructor() {
        this.models = {};
        this.syncModels();
    }

    init() {
        this.models.sequelize
            .sync()
            .then(() => {
                Log.info('Connected to DB server successfully');
            })
            .catch((error) => {
                Log.info(`Failed to connect to the DB server!! (${error})`);
                throw error;
            });
    }

    syncModels() {
        const db = {};
        const modelDirectory = path.join(Locals.config().root, '/src/models/');
        const sequelize = new Sequelize(Locals.config().mysqlDB);
        fs.readdirSync(modelDirectory)
            .filter((file) => (
                file.indexOf('.') !== 0
          && file.slice(-3) === '.js'
            ))
            .forEach((file) => {
                const model = sequelize.import(path.join(modelDirectory, file));
                db[path.parse(file).name] = model;
            });
        Object.keys(db).forEach((modelName) => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });
        db.Sequelize = Sequelize;
        db.sequelize = sequelize;
        this.models = db;
        Log.info('Models sync completed');
        return db;
    }
}

export default new Database();
