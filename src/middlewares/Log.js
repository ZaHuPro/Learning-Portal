/* eslint-disable no-console */
/**
 * Creates & maintains the log
 */

import * as fs from 'fs';
import * as path from 'path';

class Log {
    constructor() {
        this.today = new Date();
        const dateString = `${this.today.getFullYear()}-${this.today.getMonth()
      + 1}-${this.today.getDate()}`;
        const timeString = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`;
        this.baseDir = path.join(__dirname, '../../logs/');
        this.fileName = `${dateString}.log`;
        this.linePrefix = `[${dateString} ${timeString}]`;
    }

    // Adds INFO prefix string to the log string
    info(_string) {
        return this.addLog('INFO', _string);
    }

    // Adds WARN prefix string to the log string
    warn(_string) {
        return this.addLog('WARN', _string);
    }

    // Adds ERROR prefix string to the log string
    error(_string) {
    // Line break and show the first line
        console.log('\x1b[31m%s\x1b[0m', `[ERROR] :: ${_string.split(/r?\n/)[0]}`);
        return this.addLog('ERROR', _string);
    }

    // Adds the custom prefix string to the log string
    custom(_filename, _string) {
        return this.addLog(_filename, _string);
    }

    /**
   * Creates the file if does not exist, and
   * append the log kind & string into the file.
   */
    addLog(kindIs, _string) {
        const that = this;
        const kind = kindIs.toUpperCase();

        fs.open(
            `${that.baseDir}${that.fileName}`,
            'a',
            (_err, _fileDescriptor) => {
                if (!_err && _fileDescriptor) {
                    // Append to file and close it
                    return fs.appendFile(
                        _fileDescriptor,
                        `${that.linePrefix} [${kind}] ${_string}\n`,
                        (error) => {
                            if (!error) {
                                return fs.close(_fileDescriptor, (_error) => {
                                    if (!_error) {
                                        return true;
                                    }
                                    return console.log(
                                        '\x1b[31m%s\x1b[0m',
                                        'Error closing log file that was being appended',
                                    );
                                });
                            }
                            return console.log(
                                '\x1b[31m%s\x1b[0m',
                                'Error appending to the log file',
                            );
                        },
                    );
                }
                return console.log(
                    '\x1b[31m%s\x1b[0m',
                    "Error cloudn't open the log file for appending",
                );
            },
        );
    }
}

export default new Log();
