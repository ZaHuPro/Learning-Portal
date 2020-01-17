import * as path from 'path';
import * as dotenv from 'dotenv';
import Log from '../middlewares/Log';

class App {
    // Clear the console
    static clearConsole() {
        process.stdout.write('\x1B[2J\x1B[0f');
    }

    // Loads your dotenv file
    static loadConfiguration() {
        Log.info('Configuration :: Booting');
        dotenv.config({ path: path.join(__dirname, '../../.env') });
        // eslint-disable-next-line no-console
        console.log('I came here');
    }
}

export default App;
