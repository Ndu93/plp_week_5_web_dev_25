// ===== JAVASCRIPT FOR BreathSports WEBSITE =====

// DOM Elements
const exploreBtn = document.getElementById("exploreBtn");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("nav ul");
const newsletterForm = document.querySelector(".newsletter-form");
const postCards = document.querySelectorAll(".post-card");

// Variable declarations
let darkMode = false;
let viewCount = 0;
const popularSports = [
  "Football",
  "Basketball",
  "Tennis",
  "Athletics",
  "Swimming",
  "Cricket",
];

// Function to toggle mobile navigation menu
function toggleMobileMenu() {
  navMenu.classList.toggle("show");

  // Change icon based on menu state
  const icon = navToggle.querySelector("i");
  if (navMenu.classList.contains("show")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
}

// Function to toggle dark/light mode
function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode");

  // Save user preference to localStorage
  localStorage.setItem("darkMode", darkMode);

  // Show notification
  showNotification(`Dark mode ${darkMode ? "enabled" : "disabled"}`);
}

// Function to show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = darkMode ? "#333" : "#1a5fb4";
  notification.style.color = "white";
  notification.style.padding = "10px 20px";
  notification.style.borderRadius = "5px";
  notification.style.zIndex = "1000";
  notification.style.boxShadow = "0 3px 10px rgba(0,0,0,0.2)";

  // Add to document
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transition = "opacity 0.5s";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

// Function to handle newsletter form submission
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = e.target.querySelector('input[type="email"]');
  const email = emailInput.value;

  if (validateEmail(email)) {
    // Simulate subscription success
    showNotification("Thanks for subscribing to our newsletter!");
    emailInput.value = "";
  } else {
    showNotification("Please enter a valid email address.");
  }
}

// Function to validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Function to update view count (simulated)
function updateViewCount() {
  viewCount++;
  console.log(`Page viewed ${viewCount} times`);

  // Update view count display if it exists
  const viewCountEl = document.getElementById("viewCount");
  if (viewCountEl) {
    viewCountEl.textContent = viewCount;
  }
}

// Function to simulate popular sports list with loop
function displayPopularSports() {
  console.log("Popular sports on our site:");

  // Using a for loop to iterate through sports array
  for (let i = 0; i < popularSports.length; i++) {
    console.log(`${i + 1}. ${popularSports[i]}`);
  }

  // Using forEach method (another type of loop)
  console.log("Also popular:");
  popularSports.forEach((sport) => {
    if (sport !== "Football" && sport !== "Basketball") {
      console.log(`- ${sport}`);
    }
  });
}

// Event Listeners
exploreBtn.addEventListener("click", () => {
  // Using conditional to determine message
  const message = darkMode
    ? "Exploring articles in dark mode!"
    : "Exploring articles in light mode!";
  showNotification(message);

  // Scroll to featured posts section
  document.querySelector(".featured-posts").scrollIntoView({
    behavior: "smooth",
  });
});

navToggle.addEventListener("click", toggleMobileMenu);

newsletterForm.addEventListener("submit", handleNewsletterSubmit);

// Add click event to each post card using loop
postCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    showNotification(`Opening article ${index + 1}...`);
  });
});

// Add dark mode toggle on double-click anywhere
document.addEventListener("dblclick", toggleDarkMode);

// Initialize page
function init() {
  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    darkMode = true;
    document.body.classList.add("dark-mode");
  }

  // Update view count
  updateViewCount();

  // Display popular sports in console
  displayPopularSports();

  // Show welcome message after a delay
  setTimeout(() => {
    showNotification(
      "Welcome to SportSphere! Double-click anywhere to toggle dark mode."
    );
  }, 2000);
}

// Run initialization when DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
