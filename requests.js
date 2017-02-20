app.get("/api/partneri",function(req, res){

	var query;
	if (!req.query.id) {
		query = 'SELECT * FROM `partneri`';
	} else {
		query = 'SELECT * FROM `partneri` where id = `' + req.query.id + '`' ;
	}

	pool.getConnection(function(err, connection) {
		connection.query(query, function(err, rows) {
			res.json(rows);
			connection.release();
			//console.log(pool._freeConnections.indexOf(connection));
		});
	});

});