document.addEventListener("DOMContentLoaded", function () {
    // Ensure you replace this with your actual API key
    maptilersdk.config.apiKey = 'LEFw3F4bh4jBaryAvNNl';
  
    // Initialize the map
    const map = new maptilersdk.Map({
      container: 'map', // ID of the div element to render the map
      style: maptilersdk.MapStyle.STREETS, // Map style
      center: [120.98863976120315, 14.604190631913609], // [Longitude, Latitude]
      zoom: 16, // Zoom level
    });
  
    // Add a marker
    new maptilersdk.Marker()
      .setLngLat([120.98863976120315, 14.604190631913609]) // Marker at the specified location
      .addTo(map);
  });

  document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
  
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission behavior
      alert("Form submitted successfully!");
      contactForm.reset(); // Optionally reset the form after submission
    });
  });