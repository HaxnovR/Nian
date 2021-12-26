const SimpleNodeLogger = require('simple-node-logger');
const opts = {
	errorEventName:'error',
        logDirectory:'./clientLogs/', 
        fileNamePattern:'roll-<DATE>.log',
        dateFormat:'YYYY.MM.DD'
};
const log = SimpleNodeLogger.createRollingFileLogger(opts);
log.setLevel('all');

module.exports = log;