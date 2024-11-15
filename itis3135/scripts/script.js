document.addEventListener("DOMContentLoaded", function() {
    // Fetch JSON data
    fetch("scripts/variables/menu.json")
        .then((response) => response.json())
        .then((data) => {
            // Create the header element
            const header = document.createElement("header");

            // Create and add the title
            const title = document.createElement("h1");
            title.textContent = data.title;
            header.appendChild(title);

            // Process each menu in the JSON (assuming there are multiple menus)
            data.menus.forEach((menu) => {  // Wrap the argument in parentheses
                const nav = document.createElement("nav");

                // Add each item in the menu
                menu.items.forEach((item, index) => {  // Wrap the argument in parentheses
                    const menuItem = document.createElement("a");
                    menuItem.classList.add("menu-item");
                    menuItem.textContent = item.name;
                    menuItem.href = item.url;
                    nav.appendChild(menuItem);

                    // Add separator except after the last item
                    if (index < menu.items.length - 1) {
                        nav.appendChild(document.createTextNode(" | "));
                    }
                });

                // Append the nav to the header
                header.appendChild(nav);
            });

            // Add the generated header to the #header-container div
            const headerContainer = document.getElementById("header-container");
            headerContainer.appendChild(header);
        })
        .catch((error) => {  // Wrap the argument in parentheses
            console.error("Error fetching menu:", error);
        });

    // Fetch footer data
    fetch("scripts/variables/footer.json")
        .then((response) => {  // Wrap the argument in parentheses
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((footerData) => {  // Wrap the argument in parentheses
            // Create the footer
            const footer = document.createElement("footer");

            // Footer navigation links
            const footerNav = document.createElement("nav");
            footerData.footerNavLinks.forEach((link, index) => {  // Wrap the argument in parentheses
                const anchor = document.createElement("a");
                anchor.href = link.url;
                anchor.textContent = link.name;
                footerNav.appendChild(anchor);

                // Add separator except after the last link
                if (index < footerData.footerNavLinks.length - 1) {
                    footerNav.appendChild(document.createTextNode(" ~ "));
                }
            });
            footer.appendChild(footerNav);

            // Add footer text
            const emText = document.createElement("em");
            emText.textContent = footerData.footerText.emText;
            footer.appendChild(emText);

            const pDesignedBy = document.createElement("p");
            pDesignedBy.innerHTML = footerData.footerText.designedBy;
            footer.appendChild(pDesignedBy);

            const pCertification = document.createElement("p");
            pCertification.classList.add("certification");
            pCertification.innerHTML = footerData.footerText.certification;
            footer.appendChild(pCertification);

            // Add validation images
            Object.keys(footerData.validationImages).forEach((key) => {  // Wrap the argument in parentheses
                const validationImg = document.createElement("a");
                validationImg.href = footerData.validationImages[key].url + location.href;
                validationImg.innerHTML = `<img style="border:0;width:88px;height:31px" 
                    src="${footerData.validationImages[key].image}" 
                    alt="${footerData.validationImages[key].alt}">`;
                footer.appendChild(validationImg);
            });

            // Append the footer to the body
            const footerContainer = document.getElementById("footer-container");
            footerContainer.appendChild(footer);
        })
        .catch((error) => {  // Wrap the argument in parentheses
            console.error("Error fetching footer:", error);
        });
});

// Function to validate HTML
function validateHTML() {
    const currentURL = encodeURIComponent(window.location.href);
    window.open(`https://validator.w3.org/nu/?doc=${currentURL}`, "_blank");
}

// Function to validate CSS
function validateCSS() {
    const currentURL = encodeURIComponent(window.location.href);
    window.open(`https://jigsaw.w3.org/css-validator/validator?uri=${currentURL}&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en`, "_blank");
}

// Function to validate AIM (Accessibility, SEO, and Mobile-friendliness)
function validateAIM() {
    // Replace the URL with the tool you prefer for accessibility, SEO, and mobile-friendliness validation
    window.open("https://webaim.org/search/?q=afsd", "_blank");
}
