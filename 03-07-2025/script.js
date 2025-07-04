const formTitle = document.getElementById("form-title");
const signupForm = document.getElementById("signup-form");
const usernameGroup = document.getElementById("signup-username-group");
const confirmGroup = document.getElementById("signup-confirm-group");
const formBtn = document.getElementById("form-btn");
const toggleText = document.getElementById("toggle-text");
const toggleLink = document.getElementById("toggle-link");
let isSignUp = true;

toggleLink.addEventListener("click", function (e) {
  e.preventDefault();
  isSignUp = !isSignUp;
  if (isSignUp) {
    formTitle.textContent = "Sign Up";
    usernameGroup.style.display = "";
    confirmGroup.style.display = "";
    formBtn.textContent = "Sign Up";
    document.getElementById("google-btn").textContent = "Sign Up with Google";
    toggleText.innerHTML =
      'Already have an account? <a href="#" id="toggle-link">Sign In</a>';
  } else {
    formTitle.textContent = "Sign In";
    usernameGroup.style.display = "none";
    confirmGroup.style.display = "none";
    formBtn.textContent = "Sign In";
    document.getElementById("google-btn").textContent = "Sign In with Google";
    toggleText.innerHTML =
      'Don\'t have an account? <a href="#" id="toggle-link">Sign Up</a>';
  }
  // Re-attach event listener to new link
  document
    .getElementById("toggle-link")
    .addEventListener("click", arguments.callee);
});
// Google button click handler (placeholder)
document.getElementById("google-btn").addEventListener("click", function () {
  if (isSignUp) {
    alert("Sign Up with Google clicked! (Integrate Google OAuth here)");
  } else {
    alert("Sign In with Google clicked! (Integrate Google OAuth here)");
  }
});
