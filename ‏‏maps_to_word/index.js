// Initialize the map
const map = L.map('map').setView([32.0853, 34.7818], 10); // Coordinates for Tel Aviv

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// On map click, fetch and display the location name
map.on('click', async function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    // Fetch location name using a reverse geocoding service
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();

    const locationName = data.display_name || "Location not found";
    document.getElementById('locationName').textContent = locationName;
    
    // Store in a variable for further use
    const selectedLocation = locationName;
    console.log("Selected location:", selectedLocation);
});
