const API_URL = "http://127.0.0.1:5000/menu";

/*
fetch(API_URL).then(function(response) {
	response.text().then(function(text) {
		console.log(text);
	})
})
*/



async function getMenuItems(url) {
	const response = await fetch(url);
	var data = await response.json();
}
