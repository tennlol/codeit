// light/dark toggle with localStorage
const toggleBtn = document.getElementById("toggle-mode");
const body = document.body;

// load saved theme on page load
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  // save current theme
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
