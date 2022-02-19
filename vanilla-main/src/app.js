const API_URL = "http://127.0.0.1:5000/menu";

fetch(API_URL).then(function(response) {
	response.text().then(function(text) {
		console.log(text);
	})
})



demo = {
	"to": "Staffroom",
	"name": "ms teacher",
	"items": [
		{
			"id": 1,
			"size": 1,
			"count": 3
		},
		{
			"id": 2,
			"size": 0,
			"count": 6
		}
	]
}

function newOrder(order) {
	
}

newOrder(demo)
