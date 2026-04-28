// const searchBar = document.getElementById("searchBar");

// console.log(searchBar);

// searchBar.addEventListener("keyup", (e) => {
//   console.log(e.target.value);
// });
const searchBar = document.getElementById("searchBar");
console.log(searchBar);
searchBar.addEventListener("input", function (e) {
  console.log(e.target.value);

  let term = this.value.trim();
  let elements = document.querySelectorAll(
    ".content p, .content h1, .content h2, .content h3, .content h4, .content h5, .content h6, .content span"
  );

  elements.forEach((el) => {
    // Remove old highlights
    el.innerHTML = el.textContent;

    if (term) {
      let regex = new RegExp(`(${term})`, "gi");
      el.innerHTML = el.textContent.replace(
        regex,
        '<span class="highlight">$1</span>'
      );
    }
  });
});

// document.getElementById("searchInput").addEventListener("input", function () {
//   let term = this.value.trim();
//   let elements = document.querySelectorAll(".content p, .content h1, .content h2, .content h3, .content h4, .content h5, .content h6, .content span");

//   elements.forEach(el => {
//     // Remove old highlights
//     el.innerHTML = el.textContent;

//     if (term) {
//       let regex = new RegExp(`(${term})`, "gi");
//       el.innerHTML = el.textContent.replace(regex, '<span class="highlight">$1</span>');
//     }
//   });
// });

let darkmode = localStorage.getItem("darkmode");
const toggleMode = document.getElementById("toggle");

const enabledarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};
const disabledarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", "null");
};

if (darkmode === "active") enabledarkMode();
// if (darkMode !== "active") disabledarkMode();

toggleMode.addEventListener("click", () => {
  let darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enabledarkMode() : disabledarkMode();
});

// // LOGOUT//
document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  // clear session/localStorage if used
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/staff portal/staffportaloginform.html"; // redirect only
});
