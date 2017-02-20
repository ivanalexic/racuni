/**
 * Created by ivan on 2/20/17.
 */

$('document').ready(function() {
	$('.k-grid-createNew').on('click', function() {
		location.href = '/novo-zaduzenje';
	})
});

var grid = $("#neplaceniRacuniGrid").kendoGrid({
	toolbar: [{ name: "excel", text: "Sačuvaj kao Excel (.xlsx)"},{ name: "createNew", text: "<span class='glyphicon glyphicon-plus'></span>Novo zaduženje"}],
	excel: {
		fileName: "Neplaceni racuni.xlsx",
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
	columns: []
}).data("kendoGrid");