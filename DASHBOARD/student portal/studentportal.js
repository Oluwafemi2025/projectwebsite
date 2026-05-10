const form = document.getElementById("form");
const matricNumber = document.getElementById("matric-no");
const password = document.getElementById("pword");
const confirm_password = document.getElementById("Cpword");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents the page from submitting as it should do
  if(validateInputs()){
      window.location.href = "student-dashboard.html";

  };
});

matricNumber.addEventListener("input", () => {
  this.value = this.value.toLowerCase();
});

const setSuccess = (element, message) => {
  const inputControl = element.parentElement; //takes the parent element that will be holding the parent class in the next line
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const setError = (element, message) => {
  const inputControl = element.parentElement;
  // element is assumed to be DOM element
  // .parentElement means get the parent HTML element that directly contains this element
  const errorDisplay = inputControl.querySelector(".error");
  // here we are inside the parent element holding the error container i.e the division with the input-control class name
  // .querySelector('.error') selects the first child with the class error
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const validateInputs = () => {
  const matricNovalue = matricNumber.value.trim();
  const pValue = password.value.trim();
  const password2Value = confirm_password.value.trim();

  let isValid = true; // isValid starts at true meaning it assumes the form is valid, whenever any of the inputs is wrong it changes its value to false

  if (matricNovalue === "" || matricNovalue === null) {
    setError(matricNumber, "Please enter your matriculation number");
    isValid = false;
  } else {
    setSuccess(matricNumber);
  }

  if (pValue === "" || pValue === null) {
    setError(password, "Password is required please");
    isValid = false;
  } else if (pValue.length < 8) {
    setError(password, "Password must be at least 8 characters");
    isValid = false;
  } else {
    setSuccess(password);
  }

  if (password2Value === "" || password2Value === null) {
    setError(confirm_password, "Please confirm your password");
    isValid = false;
  } else if (password2Value !== pValue) {
    setError(confirm_password, "Password does not match");
    isValid = false;
  } else {
    setSuccess(confirm_password);
  }

  if(isValid){
      const studentData = {
      matric: matricNumber.value.trim(),
      password: password.value.trim(),
      confirmPassword: confirm_password.value.trim()
    };

    localStorage.setItem("studentData", JSON.stringify(studentData));
  }

  return isValid; // will return true if everything is valid and false if nothing is valid

};