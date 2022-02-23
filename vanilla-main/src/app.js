const API_URL = "http://127.0.0.1:5000/";


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
	data = asyncFetch(API_URL + "shift");
	console.log(data);
}


async function asyncFetch(url) {
	const response = await fetch(
		url, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic Q8xTy1zafJmh4R/p9bh11eOcUad/gjoRIeeU214lgtw='
			}
		},
	);
	json = await response.json()

	return json
}



function getIntroText() {
	var introText = "";
	introText += getCurrentDate()

	getCurrentName();
}


window.addEventListener("load", getCurrentDate);


var menu
var drink_addons

async function getMenuItems(url) {
	const response = await fetch(
		url, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic Q8xTy1zafJmh4R/p9bh11eOcUad/gjoRIeeU214lgtw='
			}
		},
	);
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
				<button id="button${index}" type="button" onclick="coffeeClicked(${index})">${element.short_name}</button>
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
	var display = '';
	//var total = 0;

	orderedCoffees.forEach(function(element) { 
		display += `
			<p id="order${element.index}" class="order${element.index}" style="background: white; border-radius: 0.4vw; padding: 0.4vw;"><span style="font-weight: 900; margin-left: 0.5vw; margin-right: 1.4vw;">${(element.large) ? "L" : "R"}</span>${menu[element.index].long_name}</p>
		`;
	})

	document.getElementById("order-list").innerHTML = display;
	//document.getElementById("total").innerHTML = total;
}

var modal

window.addEventListener("load", function(){ modal = document.getElementById("drink-options-modal") })

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




function diagButtonClick(elem) {
	var type = elem.getAttribute("data-button-group");
	[].slice.call(document.getElementById("drink-options-content")
		.querySelectorAll("[data-button-group='" + type + "'].dialog-button-selected")).forEach(function(element) {
			element.classList.remove("dialog-button-selected")
		})
	elem.classList.add("dialog-button-selected")
}




var displayedDialogIdx;


function doneclicked() {
	modal.style.display = 'none'
	object = {
		index: displayedDialogIdx,
		large: true,
		count: 1, // TODO also do post
		date: Date.now()
	}
	var choice
	[].slice.call(document.getElementById("drink-options-content")
		.querySelectorAll("[data-button-group='milk']"))
		.every( (el, idx) => {
			if (el.classList.contains("dialog-button-selected")) {
				choice = idx
				return false
			}
			return true
		}
	)
	object["milk"] = choice
	console.log(object)
	fetch(API_URL + "transactions", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Basic Q8xTy1zafJmh4R/p9bh11eOcUad/gjoRIeeU214lgtw='
		},
		body: JSON.stringify(object)
	})
	orderedCoffees.push(object);
	updCurTransList()
}





function coffeeClicked(idx) {
	item = menu[idx]
	if (item.is_drink) {
		modal.style.display = "block"
		displayedDialogIdx = idx
	} else {
		fetch(API_URL + "transactions", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic Q8xTy1zafJmh4R/p9bh11eOcUad/gjoRIeeU214lgtw='
			},
			body: JSON.stringify({
				index: 6,
				count: 1, // TODO
				date: Date.now()
				})
		})
		orderedCoffees.push({index: idx});
		updCurTransList()
	}

}




