// =====================
// Smooth Scrolling
// =====================
document.querySelectorAll('.portals a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()
    const target = document.querySelector(link.getAttribute('href'))
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  })
})

// =====================
// Scroll Reveal Animations
// =====================
const revealElements = document.querySelectorAll('.grid-cards, .more-resources ul li')

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.2 })

revealElements.forEach(el => observer.observe(el))

// =====================
// Dark Mode Toggle


const toggleBtn = document.getElementById('darkModeToggle')

// Initialize from localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark')
  toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode'
} else {
  toggleBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode'
}

// Toggle Dark Mode on click
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark')

  // Add zoom animation each time toggle happens
  document.body.classList.add('theme-anim')
  setTimeout(() => document.body.classList.remove('theme-anim'), 600)

  if (document.body.classList.contains('dark')) {
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode'
    localStorage.setItem('theme', 'dark')
  } else {
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode'
    localStorage.setItem('theme', 'light')
  }
})

document.addEventListener('DOMContentLoaded', function () {
  const dropdownToggle = document.getElementById('dropdownToggle');
  const dropdownMenu = document.getElementById('dropdownMenu');
  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', function () {
      if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
        dropdownMenu.classList.add('hide');
        setTimeout(() => dropdownMenu.classList.remove('hide'), 400); // match animation duration
      } else {
        dropdownMenu.classList.add('show');
      }
    });
    // Optional: close dropdown when clicking outside
    document.addEventListener('click', function (e) {
      if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        if (dropdownMenu.classList.contains('show')) {
          dropdownMenu.classList.remove('show');
          dropdownMenu.classList.add('hide');
          setTimeout(() => dropdownMenu.classList.remove('hide'), 400);
        }
      }
    });
  }
});

// =====================
// Login Form Handler
// =====================
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const matricNumber = document.getElementById('matricNumber').value;
      const password = document.getElementById('password').value;
      
      // Simple validation
      if (!matricNumber || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      // Store user data in localStorage (in a real app, this would be handled by backend)
      const userData = {
        matricNumber: matricNumber,
        name: 'Godwin Emeka',
        level: '300',
        department: 'Computer Science',
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('studentData', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Show loading state
      const loginBtn = document.querySelector('.login-btn');
      const originalText = loginBtn.innerHTML;
      loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';
      loginBtn.disabled = true;
      
      // Simulate login delay and redirect
      setTimeout(() => {
        window.location.href = 'student-dashboard.html';
      }, 1500);
    });
  }
  
  // Auto-fill demo credentials
  const matricInput = document.getElementById('matricNumber');
  const passwordInput = document.getElementById('password');
  
  if (matricInput && passwordInput) {
    // Add demo credentials hint
    matricInput.placeholder = 'Try: CSC/2020/001';
    passwordInput.placeholder = 'Try: password123';
  }
});

// =====================
// Dropdown Menu Handler
// =====================
document.addEventListener("DOMContentLoaded", function () {
  // The DOMContentLoaded event is a browser event that fires when the initial HTML document has been completely loaded and parsed, and the DOM is fully built. It does not wait for the external resourses like images, stylesheets, or iframes to finish downloading.
  // This ensures the elements we query(#dropdownToggle, .portals-dropdown) exist in the DOM before we try to access them
  const dropdownToggle = document.getElementById("dropdownToggle");
  const portalsDropdown = document.querySelector(".portals-dropdown");

  if (dropdownToggle && portalsDropdown) {
    // Guard clause: checks if both elements were found(truthy). If either is null, the code inside the if is skipped. This prevents runtime errors(e.g calling .addEventListener on null)
    dropdownToggle.addEventListener("click", function (e) {
      e.stopPropagation(); //Stops the link from bubbling up to parent elements
      portalsDropdown.classList.toggle("active"); // Toggles the active class on the container(.portals-dropdown), if active is present it removes it; if missing it adds it.
      // In the student.css .portals-dropdown.active .dropdown-menu{max-height: 500px;}- adding .active class causes the dropdown menu to expand via the max-height transition, removing active introduces the .hide class causing the dropdown-menu to collapse
    });

    // Close dropdown when clicking outside
    //When any click happens on the document, the browser automatically calls the function and passes an object that represents information about that event, it is usually named 'e' short for event, it contains all the information about that event, e.target means which element is triggered
    //When an event happens(like a click), the browser tracks which exact element was clicked
    //e.target gives information about the exact element that was clicked
    //It is used typically to know which speccific child element was clicked inorder to avoid/understand bubbling issues
    document.addEventListener("click", function (e) {
      //If the clicked elemeent is not inside the dropdown menu or the toggle button, the dropdown is closed by removing the active class
      if (!portalsDropdown.contains(e.target)) {
        portalsDropdown.classList.remove("active");
      }
    });
  }
});