// Account settings functionality
document.addEventListener('DOMContentLoaded', function() {
  loadAccountData();
  setupEventListeners();
});

// Load account data from localStorage
function loadAccountData() {
  // Load student data from dashboard
  const studentAccountData = JSON.parse(localStorage.getItem('studentAccountData'));
  const studentResultsData = JSON.parse(localStorage.getItem('studentResultsData'));
  
  // Update personal information if elements exist
  updatePersonalInfo(studentAccountData);
  
  // Load payment data
  const paymentData = JSON.parse(localStorage.getItem('studentPaymentData')) || {
    totalPaid: 0,
    payments: []
  };

  const totalFees = 2565000;
  const outstanding = totalFees - paymentData.totalPaid;

  // Update payment information
  const paidEl = document.getElementById('account-paid');
  const outstandingEl = document.getElementById('account-outstanding');
  if (paidEl) paidEl.textContent = formatCurrency(paymentData.totalPaid);
  if (outstandingEl) outstandingEl.textContent = formatCurrency(outstanding);

  // Update payment status
  const statusEl = document.getElementById('account-status');
  if (statusEl) {
    if (outstanding === 0) {
      statusEl.textContent = 'Paid in Full';
      statusEl.style.color = '#28a745';
    } else if (paymentData.totalPaid >= 1282500) {
      statusEl.textContent = 'Partially Paid';
      statusEl.style.color = '#ffc107';
    } else {
      statusEl.textContent = 'Unpaid';
      statusEl.style.color = '#dc3545';
    }
  }

  // Load CGPA from results data
  const cgpaEl = document.getElementById('account-cgpa');
  if (cgpaEl && studentResultsData) {
    cgpaEl.textContent = studentResultsData.overall.cgpa;
  }
}

// Update personal information in the account page
function updatePersonalInfo(studentData) {
  if (!studentData) return;
  
  // Update welcome message
  const welcomeMessage = document.querySelector('.welcome-message');
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${studentData.personalInfo.firstName}`;
  }
  
  // Update personal info fields
  const infoItems = document.querySelectorAll('.info-item');
  infoItems.forEach(item => {
    const label = item.querySelector('label');
    const span = item.querySelector('span');
    if (!label || !span) return;
    
    switch(label.textContent) {
      case 'Full Name:':
        span.textContent = studentData.personalInfo.fullName;
        break;
      case 'Matriculation Number:':
        span.textContent = studentData.personalInfo.matricNumber;
        break;
      case 'Email:':
        span.textContent = studentData.personalInfo.email;
        break;
      case 'Phone:':
        span.textContent = studentData.personalInfo.phone;
        break;
      case 'Date of Birth:':
        span.textContent = studentData.personalInfo.dateOfBirth;
        break;
      case 'Gender:':
        span.textContent = studentData.personalInfo.gender;
        break;
      case 'Department:':
        span.textContent = studentData.academicInfo.department;
        break;
      case 'Faculty:':
        span.textContent = studentData.academicInfo.faculty;
        break;
      case 'Current Level:':
        span.textContent = studentData.academicInfo.currentLevel;
        break;
      case 'Admission Year:':
        span.textContent = studentData.academicInfo.admissionYear;
        break;
      case 'Expected Graduation:':
        span.textContent = studentData.academicInfo.expectedGraduation;
        break;
    }
  });
}


// Setup event listeners
function setupEventListeners() {
  // Dropdown functionality
  const dropdownToggle = document.getElementById('dropdownToggle');
  const portalsDropdown = document.querySelector('.portals-dropdown');

  if (dropdownToggle && portalsDropdown) {
    dropdownToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      portalsDropdown.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
      if (!portalsDropdown.contains(event.target)) {
        portalsDropdown.classList.remove('active');
      }
    });
  }
}

// Account action functions
function changePassword() {
  const newPassword = prompt('Enter your new password (minimum 6 characters):');
  if (newPassword && newPassword.length >= 6) {
    // Simulate password change
    showNotification('Password changed successfully!', 'success');
    
    // Update stored data
    const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
    studentData.lastPasswordChange = new Date().toISOString();
    localStorage.setItem('studentData', JSON.stringify(studentData));
  } else if (newPassword !== null) {
    showNotification('Password must be at least 6 characters long!', 'error');
  }
}

function updateProfile() {
  const phone = prompt('Enter your new phone number:');
  if (phone && phone.trim()) {
    // Simulate profile update
    showNotification('Profile updated successfully!', 'success');
    
    // Update displayed phone number
    const phoneElements = document.querySelectorAll('.info-item span');
    phoneElements.forEach(el => {
      if (el.previousElementSibling && el.previousElementSibling.textContent === 'Phone:') {
        el.textContent = phone;
      }
    });
  }
}

function downloadTranscript() {
  showNotification('Generating transcript... Download will start shortly.', 'info');
  
  // Simulate download delay
  setTimeout(() => {
    showNotification('Transcript downloaded successfully!', 'success');
  }, 2000);
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    showNotification('Logging out...', 'info');
    
    setTimeout(() => {
      // Clear localStorage and redirect to student portal
      localStorage.clear();
      window.location.href = 'student-portal.html';
    }, 1000);
  }
}

// Show notification function
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notif => notif.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fa-solid ${getNotificationIcon(type)}"></i>
    <span>${message}</span>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function getNotificationIcon(type) {
  switch(type) {
    case 'success': return 'fa-check-circle';
    case 'error': return 'fa-exclamation-circle';
    case 'info': return 'fa-info-circle';
    default: return 'fa-info-circle';
  }
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount);
}