let autocomplete;

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(document.getElementById("input"), options);
    autocomplete.addListener('place_changed', onPlaceChanged)

}

function onPlaceChanged() {
    let place = autocomplete.getPlace();

    if (!place.geometry) {
        // User didn't select a prediction; reset input field
        document.getElementById('input').placeholder = "Enter a place"
    } else {
        // Display details about valid places
        document.getElementById('details').innerHTML = place.name
    }
}

initAutocomplete();