let map;

function initMap() {
    const localContextMapView = new google.maps.localContext.LocalContextMapView({
        element: document.getElementById("map"),
        placeTypePreferences: [
            { type: "restaurant" },
            { type: "tourist_attraction" },
        ],
        maxPlaceCount: 12,
    });

    map = localContextMapView.map;
    map.setOptions({
        center: { lat: 49.281954, lng: -123.11707 },
        zoom: 14,
    });
}