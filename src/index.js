/**
 * Bootstrap your App
 *
 */

import App from './providers/App';
/*
 * clear Console
 */
App.clearConsole();

/*
 * Load Configuration
 */
App.loadConfiguration();

/*
* Run the Database pool
*/
App.loadDatabase();

/**
 * Run the Server
 */
App.loadServer();
