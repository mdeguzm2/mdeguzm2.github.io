document.addEventListener("DOMContentLoaded", function () {
    // Fetch and generate the header
    fetch("scripts/variables/header.json")
        .then((response) => response.json())
        .then((data) => {
            // Create the header element and add the title
            const header = document.createElement("header");
            const title = document.createElement("h1");
            title.textContent = data.title;
            header.appendChild(title);
            document.body.insertBefore(header, document.body.firstChild);

            // Create and append the nav element
            const nav = document.createElement("nav");
            const ul = document.createElement("ul");

            data.menus[0].items.forEach((item) => {
                const li = document.createElement("li");
                const anchor = document.createElement("a");
                anchor.href = item.url;
                anchor.textContent = item.name;
                li.appendChild(anchor);
                ul.appendChild(li);
            });

            nav.appendChild(ul);
            header.insertAdjacentElement("afterend", nav);
        })
        .catch((error) => console.error("Error fetching header JSON:", error));

    // Fetch and generate the footer
    fetch("scripts/variables/footer.json")
        .then((response) => response.json())
        .then((footerData) => {
            const footer = document.createElement("footer");

            // Footer text
            const footerText = document.createElement("p");
            footerText.innerHTML = footerData.footerText.emText + "<br>" + footerData.footerText.designedBy;
            footer.appendChild(footerText);

            // Validation images
            Object.keys(footerData.validationImages).forEach((key) => {
                const link = document.createElement("a");
                link.href = footerData.validationImages[key].url + location.href;
                link.innerHTML = `<img style="border:0;width:88px;height:31px" 
                                    src="${footerData.validationImages[key].image}" 
                                    alt="${footerData.validationImages[key].alt}">`;
                footer.appendChild(link);
            });

            document.body.appendChild(footer);
        })
        .catch((error) => console.error("Error fetching footer JSON:", error));
});

// Functions to open validation tools
function validateHTML() {
    const currentURL = encodeURIComponent(window.location.href);
    window.open(`https://validator.w3.org/nu/?doc=${currentURL}`, "_blank");
}

function validateCSS() {
    const currentURL = encodeURIComponent(window.location.href);
    window.open(`https://jigsaw.w3.org/css-validator/validator?uri=${currentURL}&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en`, "_blank");
}

function validateAIM() {
    window.open("https://wave.webaim.org/report#", "_blank");
}
