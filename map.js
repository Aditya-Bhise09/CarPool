
document.addEventListener("DOMContentLoaded", function () {

    var mapDiv = document.getElementById("map");
    if (!mapDiv) return; // Stop if map div not on page

    // Create map
    var map = L.map('map').setView([20.5937, 78.9629], 5); // India center

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Example marker
    L.marker([28.6139, 77.2090]).addTo(map)
        .bindPopup("Delhi")
        .openPopup();

});
