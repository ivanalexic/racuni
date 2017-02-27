/**
 * Created by ivan on 2/19/17.
 */

module.exports = function(app, pool) {

	var uuid = require("node-uuid");


	/* PARTNERS */


	// ==== GET partners (:id optional) ==== //
	app.get('/api/partners/:id?', function(req, res) {

		var id = req.params.id;
		var query;
		if (typeof (id) !== 'undefined') {
			query = 'SELECT * FROM partners WHERE id = "' + id + '"' ;
		} else {
			query = 'SELECT * FROM partners';
		}

		pool.getConnection(function(err, connection) {

			connection.query(query, function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error while getting partners: %s ', err);
				} else {
					res.json(rows);
				}
			});

		});

	});

	// ======== create new partner ========= //
	app.post('/api/partners/create', function(req, res) {

		req.body.partner_id = uuid.v4();

		pool.getConnection(function(err, connection) {

			connection.query('INSERT INTO partners SET ?', req.body, function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error while creating partner: %s ', err);
				} else {
					res.send(rows);
					res.end();
				}
			});
		});

	});

	// ===== update existing partner ======= //
	app.post('/api/partners/:id/update', function(req, res) {

		pool.getConnection(function(err, connection) {

			connection.query('UPDATE partners SET ? WHERE id = ?', [req.body, req.params.id], function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error while updating partner: %s ', err);
				} else {
					res.send(rows);
					res.end();
				}
			});
		});

	});

	// ===== delete existing partner ======= //
	app.post('/api/partners/:id/delete', function(req, res) {

		pool.getConnection(function(err, connection) {

			connection.query('DELETE FROM partners WHERE id = ?', req.params.id, function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error while deleting partner: %s ', err);
				} else {
					res.send(rows);
					res.end();
				}
			});
		});

	});

	// ==== GET all invoices by partner id ==== //
	app.get('/api/partners/:id/invoices/all', function(req, res) {

		pool.getConnection(function(err, connection) {

			connection.query('SELECT * FROM invoices JOIN partners ON invoices.partner_id = partners.partner_id JOIN statuses ON invoices.status_id = statuses.status_id JOIN discounts ON invoices.discount_id = discounts.discount_id WHERE invoices.partner_id = "' + req.params.id + '"', function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error while getting invoices for partner: %s ', err);
				} else {
					res.json(rows);
				}
			});

		});

	});

	// ==== GET all unpaid invoices by partner id ==== //
	app.get('/api/partners/:id/invoices/unpaid/:filter', function(req, res) {

		var id = req.params.id;
		var filter = req.params.filter;
		var fromDate = req.query.fromDate;
		var toDate = req.query.toDate;
		var byDate = req.query.byDate;

		console.log('Getting ' + filter + ' unpaid invoices by ' + byDate + ' for partner_id=' + id + ' from ' + fromDate + ' to ' + toDate);

		var request = 'SELECT * FROM invoices ' +
			'JOIN partners ON invoices.partner_id = partners.partner_id ' +
			'JOIN statuses ON invoices.status_id = statuses.status_id ' +
			'JOIN discounts ON invoices.discount_id = discounts.discount_id ' +
			'WHERE invoices.partner_id = "' + id + '" ' +
			'AND (invoices.status_id = "0" OR invoices.status_id = "3") ';

		if (filter == 'due') {
			request += 'AND invoices.due_date >= "' + byDate + '" ';
		} else if (filter == 'overdue') {
			request += 'AND invoices.due_date < "' + byDate + '" ';
		}

		if (fromDate || toDate) {
			if (fromDate && !toDate) {
				request += 'AND invoices.invoice_date >= "' + fromDate + '"';
			} else if (!fromDate && toDate) {
				request += 'AND invoices.invoice_date <= "' + toDate + '"';
			} else {
				request += 'AND (invoices.invoice_date >= "' + fromDate + '" AND invoices.invoice_date <= "' + toDate + '")';
			}
		}

		console.log(request);

		pool.getConnection(function(err, connection) {

			connection.query(request, function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error while getting invoices for partner: %s ', err);
				} else {
					res.json(rows);
				}
			});

		});

	});

	// ==== GET all unpaid invoices due by partner id ==== //
	app.get('/api/partners/:id/invoices/due', function(req, res) {

		pool.getConnection(function(err, connection) {

			connection.query('SELECT * FROM invoices JOIN partners ON invoices.partner_id = partners.partner_id JOIN statuses ON invoices.status_id = statuses.status_id JOIN discounts ON invoices.discount_id = discounts.discount_id WHERE invoices.partner_id = "' + req.params.id + '"', function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error while getting invoices for partner: %s ', err);
				} else {
					res.json(rows);
				}
			});

		});

	});

	// ==== GET payments by partner id ==== //
	app.get('/api/partners/:id/payments', function(req, res) {

		pool.getConnection(function(err, connection) {

			connection.query('SELECT * FROM payments WHERE partner_id = "' + req.params.id + '"', function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error while getting payments for partner: %s ', err);
				} else {
					res.json(rows);
				}
			});

		});

	});


	/* INVOICES */


	// ==== GET invoices (:id optional) ==== //
	app.get('/api/invoices/:id?', function(req, res) {

		var id = req.params.id;
		var query;
		if (typeof (id) !== 'undefined') {
			query = 'SELECT * FROM invoices WHERE id = "' + id + '"' ;
		} else {
			query = 'SELECT * FROM invoices';
		}

		pool.getConnection(function(err, connection) {

			connection.query(query, function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error while getting invoice: %s ', err);
				} else {
					res.json(rows);
				}
			});

		});

	});

	// ======== create new partner ========= //
	app.post('/api/invoices/create', function(req, res) {

		req.body.invoice_id = uuid.v4();

		pool.getConnection(function(err, connection) {

			connection.query('INSERT INTO invoices SET ?', req.body, function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error while creating invoice: %s ', err);
				} else {
					res.send(rows);
					res.end();
				}
			});
		});

	});

	// ===== update existing invoice ======= //
	app.post('/api/invoices/:id/update', function(req, res) {

		pool.getConnection(function(err, connection) {

			connection.query('UPDATE invoice SET ? WHERE id = ?', [req.body, req.params.id], function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error while updating invoice: %s ', err);
				} else {
					res.send(rows);
					res.end();
				}
			});
		});

	});

	// ===== delete existing invoice ======= //
	app.post('/api/invoice/:id/delete', function(req, res) {

		pool.getConnection(function(err, connection) {

			connection.query('DELETE FROM invoice WHERE id = ?', req.params.id, function(err, rows) {
				connection.release();
				if (err) {
					console.log('Error while deleting invoice: %s ', err);
				} else {
					res.send(rows);
					res.end();
				}
			});
		});

	});


	/* payments */


	// ==== GET payments (:id optional) ==== //
	app.get('/api/payments/:id?/', function(req, res) {

		var id = req.params.id;
		var query;
		if (typeof (id) !== 'undefined') {
			query = 'SELECT * FROM payments WHERE id = "' + id + '"' ;
		} else {
			query = 'SELECT * FROM payments';
		}

		pool.getConnection(function(err, connection) {

			connection.query(query, function(err, rows) {
				connection.release();
				res.json(rows);
			});

		});

	});






	// =========== GET discounts ============= //
	app.get('/api/discounts', function(req, res) {

		pool.getConnection(function(err, connection) {
			connection.query('SELECT * FROM discounts', function(err, rows) {
				connection.release();
				res.json(rows);
			});
		});

	});

	// =========== GET statuses ============= //
	app.get('/api/statuses', function(req, res) {

		pool.getConnection(function(err, connection) {
			connection.query('SELECT * FROM statuses', function(err, rows) {
				connection.release();
				res.json(rows);
			});
		});

	});

};