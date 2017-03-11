/**
 * Created by ivan on 2/18/17.
 */

var express         = require('express');
var bodyParser      = require('body-parser');
var ejs             = require('ejs');
var cookieParser    = require('cookie-parser');

var app = express();
app.use(cookieParser());
app.use(express.static('public'));

/**
 * Set the view engine to ejs
 */
app.set('view engine', 'ejs');

app.set('json spaces', 2);

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
 * Pass in app
 */
require('./app/routes.js')(app);


/**
 * Start server on port 8080
 */
app.listen(8080);
console.log('Server running');
