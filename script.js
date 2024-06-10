var language = 'no';
var lang = langNO;

var formID = "1FAIpQLSem_9tSoQNv_OKkDIAjmCAYctFxjrupPbed5LQ830AO6RRxyw"
var formlatID = "702141779"
var formlngID = "933478607"
var formtypeID = "204126937"
var formdateID = "559537287"
var formdescriptionID = "1426942264"

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRxZqyHH7C4M_LySMtWv4Roa-snTqvFwFz88BRA_1a2Zw1ELV9RAewRB23NR5ZR0FlaIU2teaNL1L4C/pub?output=csv';


var gsIcon = L.icon({
	iconUrl: 'img/S.png',
	size: [30,30],
	iconAnchor: [15,15]
});

var kioskIcon = L.icon({
	iconUrl: 'img/K.png',
	size: [30,30],
	iconAnchor: [15,15]
});

var speIcon = L.icon({
	iconUrl: 'img/A.png',
	size: [30,30],
	iconAnchor: [15,15]
});

var CgsIcon = L.icon({
	iconUrl: 'img/S_bw.png',
	size: [30,30],
	iconAnchor: [15,15]
});

var CkioskIcon = L.icon({
	iconUrl: 'img/K_bw.png',
	size: [30,30],
	iconAnchor: [15,15]
});

var CspeIcon = L.icon({
	iconUrl: 'img/A_bw.png',
	size: [30,30],
	iconAnchor: [15,15]
});


var data = []
var markers = [];
var openmarkers = [];
var closedmarkers = [];


const map = L.map('map').setView([63.42, 10.43], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	maxZoom: 19
}).addTo(map);

function displayOpenStores () {
	openmarkers = [];
	 fetch('Shops.geojson')
	  .then(response => response.json())
	  .then(geojson => {
		var geojsonLayer = L.geoJSON(geojson, {
		  pointToLayer: function (feature, latlng) {
			// Customize the icon based on the property value
			if (feature.properties.shop == "supermarket") {
			  var icon = gsIcon;
			} else if (feature.properties.shop == "kiosk") {
			  var icon = kioskIcon;
			} else {
			  var icon = speIcon;
			}
			var name = feature.properties.name;
		
			// Create a marker with the custom icon
			const marker = L.marker(latlng, { icon: icon });
			marker.bindPopup("<b>" + name + "</b>");
			openmarkers.push(marker);
			marker.on('mouseover', function (e) {
			this.openPopup();
			});
			marker.on('mouseout', function (e) {
				this.closePopup();
			});
			marker.addTo(map);
			return marker
		  }
		});
		geojsonLayer.addTo(map);
	});
	document.getElementById("displayOpenStores").innerText = lang.hideOpen;
	document.getElementById("displayOpenStores").onclick = removeOpenStores;
}



// Change the language of the page
function setLanguage(lg) {
	removeOpenStores();
	removeClosedStores();
	
	if (lg == 'en') {
		lang = langEN;
		language = 'en';
	}
	if (lg == 'no') {
		lang = langNO;
		language = 'no';
	}
	
	$("#title_question").text(lang.title_question);
	$("#title_instructions").text(lang.title_instructions);
	$("#displayOpenStores").text(lang.dispOpen);
	$("#displayClosedStores").text(lang.dispClosed);
	var rows = document.getElementsByClassName("row");
	rows[0].getElementsByTagName("span")[0].textContent = lang.supermarket;
	rows[1].getElementsByTagName("span")[0].textContent = lang.kiosk;
	rows[2].getElementsByTagName("span")[0].textContent = lang.specialised;
	rows[3].getElementsByTagName("span")[0].textContent = lang.closed_supermarket;
	rows[4].getElementsByTagName("span")[0].textContent = lang.closed_kiosk;
	rows[5].getElementsByTagName("span")[0].textContent = lang.closed_specialised;
}

// Download the Google Sheet with the surveys responses
function DLGoogleSheet() {
	Papa.parse(public_spreadsheet_url, {
		download: true,
		header: true,
		complete: showInfo
	})
  }
 
function showInfo(results) {
	data = results.data
}

function displayClosedStores () {
	closedmarkers = [];
	// Extract data from object
	for (d of data) {
		var lat = parseFloat(d["Latitude (do not change)"]);
		var lng = parseFloat(d["Longitude (do not change)"]);
		var closingDate = d["Closing date"];
		var storeType = d["Store type"];
		var description = d["Description"];
		
		// Create marker and set its position
		if (storeType == "supermarket") {
			var icon = CgsIcon;
		}
		if (storeType == "kiosk") {
			var icon = CkioskIcon;
		}
		if (storeType.startsWith("specialised")) {
			var icon = CspeIcon;
		}
		const marker = L.marker([lat, lng], {icon: icon});
		closedmarkers.push(marker);

		if (storeType.startsWith("specialised")) {
			storeType = "Specialised : " + storeType.slice(12);
		}
		marker.bindPopup("<b>Closing Date:</b> " + closingDate + "<br><b>Store Type:</b> " + storeType + "<br><b>Description:</b> " + description);
		
		marker.on('mouseover', function (e) {
			this.openPopup();
		});
		marker.on('mouseout', function (e) {
			this.closePopup();
		});
		marker.addTo(map);
	}
	document.getElementById("displayClosedStores").innerText = lang.hideClosed;
	document.getElementById("displayClosedStores").onclick = removeClosedStores;
}

function removeMarkers(markers) {
	for (m of markers) {
		map.removeLayer(m);
	}
}

function removeOpenStores() {
	removeMarkers(openmarkers);
	document.getElementById("displayOpenStores").innerText = lang.dispOpen;
	document.getElementById("displayOpenStores").onclick = displayOpenStores;
}

function removeClosedStores() {
	removeMarkers(closedmarkers);
	document.getElementById("displayClosedStores").innerText = lang.dispClosed;
	document.getElementById("displayClosedStores").onclick = displayClosedStores
}

// Define a function to filter shops by type
function filterShops() {
    var supermarketChecked = document.getElementById("supermarketCheckbox").checked;
    var kioskChecked = document.getElementById("kioskCheckbox").checked;
    var specializedChecked = document.getElementById("specializedCheckbox").checked;

    console.log("Supermarket Checked:", supermarketChecked);
    console.log("Kiosk Checked:", kioskChecked);
    console.log("Specialized Checked:", specializedChecked);

    // Filter open markers
    var filteredOpenMarkers = openmarkers.filter(function(marker) {
        var shopType = marker.options.icon.options.shopType;
        return (shopType === "supermarket" && supermarketChecked) ||
            (shopType === "kiosk" && kioskChecked) ||
            (shopType === "specialized" && specializedChecked);
    });

    console.log("Filtered Open Markers:", filteredOpenMarkers.length);

    // Filter closed markers
    var filteredClosedMarkers = closedmarkers.filter(function(marker) {
        var shopType = marker.options.icon.options.shopType;
        return (shopType === "supermarket" && supermarketChecked) ||
            (shopType === "kiosk" && kioskChecked) ||
            (shopType === "specialized" && specializedChecked);
    });

    console.log("Filtered Closed Markers:", filteredClosedMarkers.length);

    // Remove all markers from the map
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add filtered markers to the map
    filteredOpenMarkers.forEach(function(marker) {
        marker.addTo(map);
    });

    filteredClosedMarkers.forEach(function(marker) {
        marker.addTo(map);
    });
}


// Add new markers to the map and open google form
function onMapClick(e) {
	lat = e.latlng.lat;
	lng = e.latlng.lng;
	// var popup = document.getElementById("formdiv").innerHTML;
	if (language == 'en') {
		var popup = L.popup({content:'<div id="formdiv"><div class="form-group"><div class="form-group"><label for="storeType">What kind of store was it ?<br></label><label class="form-radio"><input type="radio" id="supermarket" name="storeType" value="supermarket" checked="checked" onclick="UpdateSpecialised(true)"></input>Grocery stores (or supermarket)<br></label><label class="form-radio"><input type="radio" id="kiosk" name="storeType" value="kiosk" onclick="UpdateSpecialised(true)"></input>Kiosk<br></label><label class="form-radio"><input type="radio" id="specialised" name="storeType" value="specialised" onclick="UpdateSpecialised(false)"></input>Specialised : <input type="text" name="storeType" placeholder="type of products sold" id="specialisedInput" disabled="true"/> <br><br></label><label for="date">About when did the shop close down?<br></label><em class="text-muted">If not sure, write the last  5-year you think it existed (1970 or 1975 or …)</em><input class="form-control" name="dateInput" id="dateInput" placeholder="..."></input><br><br><label for="description">Short description of the store</label><textarea class="form-control" name="descriptionInput" id="descriptionInput" placeholder="(optionnal)"></textarea></div><em class="text-muted">Click on the button to add a store at this location.</em><div id="formHelp"></div><hr /><button class = "button" type="button" id="SubmitButton" onclick="OpenForm();">Add a store</button></div></div>', closeButton:true});
	}
	if (language == 'no') {
		var popup = L.popup({content:'<div id="formdiv"><div class="form-group"><div class="form-group"><label for="storeType">Hva slags butikk var det?<br></label><label class="form-radio"><input type="radio" id="supermarket" name="storeType" value="supermarket" checked="checked" onclick="UpdateSpecialised(true)"></input>Dagligvare / kolonial / supermarked<br></label><label class="form-radio"><input type="radio" id="kiosk" name="storeType" value="kiosk" onclick="UpdateSpecialised(true)"></input>Kiosk<br></label><label class="form-radio"><input type="radio" id="specialised" name="storeType" value="specialised" onclick="UpdateSpecialised(false)"></input>Spesialforretning : <input type="text" name="storeType" placeholder="melk, fisk, kjøtt/slakter" id="specialisedInput" disabled="true"/> <br><br></label><label for="date">Omtrent når ble den nedlagt?<br></label><em class="text-muted">Hvis du er ikke sikker, så oppgi siste 5-år du mener den var i drift. (1970 eller 1975 eller…)</em><input class="form-control" name="dateInput" id="dateInput" placeholder="..."></input><br><br><label for="description">Kort beskrivelse av butikken</label><textarea class="form-control" name="descriptionInput" id="descriptionInput" placeholder="(valgfritt)"></textarea> </div><em class="text-muted">Klikk på knappen for å legge til en butikk på dette stedet.</em><div id="formHelp"></div><hr /><button class="button" type="button" id="SubmitButton" onclick="OpenForm();">Legg til en butikk</button></div></div>', closeButton:true});
	}
	//Add marker visually on the map and open a popup
	marker = L.marker(e.latlng).addTo(map).bindPopup(popup);

    setTimeout(function() {
		marker.openPopup();
    }, 100);
	
	// Remove the marker when the popup is closed
	marker.on('popupclose', function() {
		map.removeLayer(marker);
		setTimeout(function() {
			for (m of markers) {	
				m.addTo(map);
			};
		},0);
	});
};


function OpenForm() {
	let date = document.querySelector('#dateInput').value;
	if (date == "") {
		date = "unknow";
	};
	
	let type = document.querySelector('input[name="storeType"]:checked').value;	
	if (type == "specialised") {
		type = type + ": " + document.getElementById("specialisedInput").value;
	};
	
	let description = document.querySelector('#descriptionInput').value;
	
	var link = "https://docs.google.com/forms/d/e/" + formID + "/formResponse?usp=pp_url&entry." + formlatID + "=" + lat + "&entry." + formlngID + "=" + lng + "&entry." + formdateID + "=" + date + "&entry." + formtypeID + "=" + type + "&entry." + formdescriptionID + "=" + description + "&submit=Submit";
	window.open(link);
	
	markers.push(marker);
	
	document.getElementById("displayClosedStores").disabled = false;
}

function UpdateSpecialised(disabled) {
	document.getElementById("specialisedInput").disabled = disabled;
	if (disabled) {
		document.getElementById("specialisedInput").value = "";
	};
};

DLGoogleSheet();
setLanguage("no");
map.on('click', onMapClick);

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners to checkboxes
    document.getElementById("supermarketCheckbox").addEventListener("change", filterShops);
    document.getElementById("kioskCheckbox").addEventListener("change", filterShops);
    document.getElementById("specializedCheckbox").addEventListener("change", filterShops);
});
