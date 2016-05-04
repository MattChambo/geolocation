var mainMap;
var allMarkers = [];

function initMap() {

	//Get a reference to the map container (div)

	var mapContainer = document.querySelector('#map-container');

	// Set some map options
	var options = {
		center: {
			lat: -41.287726,
			lng: 174.777319
		},
		zoom: 15
	};

	// Create a new Google Map
	mainMap = new google.maps.Map(mapContainer, options);

	//Now we're ready to show the store markers
	placeStoreMarkers();

}


function placeStoreMarkers() {

	// Connect to database and get the locations
	var locations = [
		{
			title: "Hataitai Shop",
			lat: -41.305048,
			lng: 174.794638
		},
		{
			title: "Petone Store",
			lat: -41.224220,
			lng: 174.882146
		},
		{
			title: "Newtown Store",
			lat: -41.312318,
			lng: 174.778943
		}

	];

	// Loop over each location
	for( var i=0; i<locations.length; i++ ) {

		//Create a new marker
		var marker = new google.maps.Marker({
			position: {
				lat: locations[i].lat,
				lng: locations[i].lng
			},
			map: mainMap,
			title: locations[i].title,
			icon: 'http://placehold.it/50x50',
			id: i
		});

		// Store this marker in the collection
		allMarkers.push(marker);
	}

	// Show the contents of the allMarkers array
	console.log(allMarkers);

	// Populate the store picker

	populateStorePicker(locations);

}

function populateStorePicker(locations) {

	console.log(locations);

	//Find the store picker element
	var storePickeElement = document.querySelector('#store-picker');

	// Create a "please select.." option
	var optionElement = document.createElement('option');
	optionElement.innerHTML = "Please select a store...";
	storePickeElement.appendChild(optionElement);
	

	// Create all the location options
	for( var i=0; i<locations.length; i++ ) {

		// Create a new option element
		var optionElement = document.createElement('option');

		// Put the name of this store in the option element
		optionElement.innerHTML = locations[i].title;

		//Put this new option element in the select
		storePickeElement.appendChild(optionElement);

	}

	//listen for changes in the select element
	storePickeElement.onchange = showChosenLocation;

}


function showChosenLocation() {

	// Get the element that triggered this function
	var selectElement = this;

	// Get the index of the option that was chosen
	var selectedOptionIndex = selectElement.selectedIndex;

	// Get the opion that was selected
	var optionElement = selectElement[selectedOptionIndex];

	// Get the text that is inside this option
	var optionText = optionElement.value;

	// Find the marker that matches the option that was chosen
	var theChosenMarker;
	for ( var i=0; i<allMarkers.length; i++ ) {

		// Is this the marker?
		if( optionText == allMarkers[i].title ) {
			// Found!
			theChosenMarker = allMarkers[i];
			// Make sure the loop finishes
			i = allMarkers.length;
		}

	}

	//only if we found a marker
	if( theChosenMarker != undefined ) {

		//make Google Maps focus on the marker position
		mainMap.panTo({
			lat: theChosenMarker.getPosition().lat(),
			lng: theChosenMarker.getPosition().lng() 
		});

	}

}