// Listen for form submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page refresh

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // STUDENT
  if (email === "student@clubzone.com" && password === "student123") {
    localStorage.setItem("role", "student");
    localStorage.setItem("name", "Student");
    localStorage.setItem("club", "Science Club");
    localStorage.setItem("strand", "STEM");
    localStorage.setItem("section", "12-A");
    window.location.href = "dashboard.html";
  } 
  // OFFICER
  else if (email === "officer@clubzone.com" && password === "officer123") {
    localStorage.setItem("role", "officer");
    localStorage.setItem("name", "President");
    localStorage.setItem("club", "Debate Club");
    localStorage.setItem("position", "President");
    localStorage.setItem("strand", "ABM");
    localStorage.setItem("section", "11-B");
    window.location.href = "dashboard.html";
  } 
  // ADVISER
  else if (email === "adviser@clubzone.com" && password === "adviser123") {
    localStorage.setItem("role", "adviser");
    localStorage.setItem("name", "Adviser");
    localStorage.setItem("club", "Science Club");
    window.location.href = "dashboard.html";
  } 
  // INVALID LOGIN
  else {
    alert("Invalid email or password");
  }
});
