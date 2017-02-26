/**
 * Created by ivan on 2/18/17.
 */

$('document').ready(function() {
	$('.k-grid-createNew').on('click', function() {
		location.href = '/partner-new';
	})
});

var grid = $("#partnersGrid").kendoGrid({
	toolbar: [{ name: "excel", text: "Sačuvaj kao Excel (.xlsx)"},{ name: "createNew", text: "<span class='glyphicon glyphicon-plus'></span>Novi Partner"}],
	excel: {
		fileName: "Partneri.xlsx",
		allPages: true
	},
	dataSource: {
		transport: {
			read: {
				url: "/api/partners",
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
		template: "<a href='/partner-profile?id=#=id#' title='Izmeniti'><span class='glyphicon glyphicon-pencil'></span></a>&nbsp;#=partner_name#",
		title: "Naziv"
	},{
		width: 150,
		field: "customer_name",
		title: "Korisnik"
	},{
		width: 80,
		field: "discount",
		title: "Popust"
	},{
		width: 150,
		field: "account_number",
		title: "Tekući račun"
	},{
		width: 70,
		field: "model",
		title: "Model"
	},{
		width: 200,
		field: "reference_number",
		title: "Poziv na broj"
	},{
		width: 80,
		field: "created_at",
		format: "{0:dd.MM.yyyy.}",
		title: "Kreiran"
	},{
		width: 80,
		field: "updated_at",
		format: "{0:dd.MM.yyyy.}",
		title: "Izmenjen"
	}]
}).data("kendoGrid");