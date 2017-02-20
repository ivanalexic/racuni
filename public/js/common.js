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