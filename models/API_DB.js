
var usergrid = require('usergrid');
var settings = {
	orgName:'francismengx',
	appName:'partyhub',
	authType:usergrid.AUTH_CLIENT_ID,
	clientId:'b3U6q4-B-pDrEeOSqwdwoWza0g',
	clientSecret:'b3U6o59o8zH6wfvSiPyZaG25C1MQE90',
	logging: true, //optional - turn on logging, off by default
	buildCurl: false //optional - turn on curl commands, off by default
};
var client = new usergrid.client(settings);
module.exports = client;