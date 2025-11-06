document.addEventListener("DOMContentLoaded", () => {
  //Get references to HTML elements
  const userInfoForm = document.getElementById("user-info-form");
  const applicationSection = document.getElementById("application");
  const applicationNote = document.getElementById("application-note");

  //Listen for when the user submits the form
  userInfoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //Get the users name from the input field
    let userName = document.getElementById("name").value.trim();
    //UpperCase
    if (userName.length > 0) {
      userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    }
    //collect all form data (name, email, genre)
    const formData = new FormData(userInfoForm);
    //Convert from data into a normal javascript object
    const userAnswer = Object.fromEntries(formData);

    //User must select a genre before continuing
    if (!userAnswer.genre) {
      alert("Choose a genre before you continue!");
      return;
    }
    //Create a personalized thank-you message
    let feedback = userName;
    // Add a message depending on which genre the user selected
    if (userAnswer.genre === "genre-fantasy") {
      feedback +=
        " you are now a member! Fantasy recommendations are coming your way!";
    } else if (userAnswer.genre === "genre-thriller") {
      feedback +=
        " you are now a member! Thriller recommendations are coming your way!";
    } else if (userAnswer.genre === "genre-novel") {
      feedback +=
        " you are now a member! Novel recommendations are coming your way!";
    } else if (userAnswer.genre === "genre-all") {
      feedback +=
        " you are now a member! Fantasy, Thriller and Novel recommendations are coming your way!";
    }

    // Show the section that displays the feedback message
    applicationSection.hidden = false;
    // Insert the final message into the HTML
    applicationNote.textContent = feedback;
    // Smoothly scroll down to the section with the result
    applicationSection.scrollIntoView({ behavior: "smooth" });
    // Set focus on the section (for accessibility / screen readers)
    applicationSection.setAttribute("tabindex", "-1");
    applicationSection.focus();
  });
});
