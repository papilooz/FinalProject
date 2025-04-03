document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const model = document.getElementById("model").value;

        if (name === "" || email === "" || model === "") {
            alert("⚠️ Please fill in all required fields.");
        } else {
            alert(`✅ Test drive scheduled for ${name}!\nModel: ${model}\nConfirmation sent to ${email}.`);
            form.reset(); // Clear form after successful submission
        }
    });
});
