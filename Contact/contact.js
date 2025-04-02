document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const successAlert = document.getElementById("successAlert");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Create a FormData object to handle the form data
        const formData = new FormData(contactForm);

        // Send the form data using fetch
        fetch(contactForm.action, {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Display the success alert
            successAlert.classList.remove("d-none");

            // Optionally, you can reset the form after submission
            contactForm.reset();
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
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

document.addEventListener("DOMContentLoaded", () => {
    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const target = document.querySelector(button.getAttribute("data-bs-target"));
            const collapse = new bootstrap.Collapse(target);

            if (target.classList.contains("show")) {
                collapse.hide();
            } else {
                collapse.show();
            }
        });
    });
});
