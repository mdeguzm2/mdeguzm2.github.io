const introForm = document.getElementById("intro-form");
const addCourseButton = document.getElementById("add-course");
const resetButton = introForm.querySelector('input[type="reset"]');
const resultContainer = document.getElementById("result-form");

function resetFormDisplay() {
    introForm.reset();
    introForm.style.display = "block";
    resultContainer.innerHTML = "";
}

function submitForm() {
    const name = document.getElementById("name").value;
    const mascot = document.getElementById("mascot").value;
    const image = document.getElementById("image").value;
    const imageCaption = document.getElementById("image-caption").value;
    const personalBackground = document.getElementById("personal-background").value;
    const professionalBackground = document.getElementById("professional-background").value;
    const academicBackground = document.getElementById("academic-background").value;
    const webDevBackground = document.getElementById("web-dev-background").value;
    const computerPlatform = document.getElementById("computer-platform").value;
    const courses = Array.from(document.getElementsByClassName("course")).map((course) => course.value);
    const funnyThing = document.getElementById("funny-thing").value;
    const anythingElse = document.getElementById("anything-else").value;

    introForm.style.display = "none";
    resultContainer.innerHTML = `
      <h2>Introduction</h2>
      <h3>${name}'s "${mascot}"</h3>
      <figure>
          <img src="${image}" class="pfp" alt="${imageCaption}">
          <figcaption>${imageCaption}</figcaption>
      </figure>
      <ul>
          <li><b>Personal Background: </b>${personalBackground}</li>
          <li><b>Professional Background: </b>${professionalBackground}</li>
          <li><b>Academic Background: </b>${academicBackground}</li>
          <li><b>Background in Web Development: </b>${webDevBackground}</li>
          <li><b>Primary Computer Platform: </b>${computerPlatform}</li>
          <li><b>Courses I'm Taking: </b>
              <ul>
                  ${courses.map((course) => `<li><b>${course}</b></li>`).join("")}
              </ul>
          </li>
          <li><b>Funny/Interesting Item about Yourself: </b>${funnyThing}</li>
          <li><b>Anything Else: </b>${anythingElse}</li>
      </ul>
      <button id="restart-form">Fill Out the Form Again</button>
    `;

    document.getElementById("restart-form").addEventListener("click", resetFormDisplay);
}

function addCourse() {
    const coursesDiv = document.getElementById("courses");
    const newCourseDiv = document.createElement("div");
    newCourseDiv.innerHTML = `
        <label for="course">Enter Course:</label>
        <input type="text" class="course" placeholder="ITIS-3135" required>
    `;
    const delButton = document.createElement("button");
    delButton.type = "button";
    delButton.textContent = "Delete";
    delButton.onclick = function() {
        coursesDiv.removeChild(newCourseDiv);
        coursesDiv.removeChild(delButton);
    };
    coursesDiv.appendChild(newCourseDiv);
    coursesDiv.appendChild(delButton);
}

introForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitForm();
});
addCourseButton.addEventListener("click", addCourse);
resetButton.addEventListener("click", resetFormDisplay);
