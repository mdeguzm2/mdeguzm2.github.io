document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.my-slides img'); // Images in the slideshow
    const modal = document.getElementById("pdf-modal");
    const closeBtn = document.querySelector(".close");
    const pdfContainer = document.getElementById("pdf-container");

    // Hide the modal on page load
    modal.style.display = "none";

    // Event listener for images to show the modal
    images.forEach((image, index) => {
        image.addEventListener("click", function () {
            const diagramIndex = index + 7; // Based on your file names (diagram7.pdf - diagram15.pdf)
            const pdfFile = `files/diagram${diagramIndex}.pdf#toolbar=0`; // Construct the PDF path

            // Create an iframe to embed the PDF into the modal
            const iframe = document.createElement("iframe");
            iframe.src = pdfFile;
            iframe.style.border = "none";
            pdfContainer.innerHTML = ""; // Clear previous content
            pdfContainer.appendChild(iframe); // Append the new PDF iframe

            // Show the modal when the image is clicked
            modal.style.display = "grid"; 
        });
    });

    // Close button functionality
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none"; // Hide the modal when close button is clicked
        pdfContainer.innerHTML = ""; // Clear the iframe content
    });

    // Close the modal if the user clicks outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide the modal
            pdfContainer.innerHTML = ""; // Clear the iframe content
        }
    });
});
