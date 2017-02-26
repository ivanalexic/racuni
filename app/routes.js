/**
 * Created by ivan on 2/19/17.
 */

module.exports = function(app) {

	var pool = require('./db');

	// ============== /index =============== //
	app.get('/', function(req, res) {
		res.render('pages/home');
	});

	// ========= /invoices-unpaid ========= //
	app.get('/invoices-unpaid', function(req, res) {
		res.render('pages/invoices-unpaid', {unpaidInvoicesTab: true});
	});

	// ============ /invoices-all ============ //
	app.get('/invoices-all', function(req, res) {
		res.render('pages/invoices-all', {allInvoicesTab: true});
	});

	// ============ /reports ============= //
	app.get('/reports', function(req, res) {
		res.render('pages/reports', {reportsTab: true});
	});

	// ============ /partners ============== //
	app.get('/partners', function(req, res) {
		res.render('pages/partners', {partnersTab: true});
	});

	// ======= /partner-profile (?id) ======= //
	app.get('/partner-profile', function(req, res) {

		pool.getConnection(function(err, connection) {

			// get partner by id
			connection.query('SELECT * FROM partners where id = "' + req.query.id + '"', function(err, partners) {

				if (partners.length > 0) {
					// get discounts before page render
					connection.query('SELECT * FROM discounts', function(err, discounts) {
						// console.log(pool._freeConnections.indexOf(connection)); // check free connections
						connection.release();
						res.render('pages/partner-profile', {partnersTab: true, partner: partners[0], discounts: discounts});
					});
				} else {
					res.render('pages/error');
				}
			});
		});

	});

	// ========== /partner-new ============ //
	app.get('/partner-new', function(req, res) {

		pool.getConnection(function(err, connection) {
			// get discounts before page render
			connection.query('SELECT * FROM discounts', function(err, discounts) {
				connection.release();
				res.render('pages/partner-new', {partnersTab: true, discounts: discounts});
			});
		});

	});

	// ========== /debit-new ========== //
	app.get('/debit-new', function(req, res) {
		res.render('pages/debit-new');
	});

	/**
	 * Load api.js
	 * Pass in app, pool
	 */
	require('./api.js')(app, pool);
};