let map, infoWindow, service, localContextMapView;
const input = document.querySelector("#input")
const search = document.querySelector(".search")

const currentLocation = document.querySelector(".currentLocation")

function initMap() {
    const localContextMapView = new google.maps.localContext.LocalContextMapView({
        element: document.getElementById("map"),
        placeTypePreferences: [
            { type: "restaurant", weight: 2 },
            { type: "bar", weight: 1 },
        ],
        maxPlaceCount: 20,
    });
    map = localContextMapView.map;
    map.setOptions({
        center: {
            lat: 49.2827,
            lng: -123.1207
        },
        zoom: 16,
        backgroundColor: "#2b2b2b",
        mapTypeId: "roadmap",
        streetViewControl: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
    });
    infoWindow = new google.maps.InfoWindow();
    currentLocation.classList.add("custom-map-control-button");
    currentLocation.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    localContextMapView.directionsOptions = {
                        origin: {
                            lat: pos.lat,
                            lng: pos.lng,
                        }
                    }
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("You are here");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    const options = {
        types: ["address"],
        componentRestrictions: {
            country: "ca",
        },
        fields: ["address_components", "geometry", "name"],
    };

    const autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place || !place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No address available for that input.");
            return;
        }

        // Recenter the map to the selected address
        map.setOptions({
            center: place.geometry.location,
            zoom: 14,
        });
        // Update the localContext directionsOptions origin
        localContextMapView.directionsOptions = {
            origin: place.geometry.location,
        };
        new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAbUlEQVR4Ae3LoQ2AMAAF0TMYPJoV2IApGIJtmIMtmIAVqutraj6IiqZpmyYoCO/08R7bXbOOHSF2Ohr0HCh00EPdwImiTgYqRgxKMowUTFiUyTKRMeNQIcdMYsGjSp6FyIoaWkmoUuLxEPzDh1xIaLFFuTyHMgAAAABJRU5ErkJggg==",
            zIndex: 30,
        });
        // update the results with new places
        localContextMapView.search();
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}



function showSearchbox() {
    if (input.style.display == "none") {
        input.style.display = "block";
    } else {
        input.style.display = "none"
    }
}
search.addEventListener("click", showSearchbox);
