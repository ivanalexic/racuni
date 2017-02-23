/**
 * Created by ivan on 2/18/17.
 */

var id = urlParam('id');
var deleteConfirmed = false;

$('document').ready(function() {

	$('#updatePartner').click(function() {

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
			url: '/api/partneri/update/' + id,
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

	$('#confirm').click(function() {
		deleteConfirmed = true;
	});

	$('#confirmDeleteModal').on('hidden.bs.modal', function () {
		if (deleteConfirmed == true) {
			deletePartner();
		}
	});
});

function deletePartner() {
	$.ajax({
		type: 'POST',
		url: '/api/partneri/delete/' + id,
		traditional: true,
		dataType: 'json',
		success: function(res) {
			if(res.serverStatus == '2') {
				location.href = '/partneri';
			}
		},
		error: function(err) {
			console.error(err);
		}
	});
}