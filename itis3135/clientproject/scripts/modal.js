document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.my-slides img'); // Images in the slideshow
    const modal = document.getElementById("pdf-modal");
    const modalContent = document.querySelector(".modal-content");
    const closeBtn = document.querySelector(".close");
    const pdfContainer = document.getElementById("pdf-container");

    // Initially hide the modal
    modal.style.display = "none";

    images.forEach((image, index) => {
        image.addEventListener("click", function () {
            const diagramIndex = index + 7; // Based on your file names (diagram7.pdf - diagram15.pdf)
            const pdfFile = `files/diagram${diagramIndex}.pdf#toolbar=0`; // Construct the PDF path
            console.log("Opening PDF:", pdfFile);

            // Create an iframe to embed the PDF into the modal
            const iframe = document.createElement("iframe");
            iframe.src = pdfFile;
            iframe.style.border = "none";
            pdfContainer.innerHTML = ""; // Clear previous content
            pdfContainer.appendChild(iframe); // Append the new PDF iframe

            modal.style.display = "block"; // Show the modal
        });
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none"; // Hide the modal
        pdfContainer.innerHTML = ""; // Clear the iframe content
    });

    // Close modal when clicking anywhere outside the modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            pdfContainer.innerHTML = "";
        }
    });
});
