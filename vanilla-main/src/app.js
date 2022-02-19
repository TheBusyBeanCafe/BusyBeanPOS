const API_URL = "http://127.0.0.1:5000/menu";

async function getMenuItems(url) {
	const response = await fetch(url);
	var data = await response.json();

	displayData(data);
}


function displayData(data) {
	let tab;
	
	data.forEach(function(element) { 
		console.log(element.id);
		console.log(element.short_name);

		tab += `
			<div class="grid-item">
				<button id="button${element.id}" type="button" onclick="orderCoffee(${element})">${element.short_name}</button>
			</div>
			`;	 
	})

	console.log(tab);

	document.getElementById("grid-container").innerHTML = tab;
}

// let orderedCoffees = [];

getMenuItems(API_URL);

function orderCoffee(item) {
	console.log(item.long_name);

	// orderedCoffees.push(item.long_name);

	// let display;

	// for (const i in item) {
	// 	console.log(i);
	// }

	// orderedCoffees.forEach(function(element) { 
	// 	console.log(element);

	// 	display += `
	// 		<p>${element}</p>
	// 	`;
	// })

	// document.getElementById("order-list").innerHTML = display;
}



