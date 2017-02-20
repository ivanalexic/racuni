/**
 * Created by ivan on 2/18/17.
 */

var express     = require('express');
var bodyParser  = require('body-parser');
var http        = require("http");
var uuid        = require("node-uuid");
var ejs         = require('ejs');

var app = express();
app.use(express.static('public'));

/**
 * Set the view engine to ejs
 */
app.set('view engine', 'ejs');

/**
 * bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
	extended: true
}));

/**
 * bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

/**
 * Load routes.js
 * Pass in app, pool, uuid
 */
require('./app/routes.js')(app, uuid);


/**
 * Start server on port 8080
 */
app.listen(8000);
console.log('Server running');
