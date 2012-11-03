if(process.env.NODE_ENV == 'production')
	module.exports = require('core/main-forever.js');
else if(process.env.NODE_ENV == 'testing')
	module.exports = require('core/main-unittest.js');
else
	module.exports = require('core/main-production.js');
	
