/**
 * Created by ivan on 2/26/17.
 */

var id = urlParam('id');

$('document').ready(function() {
	$('.k-grid-createNew').on('click', function() {
		console.log('click');
		location.href = '/invoice-new';
	})
});

var grid = $("#invoicesGrid").kendoGrid({
	toolbar: [{ name: "excel", text: export_excel + " (.xlsx)"},{ name: "createNew", text: "<span class='glyphicon glyphicon-plus'></span>" + new_invoice}],
	excel: {
		fileName: "Racuni.xlsx",
		allPages: true
	},
	dataSource: {
		transport: {
			read: {
				url: "/api/partners/" + id + "/invoices/all",
				dataType: "json"
			}
		},
		pageSize: 15,
		sort: {
			field: "partner_name",
			dir: "asc"
		},
		schema: {
			model: {
				fields: {
					created_at: {
						type: "date",
						parse: function(value) {
							if(value) {
								return new Date(value);
							}
						}
					},
					updated_at: {
						type: "date",
						parse: function(value) {
							if(value) {
								return new Date(value);
							}
						}
					},
					invoice_date: {
						type: "date",
						parse: function(value) {
							if(value) {
								return new Date(value);
							}
						}
					},
					due_date: {
						type: "date",
						parse: function(value) {
							if(value) {
								return new Date(value);
							}
						}
					}
				}
			}
		}
	},
	sortable: true,
	pageable: true,
	reorderable: true,
	resizable: true,
	columns: [{
		width: 150,
		field: "partner_name",
		template: "<a href='/invoice-edit?id=#=invoice_id#' title='Izmeniti'><span class='glyphicon glyphicon-pencil'></span></a>&nbsp;#=partner_name#",
		title: "Partner"
	},{
		width: 80,
		field: "invoice_number",
		title: "Broj računa"
	},{
		width: 120,
		field: "status",
		title: "Status"
	},{
		width: 80,
		field: "invoice_date",
		format: "{0:dd.MM.yyyy.}",
		title: "Izdat"
	},{
		width: 80,
		field: "due_date",
		format: "{0:dd.MM.yyyy.}",
		title: "Valuta"
	},{
		width: 80,
		field: "amount",
		format: "{0:0.00}",
		attributes: {"class" : "text-right"},
		title: "Iznos"
	},{
		width: 50,
		field: "discount",
		attributes: {"class" : "text-right"},
		title: "Pop."
	},{
		width: 80,
		field: "discount_amount",
		format: "{0:0.00}",
		attributes: {"class" : "text-right"},
		title: "Iznos pop."
	},{
		width: 150,
		field: "account_number",
		title: "Tekući račun"
	},{
		width: 50,
		field: "model",
		title: "Model"
	},{
		width: 200,
		field: "reference_number",
		title: "Poziv na broj"
	}]
}).data("kendoGrid");