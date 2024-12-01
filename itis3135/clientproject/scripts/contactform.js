document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    let isProgrammaticReset = false;

    // Alert for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission
        alert("Form successfully submitted!");
        
        // Trigger a programmatic reset
        isProgrammaticReset = true; // Mark as programmatic reset
        form.reset(); // Reset the form
    });

    // Alert for form reset
    form.addEventListener("reset", function () {
        if (!isProgrammaticReset) {
            alert("Form has been reset.");
        }
        isProgrammaticReset = false; // Reset the flag
    });
});
