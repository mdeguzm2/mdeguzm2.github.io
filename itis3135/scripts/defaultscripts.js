document.addEventListener("DOMContentLoaded", function() {
    const greetButton = document.getElementById("greet-button");
    const polygonButton = document.getElementById("polygon-button");
    const dodoLocation = document.getElementById("dodo-location");
    const itemStock = document.getElementById("item-stock");
    const orderStatus = document.getElementById("order-status");
    const reviewButton = document.getElementById("review-submit");

    function displayDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        const dateTimeString = now.toLocaleString('en-US', options);
        document.getElementById('date-time').textContent = `Today is ${dateTimeString}`; // Use backticks for template literal
    }

    function greetUser() {
        const name = document.getElementById('name').value;
        const mood = document.getElementById('mood').value.toLowerCase();
        if (name && mood) {
            document.getElementById('greeting').textContent = `Modern Dodo welcomes you, ${name}! We're glad you are doing ${mood}!`;
        } else {
            document.getElementById('greeting').textContent = 'Please enter your name and mood.';
            return;
        }
    }

    function getPolygonName() {
        let number = Math.abs(Math.round(parseFloat(document.getElementById("favorite-number").value)));
        if (number >= 0 && number <= 10) {
            const polygons = {
                0: "Does not exist",
                1: "monogon (or monogon)",
                2: "bigon (or digon)",
                3: "triangle (or trigon)",
                4: "quadrilateral (or tetragon)",
                5: "pentagon",
                6: "hexagon",
                7: "heptagon",
                8: "octagon",
                9: "nonagon",
                10: "decagon"
            };
            alert("The polygon with " + number + " sides is called a " + polygons[number]);
        } else {
            alert("Please enter a number between 0 and 10");
        }
    }

    function getLocation() {
        const locations = [
            "The dodo is in a forest!",
            "The dodo is in a desert!",
            "The dodo is at a waterfall!",
            "The dodo is at the mountains!"
        ];
        alert(locations[Math.floor(Math.random() * locations.length)]);
    }

    function getStock() {
        const items = Math.floor(Math.random() * (5000-1000+1)+1000);
        alert("There are " + items + " items in stock.");
    }

    function checkOrderStatus() {
        const status = [
            "Your order has not been shipped yet.",
            "Your order is being handed to the shipment carrier.",
            "Your order is on the way.",
            "Your order is out for delivery,",
            "Your order has been delivered"
        ];
        alert(status[Math.floor(Math.random() * status.length)]);
    }
    function submitReview() {
        const reviewInput = document.getElementById("review");
        if (reviewInput.value.trim() === '') {
            alert("Please enter a review before submitting.");
        } else {
            alert("Review submitted, thank you!");
            reviewInput.value = '';
        }
    }

    greetButton.addEventListener("click", greetUser);
    polygonButton.addEventListener("click", getPolygonName);
    dodoLocation.addEventListener("click", getLocation);
    itemStock.addEventListener("click", getStock);
    orderStatus.addEventListener("click", checkOrderStatus);
    reviewButton.addEventListener("click", submitReview);

    displayDateTime();
});
