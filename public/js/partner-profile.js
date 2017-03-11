/**
 * Created by ivan on 2/18/17.
 */

var id = urlParam('id');
var deleteConfirmed = false;

$('document').ready(function() {

	$('#updatePartner').click(function() {

		var partner_name = $('#partner_name').val();
		var customer_name = $('#customer_name').val();
		var issue_day = $('#issue_day').val();
		var due_day = $('#due_day').val();
		var discount_id = $('#discount_id').val();
		var discount = $('#discount').val();
		var account_number = $('#account_number').val();
		var model = $('#model').val();
		var reference_number = $('#reference_number').val();

		$.ajax({
			type: 'POST',
			url: '/api/partners/' + id + '/update',
			data: {
				partner_name : partner_name,
				customer_name : customer_name,
				issue_day : issue_day,
				due_day : due_day,
				discount_id : discount_id,
				discount : discount,
				account_number : account_number,
				model : model,
				reference_number : reference_number
			},
			traditional: true,
			dataType: 'json',
			success: function(res) {
				console.log(res);
				if(res.serverStatus == '2') {
					location.href = '/partners';
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
		url: '/api/partners/' + id + '/delete',
		traditional: true,
		dataType: 'json',
		success: function(res) {
			if(res.serverStatus == '2') {
				location.href = '/partners';
			}
		},
		error: function(err) {
			console.error(err);
		}
	});
}