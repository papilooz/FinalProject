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
    // Form validation
    const contactForm = document.getElementById("contactForm");
    const phoneInput = document.getElementById("phone");
  
    // Allow only numbers in the phone input
    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
    });
  
    // Validate the phone number and handle form submission
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
  
      const phoneValue = phoneInput.value;
  
      if (!phoneValue || phoneValue.length < 10) {
        alert("Please enter a valid phone number with at least 10 digits.");
      } else {
        alert("Form submitted successfully!");
        contactForm.reset(); // Reset the form after successful submission
      }
    });
  });
