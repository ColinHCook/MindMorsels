function nextNugget() {
  fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("nugget").textContent = data.text;
    })
    .catch((error) => {
      console.error("Error fetching the fun fact:", error);
      document.getElementById("nugget").textContent =
        "Oops! Something went wrong. Please try again.";
    });
}

// Adjust nextNugget function to consider user preferences
function nextNugget() {
  fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const fact = data.text;
      const likedFacts = JSON.parse(localStorage.getItem("likedFacts")) || [];
      const dislikedFacts =
        JSON.parse(localStorage.getItem("dislikedFacts")) || [];

      // Simple curation logic: avoid facts that were disliked
      if (!dislikedFacts.includes(fact)) {
        document.getElementById("nugget").textContent = fact;
      } else {
        // Fetch another fact if it's disliked
        nextNugget();
      }
    })
    .catch((error) => {
      console.error("Error fetching the fun fact:", error);
      document.getElementById("nugget").textContent =
        "Oops! Something went wrong. Please try again.";
    });
}

function showPopup(message) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  popupMessage.textContent = message;
  popup.style.display = "block";
  popup.classList.add("opacity-100");
  popup.classList.remove("opacity-0");

  // Hide the popup after 3 seconds
  setTimeout(() => {
    popup.classList.add("opacity-0");
    popup.classList.remove("opacity-100");
    setTimeout(() => {
      popup.style.display = "none";
    }, 300); // Match the transition duration
  }, 3000);
}

function likeNugget() {
  const currentNugget = document.getElementById("nugget").textContent;
  let likedFacts = JSON.parse(localStorage.getItem("likedFacts")) || [];
  likedFacts.push(currentNugget);
  localStorage.setItem("likedFacts", JSON.stringify(likedFacts));
  showPopup("Thank you! We will show you more facts like this.");
}

function dislikeNugget() {
  const currentNugget = document.getElementById("nugget").textContent;
  let dislikedFacts = JSON.parse(localStorage.getItem("dislikedFacts")) || [];
  dislikedFacts.push(currentNugget);
  localStorage.setItem("dislikedFacts", JSON.stringify(dislikedFacts));
  showPopup("Got it! We will show you fewer facts like this.");
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector('button[onclick="nextNugget()"]')
    .addEventListener("click", nextNugget);
  document.getElementById("like-button").addEventListener("click", likeNugget);
  document
    .getElementById("dislike-button")
    .addEventListener("click", dislikeNugget);

  // Fetch a new nugget when the page loads (on new tab)
  nextNugget();
});
