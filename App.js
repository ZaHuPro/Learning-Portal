/**
 * Primary file for your Clustered API Server
 */

import * as path from 'path';
import * as dotenv from 'dotenv';
import Express from './Express';
import Database from './Database';
import Log from '../middlewares/Log';

class App {
	// Clear the console
	clearConsole () {
		process.stdout.write('\x1B[2J\x1B[0f');
    }
	
	// Loads your dotenv file
	loadConfiguration () {
		Log.info('Configuration :: Booting @ Master...');
		dotenv.config({ path: path.join(__dirname, '../../.env') });
	}

	// Loads the Database Pool
	loadDatabase () {
		Log.info('Database :: Booting @ Master...');
		Database.init();
	}

	// Loads your Server
	loadServer () {
		Log.info('Server :: Booting @ Master...');
		Express.init();
	}

}

export default new App;
