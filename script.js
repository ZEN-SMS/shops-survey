// Initialize markers array

langEN = {
	"title_question" : "Do you remember any grocery stores that closed in Trondheim ?",
	"title_instructions" : "Click on the map where you think a grocery stores was located but has since closed. Fill in the information and then press the \"Add a store\" button. A new page with a submission confirmation will open but you can close it and feel free to add more stores.",
	"dispOpen" : "Display open stores",
	"dispClosed" : "Display closed stores",
	"hideOpen" : "Hide open stores",
	"hideClosed" : "Hide closed stores",
};

langNO = {
	"title_question" : "Husker du noen dagligvarebutikker som stengte i Trondheim?",
	"title_instructions" : "Klikk på kartet der du tror en dagligvarebutikk lå, men som siden har stengt. Fyll ut informasjonen og trykk deretter på knappen \"Legg til en butikk\". En ny side åpnes. Du kan lukke den og gjerne legge til flere butikker.",
	"dispOpen" : "Vis åpne butikker",
	"dispClosed" : "Vis stengte butikker",
	"hideOpen" : "Skjuler åpne butikker",
	"hideClosed" : "Skjuler stengte butikker",
};

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


legendEN = L.control.Legend({
    position: "topright",
    column: 2,
	collapsed : false,
    legends: [{
        label: "Supermarket",
        type: "image",
        url: "img/S.png",
    }, {
        label: "Kiosk",
        type: "image",
        url: "img/K.png",
    }, {
        label: "Specialised",
        type: "image",
        url: "img/A.png",
    }, {
        label: "Closed supermarket",
        type: "image",
        url: "img/S_bw.png",
    }, {
        label: "Closed kiosk",
        type: "image",
        url: "img/K_bw.png",
    }, {
        label: "Closed specialised",
        type: "image",
        url: "img/A_bw.png",
    },]
})

legendNO = L.control.Legend({
    position: "topright",
    column: 2,
	collapsed : false,
    legends: [{
        label: "Supermarked",
        type: "image",
        url: "img/S.png",
    }, {
        label: "Kiosk",
        type: "image",
        url: "img/K.png",
    }, {
        label: "Spesialforretning",
        type: "image",
        url: "img/A.png",
    }, {
        label: "Stengt supermarked",
        type: "image",
        url: "img/S_bw.png",
    }, {
        label: "Stengt kiosk",
        type: "image",
        url: "img/K_bw.png",
    }, {
        label: "Stengt spesialforretning ",
        type: "image",
        url: "img/A_bw.png",
    },]
})


var legend = legendNO;

function displayOpenStores () {
	openmarkers = [];
	var geojson = {
	"type": "FeatureCollection",
	"name": "Shops",
	"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
	"features": [
	{ "type": "Feature", "properties": { "full_id": "n8198899288", "osm_id": "8198899288", "osm_type": "node", "shop": "supermarket", "payment_de": "", "payment_cr": "", "payment_co": "", "payment_ca": "", "organic": "", "addr_stree": "", "addr_postc": "", "addr_house": "", "addr_city": "", "check_date": "", "website": "https://bunnpris.no/butikker/bunnpris-gourmet-nidarvoll", "brand_wiki": "no:Bunnpris", "brand_wi_1": "Q1774634", "wheelchair": "yes", "operator": "", "level": "", "ref_7eleve": "", "phone": "+47 73966325", "opening_ho": "same", "name": "Bunnpris Nidarvoll", "email": "bpnidarvoll@bunnpris.no", "brand": "Bunnpris", "branch": "", "fax": "", "payment_vi": "", "payment__1": "", "facebook": "", "cuisine": "", "entrance": "", "ref_narves": "", "payment_ma": "", "stroller": "yes", "self_check": "yes", "smoking": "", "service_de": "", "toilets_wh": "", "covered": "", "amenity": "", "opening__1": "", "alt_name": "", "door": "", "access": "", "service_ph": "", "service_ca": "", "addr_count": "", "service_ch": "", "ref_coop": "", "service_po": "", "service_ti": "", "service_ri": "", "ref_norges": "", "was_ref_bu": "", "service__1": "", "ref_bunnpr": "", "ref_rema": "", "opening__2": "Mo-Fr 08:00-23:00, Sa 09:00-22:00", "internet_a": "", "layer": "supermarkets", "path": "C:\\Users\\petescho\\GIS\\August2021\\OSM\\Food_stores\\supermarkets.shp|layername=supermarkets", "ARw400lm": 22.0 }, "geometry": { "type": "Point", "coordinates": [ 10.404522740089151, 63.401359064290823 ] } },
	{ "type": "Feature", "properties": { "full_id": "n8198899289", "osm_id": "8198899289", "osm_type": "node", "shop": "supermarket", "payment_de": "", "payment_cr": "", "payment_co": "", "payment_ca": "", "organic": "", "addr_stree": "", "addr_postc": "", "addr_house": "", "addr_city": "", "check_date": "", "website": "https://bunnpris.no/butikker/bunnpris-gourmet-nidarvoll", "brand_wiki": "en:Bunnpris", "brand_wi_1": "Q1774634", "wheelchair": "limited", "operator": "", "level": "", "ref_7eleve": "", "phone": "+47 73966325", "opening_ho": "same", "name": "Bunnpris Nidarvoll SÃ¸ndagsbutikk", "email": "bpnidarvoll@bunnpris.no", "brand": "Bunnpris", "branch": "", "fax": "", "payment_vi": "", "payment__1": "", "facebook": "", "cuisine": "", "entrance": "", "ref_narves": "", "payment_ma": "", "stroller": "limited", "self_check": "", "smoking": "", "service_de": "", "toilets_wh": "", "covered": "", "amenity": "", "opening__1": "", "alt_name": "", "door": "", "access": "", "service_ph": "", "service_ca": "", "addr_count": "", "service_ch": "", "ref_coop": "", "service_po": "", "service_ti": "", "service_ri": "", "ref_norges": "", "was_ref_bu": "", "service__1": "", "ref_bunnpr": "", "ref_rema": "", "opening__2": "Su 11:00-22:00", "internet_a": "", "layer": "supermarkets", "path": "C:\\Users\\petescho\\GIS\\August2021\\OSM\\Food_stores\\supermarkets.shp|layername=supermarkets", "ARw400lm": 23.0 }, "geometry": { "type": "Point", "coordinates": [ 10.404610857448779, 63.401171219936117 ] } },
	{ "type": "Feature", "properties": { "full_id": "n8198899291", "osm_id": "8198899291", "osm_type": "node", "shop": "", "payment_de": "", "payment_cr": "", "payment_co": "", "payment_ca": "", "organic": "", "addr_stree": "", "addr_postc": "", "addr_house": "", "addr_city": "", "check_date": "", "website": "", "brand_wiki": "", "brand_wi_1": "", "wheelchair": "yes", "operator": "", "level": "", "ref_7eleve": "", "phone": "", "opening_ho": "", "name": "", "email": "", "brand": "", "branch": "", "fax": "", "payment_vi": "", "payment__1": "", "facebook": "", "cuisine": "", "entrance": "main", "ref_narves": "", "payment_ma": "", "stroller": "", "self_check": "", "smoking": "", "service_de": "", "toilets_wh": "", "covered": "", "amenity": "", "opening__1": "", "alt_name": "", "door": "sliding", "access": "customers", "service_ph": "", "service_ca": "", "addr_count": "", "service_ch": "", "ref_coop": "", "service_po": "", "service_ti": "", "service_ri": "", "ref_norges": "", "was_ref_bu": "", "service__1": "", "ref_bunnpr": "", "ref_rema": "", "opening__2": "", "internet_a": "", "layer": "supermarkets", "path": "C:\\Users\\petescho\\GIS\\August2021\\OSM\\Food_stores\\supermarkets.shp|layername=supermarkets", "ARw400lm": 21.0 }, "geometry": { "type": "Point", "coordinates": [ 10.404246400203636, 63.401403161393482 ] } },
	{ "type": "Feature", "properties": { "full_id": "n8198899292", "osm_id": "8198899292", "osm_type": "node", "shop": "", "payment_de": "", "payment_cr": "", "payment_co": "", "payment_ca": "", "organic": "", "addr_stree": "", "addr_postc": "", "addr_house": "", "addr_city": "", "check_date": "", "website": "", "brand_wiki": "", "brand_wi_1": "", "wheelchair": "limited", "operator": "", "level": "", "ref_7eleve": "", "phone": "", "opening_ho": "", "name": "Bunnpris Nidarvoll SÃ¸ndagsbutikk", "email": "", "brand": "", "branch": "", "fax": "", "payment_vi": "", "payment__1": "", "facebook": "", "cuisine": "", "entrance": "shop", "ref_narves": "", "payment_ma": "", "stroller": "", "self_check": "", "smoking": "", "service_de": "", "toilets_wh": "", "covered": "", "amenity": "", "opening__1": "", "alt_name": "", "door": "", "access": "customers", "service_ph": "", "service_ca": "", "addr_count": "", "service_ch": "", "ref_coop": "", "service_po": "", "service_ti": "", "service_ri": "", "ref_norges": "", "was_ref_bu": "", "service__1": "", "ref_bunnpr": "", "ref_rema": "", "opening__2": "", "internet_a": "", "layer": "supermarkets", "path": "C:\\Users\\petescho\\GIS\\August2021\\OSM\\Food_stores\\supermarkets.shp|layername=supermarkets", "ARw400lm": 23.0 }, "geometry": { "type": "Point", "coordinates": [ 10.404526431079859, 63.401152032467422 ] } },
	{ "type": "Feature", "properties": { "full_id": "n8358498729", "osm_id": "8358498729", "osm_type": "node", "shop": "supermarket", "payment_de": "", "payment_cr": "", "payment_co": "", "payment_ca": "", "organic": "", "addr_stree": "", "addr_postc": "", "addr_house": "", "addr_city": "", "check_date": "", "website": "", "brand_wiki": "", "brand_wi_1": "", "wheelchair": "", "operator": "", "level": "", "ref_7eleve": "", "phone": "+47 72831000", "opening_ho": "", "name": "Rema 1000 RanheimsfjÃ¦ra", "email": "ranheimsfjera@rema.no", "brand": "Rema 1000", "branch": "RanheimsfjÃ¦ra", "fax": "", "payment_vi": "", "payment__1": "", "facebook": "", "cuisine": "", "entrance": "", "ref_narves": "", "payment_ma": "", "stroller": "", "self_check": "", "smoking": "", "service_de": "", "toilets_wh": "", "covered": "", "amenity": "", "opening__1": "", "alt_name": "", "door": "", "access": "", "service_ph": "", "service_ca": "", "addr_count": "", "service_ch": "", "ref_coop": "", "service_po": "", "service_ti": "", "service_ri": "", "ref_norges": "", "was_ref_bu": "", "service__1": "", "ref_bunnpr": "", "ref_rema": "2092442", "opening__2": "Mo-Sa 07:00-23:00, Su 10:00-22:00", "internet_a": "", "layer": "supermarkets", "path": "C:\\Users\\petescho\\GIS\\August2021\\OSM\\Food_stores\\supermarkets.shp|layername=supermarkets", "ARw400lm": 31.0 }, "geometry": { "type": "Point", "coordinates": [ 10.527278271690813, 63.428838141688097 ] } },
	{ "type": "Feature", "properties": { "full_id": "n8359707109", "osm_id": "8359707109", "osm_type": "node", "shop": "supermarket", "payment_de": "", "payment_cr": "", "payment_co": "", "payment_ca": "", "organic": "", "addr_stree": "", "addr_postc": "", "addr_house": "", "addr_city": "", "check_date": "", "website": "https://coop.no/butikker/extra/leuthenhaven-4246/", "brand_wiki": "", "brand_wi_1": "", "wheelchair": "", "operator": "", "level": "", "ref_7eleve": "", "phone": "+47 73512457", "opening_ho": "", "name": "Extra Leuthenhaven", "email": "leuthenhaven.extra@coop.no", "brand": "Extra", "branch": "Leuthenhaven", "fax": "", "payment_vi": "", "payment__1": "", "facebook": "", "cuisine": "", "entrance": "", "ref_narves": "", "payment_ma": "", "stroller": "", "self_check": "", "smoking": "", "service_de": "", "toilets_wh": "", "covered": "", "amenity": "", "opening__1": "", "alt_name": "", "door": "", "access": "", "service_ph": "", "service_ca": "", "addr_count": "", "service_ch": "", "ref_coop": "4246", "service_po": "yes", "service_ti": "", "service_ri": "", "ref_norges": "", "was_ref_bu": "", "service__1": "", "ref_bunnpr": "", "ref_rema": "", "opening__2": "Mo-Fr 07:00-23:00, Sa 08:00-21:00, Su 10:00-22:00", "internet_a": "", "layer": "supermarkets", "path": "C:\\Users\\petescho\\GIS\\August2021\\OSM\\Food_stores\\supermarkets.shp|layername=supermarkets", "ARw400lm": 231.0 }, "geometry": { "type": "Point", "coordinates": [ 10.390642885462947, 63.430183651182347 ] } },
	{ "type": "Feature", "properties": { "full_id": "n8933802894", "osm_id": "8933802894", "osm_type": "node", "shop": "supermarket", "payment_de": "", "payment_cr": "", "payment_co": "yes", "payment_ca": "", "organic": "", "addr_stree": "", "addr_postc": "", "addr_house": "", "addr_city": "", "check_date": "", "website": "https://coop.no/extra/", "brand_wiki": "", "brand_wi_1": "", "wheelchair": "", "operator": "", "level": "", "ref_7eleve": "", "phone": "", "opening_ho": "same", "name": "Extra Elgeseter", "email": "", "brand": "", "branch": "", "fax": "", "payment_vi": "yes", "payment__1": "", "facebook": "", "cuisine": "", "entrance": "", "ref_narves": "", "payment_ma": "yes", "stroller": "", "self_check": "", "smoking": "", "service_de": "", "toilets_wh": "", "covered": "", "amenity": "", "opening__1": "", "alt_name": "", "door": "", "access": "", "service_ph": "", "service_ca": "", "addr_count": "", "service_ch": "", "ref_coop": "", "service_po": "", "service_ti": "", "service_ri": "", "ref_norges": "", "was_ref_bu": "", "service__1": "", "ref_bunnpr": "", "ref_rema": "", "opening__2": "", "internet_a": "", "layer": "supermarkets", "path": "C:\\Users\\petescho\\GIS\\August2021\\OSM\\Food_stores\\supermarkets.shp|layername=supermarkets", "ARw400lm": 106.0 }, "geometry": { "type": "Point", "coordinates": [ 10.39649544656548, 63.419118837168021 ] } },
	{ "type": "Feature", "properties": { "full_id": "n8936872084", "osm_id": "8936872084", "osm_type": "node", "shop": "supermarket", "payment_de": "", "payment_cr": "", "payment_co": "", "payment_ca": "", "organic": "", "addr_stree": "", "addr_postc": "", "addr_house": "", "addr_city": "", "check_date": "", "website": "", "brand_wiki": "", "brand_wi_1": "", "wheelchair": "", "operator": "", "level": "", "ref_7eleve": "", "phone": "", "opening_ho": "", "name": "Holdbart", "email": "", "brand": "", "branch": "", "fax": "", "payment_vi": "", "payment__1": "", "facebook": "", "cuisine": "", "entrance": "", "ref_narves": "", "payment_ma": "", "stroller": "", "self_check": "", "smoking": "", "service_de": "", "toilets_wh": "", "covered": "", "amenity": "", "opening__1": "", "alt_name": "", "door": "", "access": "", "service_ph": "", "service_ca": "", "addr_count": "", "service_ch": "", "ref_coop": "", "service_po": "", "service_ti": "", "service_ri": "", "ref_norges": "", "was_ref_bu": "", "service__1": "", "ref_bunnpr": "", "ref_rema": "", "opening__2": "", "internet_a": "", "layer": "supermarkets", "path": "C:\\Users\\petescho\\GIS\\August2021\\OSM\\Food_stores\\supermarkets.shp|layername=supermarkets", "ARw400lm": 61.0 }, "geometry": { "type": "Point", "coordinates": [ 10.376902192575049, 63.358208997943031 ] } },
	{ "type": "Feature", "properties": { "full_id": "n8939919263", "osm_id": "8939919263", "osm_type": "node", "shop": "", "payment_de": "", "payment_cr": "", "payment_co": "", "payment_ca": "", "organic": "", "addr_stree": "", "addr_postc": "", "addr_house": "", "addr_city": "", "check_date": "", "website": "", "brand_wiki": "", "brand_wi_1": "", "wheelchair": "", "operator": "", "level": "0", "ref_7eleve": "", "phone": "", "opening_ho": "", "name": "", "email": "", "brand": "", "branch": "", "fax": "", "payment_vi": "", "payment__1": "", "facebook": "", "cuisine": "", "entrance": "yes", "ref_narves": "", "payment_ma": "", "stroller": "", "self_check": "", "smoking": "", "service_de": "", "toilets_wh": "", "covered": "", "amenity": "", "opening__1": "", "alt_name": "", "door": "", "access": "", "service_ph": "", "service_ca": "", "addr_count": "", "service_ch": "", "ref_coop": "", "service_po": "", "service_ti": "", "service_ri": "", "ref_norges": "", "was_ref_bu": "", "service__1": "", "ref_bunnpr": "", "ref_rema": "", "opening__2": "", "internet_a": "", "layer": "supermarkets", "path": "C:\\Users\\petescho\\GIS\\August2021\\OSM\\Food_stores\\supermarkets.shp|layername=supermarkets", "ARw400lm": 63.0 }, "geometry": { "type": "Point", "coordinates": [ 10.454965805957066, 63.436415048223822 ] } }
	]
	};
	// fetch('Shops.geojson')
	  // .then(response => response.json())
	  // .then(geojson => {
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
	  // });
	document.getElementById("displayOpenStores").innerText = lang.hideOpen;
	document.getElementById("displayOpenStores").onclick = removeOpenStores;
}



// Change the language of the page
function setLanguage(lg) {
	removeOpenStores();
	removeClosedStores();
	map.removeControl(legend);
	
	if (lg == 'en') {
		lang = langEN;
		language = 'en';
		legend = legendEN;
	}
	if (lg == 'no') {
		lang = langNO;
		language = 'no';
		legend = legendNO;
	}
	
	legend.addTo(map);
	
	$("#title_question").text(lang.title_question);
	$("#title_instructions").text(lang.title_instructions);
	$("#displayOpenStores").text(lang.dispOpen);
	$("#displayClosedStores").text(lang.dispClosed);
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

data = [{Horodateur: "03/05/2023 13:13:34", "Latitude (do not change)": "63.42965161893003", "Longitude (do not change)": "10.392208099365236", "Closing date": "1789", "Store type": "specialised: patate" },{Horodateur: "03/05/2023 13:13:34", "Latitude (do not change)": "63.43965161893003", "Longitude (do not change)": "10.392208099365236", "Closing date": "1789", "Store type": "supermarket" }];

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
	map.removeControl(legend);

    setTimeout(function() {
		marker.openPopup();
    }, 100);
	
	// Remove the marker when the popup is closed
	marker.on('popupclose', function() {
		legend.addTo(map);
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

//DLGoogleSheet();

setLanguage("no");
map.on('click', onMapClick);