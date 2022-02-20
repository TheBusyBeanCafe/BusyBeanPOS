const API_MENU_URL = "http://127.0.0.1:5000/menu";
const API_SHIFT_URL = "http://127.0.0.1:5000/shifts";

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



function getCurrentDate() {
	var currentDate = new Date();
	var date = currentDate.getHours();

	if (date > 7 && date < 9) {
		return "Good Morning, "
	} else if (date > 12 && date < 2) {
		return "Good Afternoon, "
	} else {
		return "Hello!"
	}
}

function getCurrentName() {
	data = asyncFetch(API_SHIFT_URL);
	console.log(data);
}


async function asyncFetch(url) {
	const response = await fetch(url);
	json = await response.json()

	return json
}



function getIntroText() {
	var introText = "";
	introText += getCurrentDate()

	getCurrentName();
}


window.addEventListener("load", getCurrentDate);


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
		console.log(element.id);
		console.log(element.short_name);

		tab += `
			<div class="grid-item">
				<button id="button${index}" type="button" onclick="addCoffee(${index})">${element.short_name}</button>
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

getMenuItems(API_MENU_URL);

function updCurTransList() {
	document.getElementById("inc-orders-parent").style.display = "none"
	document.getElementById("cur-trans-parent").style.display = "flex"

	var display = '';

	orderedCoffees.forEach(function(element) { 
		display += `
			<p>${menu[element].long_name}</p>
		`;
	})

	document.getElementById("cur-trans-list").innerHTML = display;
}

var modal

window.addEventListener("load", function(){ modal = document.getElementById("drink-options-modal") })

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function pay() {
	alert("HI")
}

function addCoffee(idx) {
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
		var options = ""
		for (const option of drink_addons) {
			console.log(option)

			options+=`<h3>${option.name}</h3>`
			switch (option.type) {
				case "toggle":
					options+="<input type=\"checkbox\">"
					break;
				case "choice":
					options+="<div>"
					option.choices.forEach(function(element, index) {
						options+=`
						    <input type="radio" id="${option.name}choice${index}"
								name="${option.name}">
							<label for="${option.name}choice${index}">${element.name}</label>
						`

					})
					options+="</div>"
					break;
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
		orderedCoffees.push(idx);
		updCurTransList()
	}

}




