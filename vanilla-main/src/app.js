const API_URL = "http://127.0.0.1:5000/";


var menu, drink_addons, modal;

let orderedCoffees = [];




function getOrderSubText() {
	var currentDate = new Date();
	var hour = currentDate.getHours();
	var day = currentDate.getDay();
	
	/* ****************** */

	/*
	day = 4;
	hour = 8;
	*/
	
	var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day]
	
	
	function getShiftName(hour) {
		if (hour >= 7 && hour <= 9) {
			return ", Morning Shift";
		} else if (hour >= 12 && hour <= 14) {
			return ", Lunch Shift";
		} else {
			return ", (No Shift Selected)";
		}
	}

	
	return weekday + getShiftName(hour);
}

function postCoffee(coffee) {
	console.log(coffee)
	fetch(API_URL + "transactions", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(coffee)
	})
}

// function addCoffee(idx) {
// 	item = menu[idx]
// 	if (item.is_drink) {
// 		modal.style.display = "block"
// 		ok = function(iidx) {
// 			modal.style.display = 'none'
// 			object = {
				
				
// 				index: iidx,
// 				addons: [],
// 				large: document.getElementById("large").checked,
// 				count: 1 // TODO
// 			}
// 			drink_addons.forEach(function(element, index) {
// 				switch (element.type) {
// 					case "toggle":
// 					object.addons[index] = document.getElementById(element.name).checked
// 					break;
// 					case "choice":
// 					var choice
// 					[].slice.call(document.getElementById(element.name).getElementsByTagName("input")).every( (el, idx) => {
// 						if (el.checked) {
// 							choice = idx
// 							return false
// 						}
// 						return true
// 					})
// 					object.addons[index] = choice
// 					break;
// 					case "count":
// 					object.addons[index] = []
// 					for (idx in element.choices) {
// 						object.addons[index][idx] = document.getElementById(`${element.name}choice${idx}`).valueAsNumber
// 					}
					
// 				}
// 			})
// 			postCoffee(object);
			
// 			orderedCoffees.push(object);
// 			updCurTransList()
// 		}
// 		var options = ""
// 		options+="<h3>Large</h3>"
// 		options+="<input id=\"large\" type=\"checkbox\">"
// 		for (const option of drink_addons) {
			
// 			options+=`<h3>${option.name}</h3>`
// 			switch (option.type) {
// 				case "toggle":
// 				options+=`<input id="${option.name}" type=\"checkbox\">`
// 				break;
// 				case "choice":
// 				options+=`<div id="${option.name}">`
// 				option.choices.forEach(function(element, index) {
// 					options+=`
// 					<input type="radio" id="${option.name}choice${index}"
// 					name="${option.name}" ${index === option.default ? "checked" : ""}>
// 					<label for="${option.name}choice${index}">${element.name}</label>
// 					`
// 				})
// 				options+="</div>"
// 				break;
// 				case "count":
// 				option.choices.forEach(function(element, index) {
// 					options+=`
// 					<input type="number" value="0" id="${option.name}choice${index}">
// 					<label for="${option.name}choice${index}">${element.name}</label>
// 					`
// 				})
// 			}
// 		}
// 		modal.innerHTML = `
// 		<div class="modal-content">
// 		<h2>${item.long_name}</h2>
// 		${options}
// 		<div class="modal-buttons">
// 		<button onclick="modal.style.display = 'none'" type="button">Cancel</button>
// 		<button onclick="ok(${idx})" type="button">OK</button>
// 		</div>
// 		</div>
// 		`
// 	} else {
// 		pushCoffee(item);
		
// 		orderedCoffees.push({index: idx});
// 		updCurTransList()
// 	}
	
// }


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
		count: 1 // TODO also do post
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
	object["milk"] = choice;


	[].slice.call(document.getElementById("drink-options-content")
		.querySelectorAll("[data-button-group].dialog-button-selected")).forEach(function(element) {
			element.classList.remove("dialog-button-selected")
		});

	[].slice.call(document.getElementById("drink-options-content")
		.querySelectorAll("[data-button-default='true'")).forEach(function(element) {
			element.classList.add("dialog-button-selected")
		});


	console.log(object);
	fetch(API_URL + "transactions", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(object)
	});
	orderedCoffees.push(object);
	updCurTransList()
}



function coffeeClicked(idx) {
	item = menu[idx]
	if (item.is_drink) {
		modal.style.display = "flex"
		displayedDialogIdx = idx
    } else {
		orderedCoffees.push({index: idx});
		updCurTransList()
	}
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
	function addClickListener() {
		for (let i = 0; i <= data.length; i++) {
			if (i == 8) { // cookie
				console.log("cookie");
			} else if (i == 9) {  //extras menu
				console.log("extras menu");
			} else {
				let coffeeButton = document.getElementById("hstack-item" + i);
				
				coffeeButton.style.cursor = 'pointer';
				coffeeButton.onclick = function () {
					coffeeClicked(i)
				}
			}
		}
	}
	
	function setFunc() {
		data.forEach(function(element, index) { 
			let itemName = "hstack-item" + index;
			
			console.log(itemName);
			
			if (index > 1 && index != 8 && index != 9) {
				document.getElementById(itemName).innerHTML = `
				<p class="button-title-small">${element.short_name}</p>
				<p class="button-sub-small">${element.long_name}</p>
				`
			} else if (index == 8) {
				document.getElementById(itemName).innerHTML = `
				<p class="button-title-big">${element.short_name}</p>
				<p class="button-sub-big">${element.long_name}</p>
				`
				
				
				itemName = "hstack-item" + (index + 1);
				document.getElementById(itemName).innerHTML = `
				<p class="button-sub-big">Other</p>
				`
				
			} else {
				document.getElementById(itemName).innerHTML = `
				<p class="button-title-big">${element.short_name}</p>
				<p class="button-sub-big">${element.long_name}</p>
				`
			}
		})
	}
	
	
	data.forEach(function(element, index) { 

		tab += `
			<div class="grid-item">
				<button id="button${index}" type="button" onclick="coffeeClicked(${index})">${element.short_name}</button>
			</div>
			`;	 
	})

	setFunc = function() { document.getElementById("grid-container").innerHTML = tab; }
	if ( document.readyState == 'complete' ) {
		setFunc();
		addClickListener();
	} else {
		addEventListener("load", () => {
			setFunc();
			addClickListener();
		})
	}
}

function updCurTransList() {
	var display = '';
	//var total = 0;
	
	orderedCoffees.forEach(function(element) { 
		display += `
		<p id="order${element.index}" class="order${element.index}" style="background: white; border-radius: 0.4vw; padding: 0.4vw; margin-top: 0.8vw; margin-bottom: 0.8vw;"><span style="font-weight: 900; margin-left: 0.5vw; margin-right: 1.4vw;">${(element.large) ? "L" : "R"}</span>${menu[element.index].long_name}</p>
		`;
	});
	
	document.getElementById("order-list").innerHTML = display;
}

function endShift() {
	document.getElementById("endshift-button").addEventListener("click", () => {
		

		document.getElementById("endshift-button").style.display = "none";
		document.getElementById("preorders-button").style.display = "none";

		document.getElementById("confirm-endshift-button").style.display = "block";
		document.getElementById("cancel-endshift-button").style.display = "block";




function diagButtonClick(elem) {
	var type = elem.getAttribute("data-button-group");
	[].slice.call(document.getElementById("drink-options-content")
		.querySelectorAll("[data-button-group='" + type + "'].dialog-button-selected")).forEach(function(element) {
			element.classList.remove("dialog-button-selected")
		})
	elem.classList.add("dialog-button-selected")
}

function confirmCancelEnd() {
	document.getElementById("confirm-endshift-button").addEventListener("click", () => {
		alert("shift ended!");
		window.location.href = "./index.html";
	})

	document.getElementById("cancel-endshift-button").addEventListener("click", () => {
		document.getElementById("endshift-button").style.display = "block";
		document.getElementById("preorders-button").style.display = "block";

		document.getElementById("confirm-endshift-button").style.display = "none";
		document.getElementById("cancel-endshift-button").style.display = "none";
	})
}
getMenuItems(API_URL + "menu");


window.addEventListener("load", () => {
	getCurrentDate();
	modal = document.getElementById("drink-options-modal");
	document.getElementById("order-sub").innerHTML = getOrderSubText();
	
	

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
	let buttons = document.getElementsByClassName("bar-button")
	for (button of buttons) {
		button.style.cursor = "pointer";
	}
	}

	endShift();

	confirmCancelEnd();
	
};

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
