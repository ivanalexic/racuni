/**
 * Created by ivan on 4/07/17.
 */

$('document').ready(function() {

	$('.kendoDatePicker').each(function(){
		$(this).kendoDatePicker({
			format:'dd.MM.yyyy',
			close: function() {
				$('#' + $(this)[0].element[0].id).parsley().validate();
			}
		});
	});

	$.get('/api/invoices/' + urlParam('id'), function(res) {

		var invoice = res[0];
		
		$('#partner_name').val(invoice.partner_id);
		$('#customer_name').val(invoice.customer_name);
		$('#invoice_number').val(invoice.invoice_number);
		$('#invoice_date').data('kendoDatePicker').value(invoice.invoice_date);
		$('#due_date').data('kendoDatePicker').value(invoice.due_date);
		$('#amount').val(invoice.amount);
		$('#discount_id').val(invoice.discount_id);
		$('#discount').val(invoice.discount);
		$('#discount_amount').val(invoice.discount_amount);
		$('#account_number').val(invoice.account_number);
		$('#model').val(invoice.model);
		$('#reference_number').val(invoice.reference_number);
	});

	$('#discount_id').change(function() {

		var discount_id = $(this).val();

		if(discount_id == 0) {
			$('#discount_box').prop('hidden', true);
		} else {
			$('#discount_box').prop('hidden', false);
		}
	});

	$('#amount, #discount_amount, #discount_id').change(function() {
		calculateAmounts();
	});

	$('#createInvoice').click(function() {

		$('#invoice-form').parsley().validate();

		if($('#invoice-form').parsley().isValid()) {

			var partner_id = $('#partner_name').val();
			var customer_name = $('#customer_name').val();
			var invoice_number = $('#invoice_number').val();
			var invoice_date = $('#invoice_date').data('kendoDatePicker').value();
			var due_date = $('#due_date').data('kendoDatePicker').value();
			var amount = $('#amount').val();
			var discount_id = $('#discount_id').val();
			var discount = $('#discount').val();
			var discount_amount = $('#discount_amount').val();
			var account_number = $('#account_number').val();
			var model = $('#model').val();
			var reference_number = $('#reference_number').val();

			$.ajax({
				type: 'POST',
				url: '/api/invoices/create/',
				data: {
					partner_id: partner_id,
					customer_name: customer_name,
					status_id: 0,
					invoice_number: invoice_number,
					invoice_date: convertDate(invoice_date),
					due_date: convertDate(due_date),
					amount: amount,
					discount_id: discount_id,
					discount: discount,
					discount_amount: discount_amount,
					account_number: account_number,
					model: model,
					reference_number: reference_number
				},
				traditional: true,
				dataType: 'json',
				success: function(res) {
					if(res.serverStatus == '2') {
						location.href = '/invoices-all';
					}
				},
				error: function(err) {
					console.error(err);
				}
			});

		}
	});
});

function calculateAmounts() {
	var amount = Number($('#amount').val());
	var discountAmount = Number($('#discount_amount').val());
	var discountId = $('#discount_id').val();
	var paymentAmount;

	switch(discountId) {
		case '0':
			discountAmount = 0;
			paymentAmount = amount;
			break;
		case '1':
			paymentAmount = amount - Math.ceil(amount * discountAmount / 100);
			break;
		case '2':
			paymentAmount = amount + discountAmount;
			break;
		case '3':
			paymentAmount = amount - discountAmount;
	}

	console.log(amount);
	console.log(discountAmount);
	console.log(paymentAmount);

	$('#amount').val(parseFloat(amount).toFixed(2));
	$('#discount_amount').val(parseFloat(discountAmount).toFixed(2));
	$('#payment_amount').val(parseFloat(paymentAmount).toFixed(2));
}