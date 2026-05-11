// Student data object - centralized student information (defaults)
const defaultStudentData = {
  personalInfo: {
    fullName: "Godwin Goje",
    firstName: "Godwin",
    matricNumber: "CSC/2020/001",
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

// Merge with existing account data and respect matric number from login
const existingAccount = JSON.parse(localStorage.getItem('studentAccountData')) || null;
const currentMatric = localStorage.getItem('currentMatricNumber');
const studentData = existingAccount ? {
  ...existingAccount,
  personalInfo: {
    ...existingAccount.personalInfo,
    matricNumber: currentMatric || existingAccount.personalInfo?.matricNumber || defaultStudentData.personalInfo.matricNumber
  }
} : {
  ...defaultStudentData,
  personalInfo: {
    ...defaultStudentData.personalInfo,
    matricNumber: currentMatric || defaultStudentData.personalInfo.matricNumber
  }
};

// Store student data in localStorage for other pages to access
localStorage.setItem('studentAccountData', JSON.stringify(studentData));

// Results data for GPA/CGPA calculation
const resultsData = {
  '300-1': {
    gpa: 4.60,
    cgpa: 4.45
  },
  '300-2': {
    gpa: 4.50,
    cgpa: 4.45
  },
  overall: {
    cgpa: 4.45
  }
};

// Store results data in localStorage
localStorage.setItem('studentResultsData', JSON.stringify(resultsData));

// Payment system constants
const TOTAL_FEES = 2565000; // ₦2,565,000
const MINIMUM_PAYMENT = 1282500; // 50% minimum

// Update dashboard data on page load
document.addEventListener('DOMContentLoaded', function() {
  loadStudentInfo();
  updatePaymentStatus();
  updateDashboardData();
  updateFeesStatus();
  setupDropdownMenus();
});

// Load student information into dashboard
function loadStudentInfo() {
  // Update welcome message
  const welcomeMessage = document.querySelector('.welcome-message');
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${studentData.personalInfo.firstName}`;
  }

  // Update profile info
  const profileName = document.querySelector('.profile-info h3');
  const profileMatric = document.querySelector('.profile-info p:first-of-type');
  const profileLevel = document.querySelector('.profile-info p:last-of-type');

  if (profileName) profileName.textContent = studentData.personalInfo.firstName;
  if (profileMatric) profileMatric.textContent = studentData.personalInfo.matricNumber;
  if (profileLevel) profileLevel.textContent = `${studentData.academicInfo.currentLevel}, ${studentData.academicInfo.department}`;
}

// Setup dropdown menus
function setupDropdownMenus() {
  // Header dropdown (Welcome Godwin)
  const headerDropdownToggle = document.querySelector('.navbar-right .dropdown a');
  const headerDropdownMenu = document.querySelector('.navbar-right .dropdown-menu');

  if (headerDropdownToggle && headerDropdownMenu) {
    headerDropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      headerDropdownMenu.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!headerDropdownToggle.contains(e.target) && !headerDropdownMenu.contains(e.target)) {
        headerDropdownMenu.classList.remove('active');
      }
    });
  }

  // Mobile portals dropdown (toggle parent container)
  const dropdownToggle = document.getElementById('dropdownToggle');
  const portalsDropdown = document.querySelector('.portals-dropdown');

  if (dropdownToggle && portalsDropdown) {
    dropdownToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      portalsDropdown.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', function(event) {
      if (!portalsDropdown.contains(event.target)) {
        portalsDropdown.classList.remove('active');
      }
    });
  }
}

// Update payment status display
function updatePaymentStatus() {
  const paymentData = JSON.parse(localStorage.getItem('studentPaymentData')) || {
    totalPaid: 0,
    payments: []
  };

  const outstanding = TOTAL_FEES - paymentData.totalPaid;
  const feesStatusEl = document.getElementById('fees-status');

  if (feesStatusEl) {
    if (outstanding === 0) {
      feesStatusEl.innerHTML = '<span style="color: #28a745; font-weight: bold;">✓ Paid in Full - ₦2,565,000</span>';
    } else if (paymentData.totalPaid >= MINIMUM_PAYMENT) {
      feesStatusEl.innerHTML = `Outstanding: ₦${outstanding.toLocaleString()} (Paid: ₦${paymentData.totalPaid.toLocaleString()})`;
    } else {
      feesStatusEl.innerHTML = `Pay at least 50% (₦${MINIMUM_PAYMENT.toLocaleString()}) of ₦${TOTAL_FEES.toLocaleString()}`;
    }
  }
}

// Mobile menu toggle functionality
const menuBtn = document.querySelector(".menu-toggle");
const mobileDropdown = document.getElementById("mobileDropdown");

if (menuBtn && mobileDropdown) {
  menuBtn.addEventListener("click", function () {
    mobileDropdown.style.display =
      mobileDropdown.style.display === "block" ? "none" : "block";
  });

  // Hide dropdown when resizing up
  window.addEventListener("resize", function () {
    if (window.innerWidth > 700) {
      mobileDropdown.style.display = "none";
    }
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth <= 700 &&
      !e.target.closest(".menu-toggle") &&
      !e.target.closest("#mobileDropdown")
    ) {
      mobileDropdown.style.display = "none";
    }
  });
}

// Dropdown functionality
// Update dashboard data (GPA, hostel status, etc.)
function updateDashboardData() {
  try {
    // Load CGPA from results data
    const storedResultsData = JSON.parse(localStorage.getItem('studentResultsData')) || resultsData;
    const dashboardGpaEl = document.getElementById('dashboard-gpa');
    if (dashboardGpaEl && storedResultsData && storedResultsData.overall) {
      dashboardGpaEl.textContent = storedResultsData.overall.cgpa;
    }

    // Update level display
    const dashboardLevelEl = document.getElementById('dashboard-level');
    if (dashboardLevelEl && studentData && studentData.academicInfo) {
      dashboardLevelEl.textContent = studentData.academicInfo.currentLevel.replace(' Level', '');
    }

    // Load hostel data
    const hostelData = JSON.parse(localStorage.getItem('studentHostel')) || { allocated: false, room: null };
    const hostelStatus = hostelData.allocated ? `Room ${hostelData.room}` : 'Not Allocated';
    const dashboardHostelEl = document.getElementById('dashboard-hostel');
    if (dashboardHostelEl) {
      dashboardHostelEl.textContent = hostelStatus;
    }
  } catch (error) {
    console.error('Error updating dashboard data:', error);
  }
}

// Update fees status display
function updateFeesStatus() {
  try {
    const paymentData = JSON.parse(localStorage.getItem('studentPaymentData')) || {
      totalPaid: 0,
      payments: []
    };

    const totalFees = 2565000;
    const outstanding = totalFees - paymentData.totalPaid;

    // Update school fees status
    const schoolFeesEl = document.getElementById('school-fees-status');
    if (schoolFeesEl) {
      if (outstanding === 0) {
        schoolFeesEl.textContent = '₦2,565,000 (Paid)';
        schoolFeesEl.style.color = '#28a745';
      } else if (paymentData.totalPaid >= 1282500) {
        schoolFeesEl.textContent = `₦${outstanding.toLocaleString()} outstanding (Paid: ₦${paymentData.totalPaid.toLocaleString()})`;
        schoolFeesEl.style.color = '#ffc107';
      } else {
        schoolFeesEl.textContent = `₦${outstanding.toLocaleString()} (Unpaid)`;
        schoolFeesEl.style.color = '#dc3545';
      }
    }

    // Update accommodation status
    const accommodationEl = document.getElementById('accommodation-status');
    if (accommodationEl) {
      const hostelData = JSON.parse(localStorage.getItem('studentHostel')) || { allocated: false };
      if (hostelData.allocated) {
        accommodationEl.textContent = 'Paid & Allocated';
        accommodationEl.style.color = '#28a745';
      } else {
        accommodationEl.textContent = 'Not Paid';
        accommodationEl.style.color = '#dc3545';
      }
    }

    // Update dashboard fees status
    const dashboardFeesEl = document.getElementById('dashboard-fees-status');
    if (dashboardFeesEl) {
      if (outstanding === 0) {
        dashboardFeesEl.textContent = 'Paid';
        dashboardFeesEl.style.color = '#28a745';
      } else if (paymentData.totalPaid >= 1282500) {
        dashboardFeesEl.textContent = 'Partial';
        dashboardFeesEl.style.color = '#ffc107';
      } else {
        dashboardFeesEl.textContent = 'Unpaid';
        dashboardFeesEl.style.color = '#dc3545';
      }
    }
  } catch (error) {
    console.error('Error updating fees status:', error);
  }
}

// Toggle fees dropdown
function toggleFeesDropdown() {
  const content = document.getElementById('feesContent');
  const toggle = document.querySelector('.fees-toggle i');

  if (content.classList.contains('active')) {
    content.classList.remove('active');
    if (toggle) toggle.style.transform = 'rotate(0deg)';
  } else {
    content.classList.add('active');
    if (toggle) toggle.style.transform = 'rotate(180deg)';
  }
}

// Make function globally available
window.toggleFeesDropdown = toggleFeesDropdown;
document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggle = document.getElementById('dropdownToggle');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', function() {
      dropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
      if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('active');
      }
    });
  }
});
