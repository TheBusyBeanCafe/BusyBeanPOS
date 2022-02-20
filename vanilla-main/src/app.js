const API_URL = "http://127.0.0.1:5000/menu";

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

var menu

async function getMenuItems(url) {
	const response = await fetch(url);
	menu = await response.json();

	displayData(menu);
}


function displayData(data) {
	var tab = '';
	
	data.forEach(function(element, index) { 
		console.log(element.id);
		console.log(element.short_name);

		tab += `
			<div class="grid-item">
				<button id="button${index}" type="button" onclick="orderCoffee(${index})">${element.short_name}</button>
			</div>
			`;	 
	})

	console.log(tab);
	setFunc = function() { document.getElementById("grid-container").innerHTML = tab; }
	if ( document.readyState == 'complete' ) {
		setFunc()
	} else {
		addEventListener("load", setFunc)
	}
}

let orderedCoffees = [];

getMenuItems(API_URL);

function updCurTransList() {
	var display = '';

	orderedCoffees.forEach(function(element) { 
		display += `
			<p>${menu[element].long_name}</p>
		`;
	})

	document.getElementById("order-list").innerHTML = display;
}

var modal

window.addEventListener("load", function(){ modal = document.getElementById("drink-options-modal") })

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function orderCoffee(idx) {
	item = menu[idx]
	console.log(item);

	console.log(item)
	if (item.is_drink) {
		modal.style.display = "block"
		ok = function(iidx) {
			modal.style.display = 'none'
			orderedCoffees.push(iidx);
			updCurTransList()
		}
		modal.innerHTML = `
			<div class="modal-content">
				${item.long_name}
				<div class="modal-buttons">
					<button onclick="modal.style.display = 'none'" type="button">Cancel</button>
					<button onclick="ok(${idx})" type="button">OK</button>
				</div>
			</div>
		`
	} else {
		orderedCoffees.push(idx);
		updCurTransList()
	}

}




