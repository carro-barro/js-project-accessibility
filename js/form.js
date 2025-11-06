document.addEventListener("DOMContentLoaded", () => {

  //Get references to HTML elements
  const userInfoForm = document.getElementById("user-info-form")
  const applicationSection = document.getElementById("application")
  const applicationNote = document.getElementById('application-note')
  const nameInput = document.getElementById('name')
  const emailInput = document.getElementById('email')
  const nameError = document.getElementById('name-error')
  const emailError = document.getElementById('email-error')
  const announcer = document.getElementById('announcer')

  //// Real-time validation for email input
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, errorElement, message) {
    input.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
    errorElement.hidden = false;
  }

  function clearError(input, errorElement) {
    input.removeAttribute('aria-invalid')
    errorElement.textContent = '';
    errorElement.hidden = true;
  }

  function announce(message) {
    announcer.textContent = ''

    setTimeout(() => {
      announcer.textContent = message;
    }, 100);
  }

  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim()) {
      clearError(nameInput, nameError);
    }
  });

  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim()) {
      if (isValidEmail(emailInput.value)) {
        clearError(emailInput, emailError);
      }
    }
  })

  //Listen for when the user submits the form
  userInfoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //Get the users name from the input field
    let userName = nameInput.value.trim();
    let userEmail = emailInput.value.trim();
    let isValid = true;

    //Validation of name if not = error message
    if (!userName) {
      showError(nameInput, nameError, 'Enter your name');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    //Validation of email after submition, if not = error message
    if (!userEmail) {
      showError(emailInput, emailError, 'Enter your email address');
      isValid = false;
    } else if (!isValidEmail(userEmail)) {
      showError(emailInput, emailError, 'Enter a valid email address');
      announce('Email is invalid. Please correct it.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    //UpperCase first letter of name
    if (userName.length > 0) {
      userName = userName.charAt(0).toUpperCase() + userName.slice(1)
    }

    //collect all form data (name, email, genre)
    const formData = new FormData(userInfoForm);
    const userAnswer = Object.fromEntries(formData);

    //User must select a genre before continuing
    if (!userAnswer.genre) {
      alert("Choose a genre before you continue!");
      isValid = false;
    }

    //Only show applicationNote if all fields are valid
    if (isValid) {
      let feedback = userName
      // Add a message depending on which genre the user selected
      if (userAnswer.genre === "genre-fantasy") {
        feedback += " you are now a member! Fantasy recommendations are coming your way!";
      } else if (userAnswer.genre === "genre-thriller") {
        feedback += " you are now a member! Thriller recommendations are coming your way!";
      } else if (userAnswer.genre === "genre-novel") {
        feedback += " you are now a member! Novel recommendations are coming your way!"
      } else if (userAnswer.genre === "genre-all") {
        feedback += " you are now a member! Fantasy, Thriller and Novel recommendations are coming your way!"
      }

      // Show the section that displays the feedback message
      applicationSection.hidden = false;
      // Insert the final message into the HTML
      applicationNote.textContent = feedback;
      // Smoothly scroll down to the section with the result
      applicationSection.scrollIntoView({ behavior: "smooth" });
      // Set focus on the section (for accessibility / screen readers)
      applicationSection.setAttribute('tabindex', '-1');
      applicationSection.focus();
    }
  });

  // Arrow Key navigation for radio buttons
  const radioGroups = document.querySelectorAll('fieldset');

  radioGroups.forEach(group => {
    const radios = group.querySelectorAll('input[type="radio"]');

    radios.forEach((radio, index) => {
      radio.addEventListener('keydown', (event) => {
        let newIndex;

        switch (event.key) {
          case 'ArrowDown':
          case 'ArrowRight':
            event.preventDefault();
            newIndex = (index + 1) % radios.length;
            radios[newIndex].focus();
            radios[newIndex].checked = true;
            break;

          case 'ArrowUp':
          case 'ArrowLeft':
            event.preventDefault();
            newIndex = (index - 1 + radios.length) % radios.length;
            radios[newIndex].focus();
            radios[newIndex].checked = true;
            break;

          case 'Home':
            event.preventDefault();
            radios[0].focus();
            radios[0].checked = true;
            break;

          case 'End':
            event.preventDefault();
            radios[radios.length - 1].focus();
            radios[radios.length - 1].checked = true;
            break;

          case ' ':
          case 'Enter':
            event.preventDefault();
            radio.checked = true;
            break;
        }
      });
    });
  });


});
