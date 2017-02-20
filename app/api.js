/**
 * Created by ivan on 2/19/17.
 */

module.exports = function(app, pool, uuid) {

	// ==== GET partneri (:id optional) ==== //
	app.get('/api/partneri/:id?', function(req, res) {

		var query;
		if (typeof (id) !== 'undefined') {
			query = 'SELECT * FROM partneri WHERE id = "' + req.params.id + '"' ;
		} else {
			query = 'SELECT * FROM partneri';
		}

		pool.getConnection(function(err, connection) {

			connection.query(query, function(err, rows) {
				connection.release();
				res.json(rows);
			});

		});

	});

	// ======== create new partner ========= //
	app.post('/api/partneri/create', function(req, res) {

		req.body.id = uuid.v4();

		pool.getConnection(function(err, connection) {

			var data = {
				id: uuid.v4(),
				naziv : req.body.naziv,
				korisnik : req.body.korisnik,
				dan_izdavanja : req.body.dan_izdavanja,
				dan_valute : req.body.dan_valute,
				popust_id : req.body.popust_id,
				popust : req.body.popust,
				tekuci_racun : req.body.tekuci_racun,
				model : req.body.model,
				poziv_na_broj : req.body.poziv_na_broj,
				ponavljanje : req.body.ponavljanje
			};

			console.log(req.body);

			connection.query('INSERT INTO partneri SET ?', req.body, function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error Updating : %s ', err);
				} else {
					res.json(rows);
					res.end();
				}
			});
		});

	});

	// ===== update existing partner ======= //
	app.post('/api/partneri/update/:id', function(req, res) {

		pool.getConnection(function(err, connection) {

			var data = {
				naziv : req.body.naziv,
				korisnik : req.body.korisnik,
				dan_izdavanja : req.body.dan_izdavanja,
				dan_valute : req.body.dan_valute,
				popust_id : req.body.popust_id,
				popust : req.body.popust,
				tekuci_racun : req.body.tekuci_racun,
				model : req.body.model,
				poziv_na_broj : req.body.poziv_na_broj,
				ponavljanje : req.body.ponavljanje
			};

			connection.query('UPDATE partneri SET ? WHERE id = ?', [req.body, req.params.id], function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error Updating : %s ', err);
				} else {
					res.send(rows);
					res.end();
				}
			});
		});

	});

	// ===== delete existing partner ======= //
	app.post('/api/partneri/delete/:id', function(req, res) {

		pool.getConnection(function(err, connection) {

			connection.query('DELETE FROM partneri WHERE id = ?', req.params.id, function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error Updating : %s ', err);
				} else {
					res.send(rows);
					res.end();
				}
			});
		});

	});

	// =========== GET popusti ============= //
	app.get('/api/popusti', function(req, res) {

		pool.getConnection(function(err, connection) {
			connection.query('SELECT * FROM popusti', function(err, rows) {
				connection.release();
				res.json(rows);
			});
		});

	});

	// =========== GET statusi ============= //
	app.get('/api/statusi', function(req, res) {

		pool.getConnection(function(err, connection) {
			connection.query('SELECT * FROM statusi', function(err, rows) {
				connection.release();
				res.json(rows);
			});
		});

	});

};