var log4js = require("log4js");
log4js.configure({
  appenders: {
    out: { type: 'console' },
    app: { type: 'file', filename: 'logs/access.log',maxLogSize: 1024*100, backups:4  }
  },
  categories: {
    default: { appenders: [ 'out', 'app' ], level: 'debug' }
  }
});
logger = log4js.getLogger("normal");
module.exports = logger
