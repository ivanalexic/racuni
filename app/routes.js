/**
 * Created by ivan on 2/19/17.
 */

module.exports = function(app) {

	var pool = require('./db');

	var lang;
	var lang_en = require('../locales/en.json');
	var lang_rs = require('../locales/rs.json');

	app.all('*', function(req, res, next) {

		var langParam = req.query.lang;

		if (typeof(langParam) == 'undefined') {

			var storedLang = req.cookies['BILLS_LANG'];

			if (typeof(storedLang) !== 'undefined') {
				langParam = storedLang;
			} else {
				langParam = 'rs';
				res.cookie('BILLS_LANG', langParam, { maxAge: 2592000000, httpOnly: true });
			}
		} else {
			res.cookie('BILLS_LANG', langParam, { maxAge: 2592000000, httpOnly: true });
		}

		switch (langParam) {
			case 'rs':
				lang = lang_rs;
				break;
			case 'en':
				lang = lang_en;
				break;
			default:
				lang = lang_rs;
		}

		res.locals.lang = lang;
		res.locals.langParam = langParam;
		next();
	});

	// ========== /changeLanguage ========== //
	app.post('/change-language', function(req, res) {
		res.cookie('BILLS_LANG', req.body.lang, { maxAge: 2592000000, httpOnly: true });
		res.end('{"success" : "Updated Successfully", "status" : 200}');
		//res.redirect(req.get('referer'));
	});

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

	// ============= /invoice-new ============ //
	app.get('/invoice-new', function(req, res) {

		pool.getConnection(function(err, connection) {
			// get partners before page render
			connection.query('SELECT * FROM partners', function(err, partners) {
				// get discounts before page render
				connection.query('SELECT * FROM discounts', function(err, discounts) {
					connection.release();
					res.render('pages/invoice-new', {allInvoicesTab: true, partners: partners, discounts: discounts});
				});
			});
		});

	});

	// ========= /invoice-view ========= //
	app.get('/invoice', function(req, res) {

		pool.getConnection(function(err, connection) {
			// get partners before page render
			connection.query('SELECT * FROM partners', function(err, partners) {
				// get discounts before page render
				connection.query('SELECT * FROM discounts', function(err, discounts) {
					connection.release();
					res.render('pages/invoice', {partners: partners, discounts: discounts});
				});
			});
		});

	});

	// ========= /invoice-pay ========= //
	app.get('/invoice-pay', function(req, res) {
		res.render('pages/invoice-pay');
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
			connection.query('SELECT * FROM partners where partner_id = "' + req.query.id + '"', function(err, partners) {

				console.log(partners);
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