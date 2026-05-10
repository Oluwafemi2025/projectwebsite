// =====================
// Student Portal Login Handler
// =====================
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("form");
  const matricNumber = document.getElementById("matric-no");
  const password = document.getElementById("pword");

  // Guard if elements are missing
  if (!form || !matricNumber || !password) return;

  // Auto-convert matric number to lowercase and prefill requested default
  const defaultMatric = "22/eng02/032";
  if (!matricNumber.value) matricNumber.value = defaultMatric;
  matricNumber.addEventListener("input", function() {
    this.value = this.value.toLowerCase();
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (validateInputs()) {
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';
      submitBtn.disabled = true;
      
      // Simulate login process
      setTimeout(() => {
        const enteredMatric = matricNumber.value.trim();
        // Store user session data
        const userData = {
          matricNumber: enteredMatric,
          name: 'Godwin Goje',
          level: '300',
          department: 'Computer Science',
          loginTime: new Date().toISOString(),
          isLoggedIn: true
        };
        
        localStorage.setItem('studentData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentMatricNumber', enteredMatric);

        // Ensure account data exists and reflects the entered matric number
        const existingAccount = JSON.parse(localStorage.getItem('studentAccountData'));
        const defaultAccount = {
          personalInfo: {
            fullName: "Godwin Goje",
            firstName: "Godwin",
            matricNumber: enteredMatric,
            email: "godwin.goje@aru.edu.ng",
            phone: "+234 904 758 7753",
            dateOfBirth: "10th January, 2007",
            gender: "Male"
          },
          academicInfo: {
            department: "Computer Science",
            faculty: "Science and Technology",
            currentLevel: "300 Level",
            admissionYear: "2020",
            expectedGraduation: "2024"
          }
        };
        const accountToSave = existingAccount ? {
          ...existingAccount,
          personalInfo: { ...existingAccount.personalInfo, matricNumber: enteredMatric }
        } : defaultAccount;
        localStorage.setItem('studentAccountData', JSON.stringify(accountToSave));
        
        // Redirect to dashboard
        window.location.href = "student-dashboard.html";
      }, 1500);
    }
  });

  // Validation helper functions
  const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
  };

  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
  };

  // Input validation
  const validateInputs = () => {
    const matricNoValue = matricNumber.value.trim();
    const passwordValue = password.value.trim();
    let isValid = true;

    // Validate matriculation number
    if (matricNoValue === "" || matricNoValue === null) {
      setError(matricNumber, "Please enter your matriculation number");
      isValid = false;
    } else if (!/^\d{2}\/[a-z]{3}\d{2}\/\d{3}$/i.test(matricNoValue)) {
      setError(matricNumber, "Invalid format. Use: 22/eng02/032");
      isValid = false;
    } else {
      setSuccess(matricNumber);
    }

    // Validate password
    if (passwordValue === "" || passwordValue === null) {
      setError(password, "Password is required");
      isValid = false;
    } else if (passwordValue.length < 6) {
      setError(password, "Password must be at least 6 characters");
      isValid = false;
    } else {
      setSuccess(password);
    }

    return isValid;
  };

  // Demo credentials hint
  matricNumber.placeholder = "Try: 22/eng02/032";
  password.placeholder = "Try: password123";
});
