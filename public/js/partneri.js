/**
 * Created by ivan on 2/18/17.
 */

$('document').ready(function() {
	$('.k-grid-createNew').on('click', function() {
		location.href = '/partner-novi';
	})
});

var grid = $("#partneriGrid").kendoGrid({
	toolbar: [{ name: "excel", text: "Sačuvaj kao Excel (.xlsx)"},{ name: "createNew", text: "<span class='glyphicon glyphicon-plus'></span>Novi Partner"}],
	excel: {
		fileName: "Partneri.xlsx",
		allPages: true
	},
	dataSource: {
		transport: {
			read: {
				url: "/api/partneri",
				dataType: "json"
			}
		},
		pageSize: 10,
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
		field: "naziv",
		template: "<a href='/partner-profil?id=#=id#'><span class='glyphicon glyphicon-pencil'></span></a>&nbsp;#=naziv#",
		title: "Naziv"
	},{
		width: 150,
		field: "korisnik",
		title: "korisnik"
	},{
		width: 80,
		field: "popust",
		title: "Popust"
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
	},{
		width: 150,
		field: "tekuci_racun",
		title: "Tekući račun"
	},{
		width: 70,
		field: "model",
		title: "Model"
	},{
		width: 200,
		field: "poziv_na_broj",
		title: "Poziv na broj"
	}]
}).data("kendoGrid");