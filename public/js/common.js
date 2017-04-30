/**
 * Created by ivan on 2/19/17.
 */

// get URL parameters
function urlParam(param) {
	var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
	if (results == null) {
		return null;
	} else {
		return results[1];
	}
}

function convertDate(dateToConvert) {

	var date = new Date(dateToConvert);

	var d = date.getDate();
	var m = date.getMonth() + 1;
	var y = date.getFullYear();

	return y + '-' + m + '-' + d;
}

function changeLanguage(referer) {

	var lang = $(referer).attr('data-lang');

	$.ajax({
		type: 'POST',
		url: '/change-language',
		data: {
			lang : lang
		},
		traditional: true,
		dataType: 'json',
		success: function(res) {
			if(res.status == '200') {
				location.reload();
			}
		}
	});
}