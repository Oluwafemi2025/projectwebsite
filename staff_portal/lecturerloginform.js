// ======= Checkbox & Custom Checkmark Logic =======
const checkbox = document.getElementById("checkbox");
const checkmark = document.querySelector(".checkmark");

checkmark.style.transition = "transform 0.4s ease, color 0.4s ease";

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    checkmark.style.color = "#006fca";
    checkmark.style.backgroundColor = "transparent";
    checkmark.style.borderColor = "transparent";
    checkmark.style.transform = "translateY(-10px)";
    checkmark.textContent = "✓";
    checkbox.style.display = "none";
  } else {
    checkmark.style.color = "white";
    checkmark.style.borderColor = "#ccc";
    checkmark.style.transform = "translateY(0)";
    checkmark.textContent = "";
    checkbox.style.display = "block";
  }
});

checkmark.addEventListener("click", () => {
  if (checkbox.checked) {
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event("change"));
  }
});

// ======= Checkbox Alignment =======
const container = document.getElementById("container");
const rememberText = container.querySelector("p");
container.style.display = "flex";
container.style.alignItems = "center";
rememberText.style.marginLeft = "0";
checkbox.style.marginRight = "0";

// ======= Loader =======
const loader = document.querySelector(".loader");
loader.style.display = "none"; // hide initially

// ======= Form Handling =======
const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const box = document.getElementById("box");

// Dummy user login data
const loginData = [
  { username: "maths/2021/0663", password: "Password2021@" },
  { username: "cmp/2024/0200", password: "Password2025@" },
];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateInputs()) {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    const matchedUser = loginData.find(
      (user) =>
        user.username.toLowerCase() === usernameValue.toLowerCase() &&
        user.password === passwordValue
    );

    if (matchedUser) {
      // Save to localStorage
      const userToStore = {
        username: usernameValue,
        password: passwordValue,
        rememberMe: checkbox.checked,
      };
      localStorage.setItem("loginData", JSON.stringify(userToStore));

      // Show loader and redirect after 2s
      loader.style.display = "flex";
      setTimeout(() => {
        // ✅ FIXED LINE 80
        window.location.href = "../DASHBOARD/lecturersdashboard.html";
      }, 2000);

    } else {
      setError(username, "Invalid username or password");
      setError(password, "");
    }
  }

  sessionStorage.clear("loginData");
});

// ======= Input Validation =======
const setError = (element, message) => {
  const input_wrapper = element.parentElement;
  const errorDisplay = input_wrapper.querySelector(".error");
  errorDisplay.innerText = message;
  input_wrapper.classList.add("error");
  input_wrapper.classList.remove("success");
};

const setSuccess = (element) => {
  const input_wrapper = element.parentElement;
  const errorDisplay = input_wrapper.querySelector(".error");
  errorDisplay.innerText = "";
  input_wrapper.classList.add("success");
  input_wrapper.classList.remove("error");
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  let isValid = true;

  if (usernameValue === "") {
    setError(username, "Username is required");
    isValid = false;
  } else {
    setSuccess(username);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
    isValid = false;
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters");
    isValid = false;
  } else {
    setSuccess(password);
  }

  return isValid;
};

// ======= Custom Alert =======
function showCustomAlert() {
  box.style.display = "flex";
}

function closeCustomAlert() {
  box.style.display = "none";
  form.reset();
}

// ======= Auto-Fill from localStorage =======
window.addEventListener("DOMContentLoaded", () => {
  const savedLoginData = localStorage.getItem("loginData");
  if (savedLoginData) {
    const {
      username: savedUsername,
      password: savedPassword,
      rememberMe,
    } = JSON.parse(savedLoginData);

    username.value = savedUsername || "";
    password.value = savedPassword || "";
    checkbox.checked = rememberMe;
    checkbox.dispatchEvent(new Event("change"));
  }
});
