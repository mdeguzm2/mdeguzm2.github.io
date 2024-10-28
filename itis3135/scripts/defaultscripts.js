function displayDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const dateTimeString = now.toLocaleString('en-US', options);
    document.getElementById('date-time').textContent = 'Today is ${dateTimeString}';
}

function greetUser() {
    const name = document.getElementById('name').value;
    const mood = document.getElementById('mood').value;
    const favoriteNumber = parseFloat(document.getElementById('favorite-number').value);

    if (name && mood) {
        document.getElementById('greeting').textContent = `Hello ${name}! We're glad you are doing ${mood}!`;
    } else {
        document.getElementById('greeting').textContent = 'Please enter your name and mood.';
        return;
    }
}


function getPolygonName(sides) {
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

document.getElementById('submit').addEventListener('click', greetUser);
document.getElementById('polygon-button').addEventListener('click', getPolygonName);

document.addEventListener("DOMContentLoaded", function() {
    display_date();
});
