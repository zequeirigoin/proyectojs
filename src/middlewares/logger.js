const fs = require('fs');
const path = require('path');

function logger(req, res, next) {
  const logFile = path.join(__dirname, 'access.log');
  const logMessage = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  fs.appendFile(logFile, logMessage, (err) => {
    if (err) console.error(err);
  });
  next();
}

module.exports = logger;
