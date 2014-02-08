var settings = require('../dbSetting').setting;
var usergrid = require('usergrid');
module.exports = new usergrid.client(settings);
