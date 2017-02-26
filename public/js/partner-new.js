/**
 * Created by ivan on 2/19/17.
 */

var discounts;
var statuses;

$.ajax({
	type: 'GET',
	url: '/api/discounts',
	dataType: 'json',
	success: function(res) {
		if (!$.isEmptyObject(res)) {
			discounts = res;
		}
	},
	error: function(err) {
		console.error(err);
	}
});

$.ajax({
	type: 'GET',
	url: '/api/statuses',
	dataType: 'json',
	success: function(res) {
		if (!$.isEmptyObject(res)) {
			statuses = res;
		}
	},
	error: function(err) {
		console.error(err);
	}
});

$('document').ready(function() {

	$('#createPartner').click(function() {

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
			url: '/api/partners/create/',
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
});