/**
 * Created by ivan on 2/19/17.
 */

var popusti;
var statusi;

$.ajax({
	type: 'GET',
	url: '/api/popusti',
	dataType: 'json',
	success: function(res) {
		if (!$.isEmptyObject(res)) {
			popusti = res;
		}
	},
	error: function(err) {
		console.error(err);
	}
});

$.ajax({
	type: 'GET',
	url: '/api/statusi',
	dataType: 'json',
	success: function(res) {
		if (!$.isEmptyObject(res)) {
			statusi = res;
		}
	},
	error: function(err) {
		console.error(err);
	}
});

$('document').ready(function() {

	$('#createPartner').click(function() {

		var naziv = $('#naziv').val();
		var korisnik = $('#korisnik').val();
		var dan_izdavanja = $('#dan_izdavanja').val();
		var dan_valute = $('#dan_valute').val();
		var popust_id = $('#popust_id').val();
		var popust = $('#popust').val();
		var tekuci_racun = $('#tekuci_racun').val();
		var model = $('#model').val();
		var poziv_na_broj = $('#poziv_na_broj').val();

		$.ajax({
			type: 'POST',
			url: '/api/partneri/create/',
			data: {
				naziv : naziv,
				korisnik : korisnik,
				dan_izdavanja : dan_izdavanja,
				dan_valute : dan_valute,
				popust_id : popust_id,
				popust : popust,
				tekuci_racun : tekuci_racun,
				model : model,
				poziv_na_broj : poziv_na_broj
			},
			traditional: true,
			dataType: 'json',
			success: function(res) {
				console.log(res);
				if(res.serverStatus == '2') {
					location.href = '/partneri';
				}
			},
			error: function(err) {
				console.error(err);
			}
		});
	});
});