const winston = require('winston');

// create instance
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ level: 'info' }), // in console 
        new winston.transports.File({ filename: 'combinedLogs.log', level: 'verbose', }), // a new file with all the other erros higher than info
    ]
});

module.exports = logger;
