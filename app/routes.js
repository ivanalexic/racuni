/**
 * Created by ivan on 2/19/17.
 */

module.exports = function(app, uuid) {

	var pool = require('./db');

	// ============== /index =============== //
	app.get('/', function(req, res) {
		res.render('pages/home');
	});

	// ========= /racuni-neplaceni ========= //
	app.get('/racuni-neplaceni', function(req, res) {
		res.render('pages/racuni-neplaceni', {neplaceniRacuniTab: true});
	});

	// ============ /racuni-svi ============ //
	app.get('/racuni-svi', function(req, res) {
		res.render('pages/racuni-svi', {sviRacuniTab: true});
	});

	// ============ /izvestaji ============= //
	app.get('/izvestaji', function(req, res) {
		res.render('pages/izvestaji', {izvestajiTab: true});
	});

	// ============ /partneri ============== //
	app.get('/partneri', function(req, res) {
		res.render('pages/partneri', {partneriTab: true});
	});

	// ======= /partner-profil (?id) ======= //
	app.get('/partner-profil', function(req, res) {

		pool.getConnection(function(err, connection) {

			// get partner by id
			connection.query('SELECT * FROM partneri where id = "' + req.query.id + '"', function(err, partneri) {

				if (partneri.length > 0) {
					// get popusti before page render
					connection.query('SELECT * FROM popusti', function(err, popusti) {
						// console.log(pool._freeConnections.indexOf(connection)); // check free connections
						connection.release();
						res.render('pages/partner-profil', {partneriTab: true, partner: partneri[0], popusti: popusti});
					});
				} else {
					res.render('pages/error');
				}
			});
		});

	});

	// ========== /partner-novi ============ //
	app.get('/partner-novi', function(req, res) {

		pool.getConnection(function(err, connection) {
			// get popusti before page render
			connection.query('SELECT * FROM popusti', function(err, popusti) {
				connection.release();
				res.render('pages/partner-novi', {partneriTab: true, popusti: popusti});
			});
		});

	});

	// ========== /zaduzenje-novo ========== //
	app.get('/zaduzenje-novo', function(req, res) {
		res.render('pages/zaduzenje-novo');
	});

	/**
	 * Load app.js
	 * Pass in app, pool, uuid
	 */
	require('./api.js')(app, pool, uuid);
};