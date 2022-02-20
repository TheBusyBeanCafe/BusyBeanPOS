const API_URL = "http://127.0.0.1:5000/";

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
var drink_addons

async function getMenuItems(url) {
	const response = await fetch(url);
	json = await response.json();
	menu = json["menu"]
	drink_addons = json["drink_addons"]

	displayData(menu);
}


function displayData(data) {
	var tab = '';
	
	data.forEach(function(element, index) { 

		tab += `
			<div class="grid-item">
				<button id="button${index}" type="button" onclick="addCoffee(${index})">${element.short_name}</button>
			</div>
			`;	 
	})

	setFunc = function() { document.getElementById("grid-container").innerHTML = tab; }
	if ( document.readyState == 'complete' ) {
		setFunc()
	} else {
		addEventListener("load", setFunc)
	}
}

let orderedCoffees = [];

getMenuItems(API_URL + "menu");

function updCurTransList() {
	document.getElementById("inc-orders-parent").style.display = "none"
	document.getElementById("cur-trans-parent").style.display = "flex"

	var display = '';
	var total = 0;

	orderedCoffees.forEach(function(element) { 
		display += `
			<p>${menu[element.index].long_name}</p>
		`;

		subtotal = menu[element.index].price
		if (menu[element.index].is_drink) {
			if (element.large) {
				subtotal += 0.5
			}
			element.addons.forEach(function(el, index) {
				addon = drink_addons[index]
				switch (addon.type) {
					case "choice":
						subtotal += addon.choices[el].cost
						break;
					case "count":
						console.log(addon)
						el.forEach(function(count, idx) {
							subtotal += (count * addon.choices[idx].cost)
						})
						break;
				}
			})
		}
		total += (subtotal * element.count)
	})

	document.getElementById("cur-trans-list").innerHTML = display;
	document.getElementById("total").innerHTML = total;
}

var modal

window.addEventListener("load", function(){ modal = document.getElementById("drink-options-modal") })

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function pay() {
	console.log(orderedCoffees)
	fetch(API_URL + "transactions", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(orderedCoffees)
	})
	document.getElementById("inc-orders-parent").style.display = "flex"
	document.getElementById("cur-trans-parent").style.display = "none"

	orderedCoffees = []
	document.getElementById("cur-trans-list").innerHTML = '';
}

function addCoffee(idx) {
	item = menu[idx]
	if (item.is_drink) {
		modal.style.display = "block"
		ok = function(iidx) {
			modal.style.display = 'none'
			object = {
				index: iidx,
				addons: [],
				large: document.getElementById("large").checked,
				count: 1 // TODO
			}
			drink_addons.forEach(function(element, index) {
				switch (element.type) {
					case "toggle":
						object.addons[index] = document.getElementById(element.name).checked
						break;
					case "choice":
						var choice
						[].slice.call(document.getElementById(element.name).getElementsByTagName("input")).every( (el, idx) => {
							if (el.checked) {
								choice = idx
								return false
							}
							return true
						})
						object.addons[index] = choice
						break;
					case "count":
						object.addons[index] = []
						for (idx in element.choices) {
							object.addons[index][idx] = document.getElementById(`${element.name}choice${idx}`).valueAsNumber
						}

				}
			})
			orderedCoffees.push(object);
			updCurTransList()
		}
		var options = ""
		options+="<h3>Large</h3>"
		options+="<input id=\"large\" type=\"checkbox\">"
		for (const option of drink_addons) {

			options+=`<h3>${option.name}</h3>`
			switch (option.type) {
				case "toggle":
					options+=`<input id="${option.name}" type=\"checkbox\">`
					break;
				case "choice":
					options+=`<div id="${option.name}">`
					option.choices.forEach(function(element, index) {
						options+=`
						    <input type="radio" id="${option.name}choice${index}"
								name="${option.name}" ${index === option.default ? "checked" : ""}>
							<label for="${option.name}choice${index}">${element.name}</label>
						`
					})
					options+="</div>"
					break;
				case "count":
					option.choices.forEach(function(element, index) {
						options+=`
							<input type="number" value="0" id="${option.name}choice${index}">
							<label for="${option.name}choice${index}">${element.name}</label>
						`
					})
			}
		}
		modal.innerHTML = `
			<div class="modal-content">
				<h2>${item.long_name}</h2>
				${options}
				<div class="modal-buttons">
					<button onclick="modal.style.display = 'none'" type="button">Cancel</button>
					<button onclick="ok(${idx})" type="button">OK</button>
				</div>
			</div>
		`
	} else {
		orderedCoffees.push({index: idx});
		updCurTransList()
	}

}




