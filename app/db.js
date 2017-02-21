/**
 * Created by ivan on 2/20/17.
 */

/**
 * Set database credentials
 */
var mysql = require('mysql');

var pool = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'racuni'
});

module.exports = pool;