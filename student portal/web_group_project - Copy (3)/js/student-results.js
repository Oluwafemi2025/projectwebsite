// Sample results data
const resultsData = {
  '100-1': {
    title: '100 Level - 1st Semester',
    level: '100',
    courses: [
      { code: 'CSC 101', title: 'Introduction to Computer Science', units: 3, grade: 'A', points: 12 },
      { code: 'MTH 101', title: 'Mathematics I', units: 3, grade: 'B', points: 9 },
      { code: 'PHY 101', title: 'Physics I', units: 3, grade: 'A', points: 12 },
      { code: 'ENG 101', title: 'English Language', units: 2, grade: 'A', points: 8 },
      { code: 'GST 101', title: 'Use of Library', units: 1, grade: 'A', points: 4 }
    ],
    gpa: 4.50,
    cgpa: 4.50,
    outstanding: 'N/A'
  },
  '100-2': {
    title: '100 Level - 2nd Semester',
    level: '100',
    courses: [
      { code: 'CSC 102', title: 'Computer Programming', units: 3, grade: 'A', points: 12 },
      { code: 'MTH 102', title: 'Mathematics II', units: 3, grade: 'B+', points: 10.5 },
      { code: 'PHY 102', title: 'Physics II', units: 3, grade: 'A', points: 12 },
      { code: 'CHM 101', title: 'Chemistry I', units: 3, grade: 'B', points: 9 },
      { code: 'GST 102', title: 'Philosophy and Logic', units: 2, grade: 'A', points: 8 }
    ],
    gpa: 4.30,
    cgpa: 4.40,
    outstanding: 'N/A'
  },
  '200-1': {
    title: '200 Level - 1st Semester',
    level: '200',
    courses: [
      { code: 'CSC 201', title: 'Data Structures', units: 3, grade: 'A', points: 12 },
      { code: 'CSC 203', title: 'Discrete Mathematics', units: 3, grade: 'B+', points: 10.5 },
      { code: 'CSC 205', title: 'Computer Organization', units: 3, grade: 'A', points: 12 },
      { code: 'MTH 201', title: 'Statistics', units: 3, grade: 'A', points: 12 },
      { code: 'GST 201', title: 'Peace Studies', units: 2, grade: 'A', points: 8 }
    ],
    gpa: 4.50,
    cgpa: 4.45,
    outstanding: 'N/A'
  },
  '200-2': {
    title: '200 Level - 2nd Semester',
    level: '200',
    courses: [
      { code: 'CSC 202', title: 'Algorithms', units: 3, grade: 'A', points: 12 },
      { code: 'CSC 204', title: 'Database Systems', units: 3, grade: 'B+', points: 10.5 },
      { code: 'CSC 206', title: 'Operating Systems', units: 3, grade: 'A', points: 12 },
      { code: 'MTH 202', title: 'Linear Algebra', units: 3, grade: 'B', points: 9 },
      { code: 'GST 202', title: 'Entrepreneurship', units: 2, grade: 'A', points: 8 }
    ],
    gpa: 4.30,
    cgpa: 4.40,
    outstanding: 'N/A'
  },
  '300-1': {
    title: '300 Level - 1st Semester',
    level: '300',
    courses: [
      { code: 'CSC 301', title: 'Software Engineering', units: 3, grade: 'A', points: 12 },
      { code: 'CSC 303', title: 'Web Development', units: 3, grade: 'A', points: 12 },
      { code: 'CSC 305', title: 'Artificial Intelligence', units: 3, grade: 'B+', points: 10.5 },
      { code: 'CSC 307', title: 'Computer Networks', units: 3, grade: 'A', points: 12 },
      { code: 'GST 301', title: 'SIWES', units: 6, grade: 'A', points: 24 }
    ],
    gpa: 4.60,
    cgpa: 4.45,
    outstanding: 'CSC 309 (Project)'
  },
  '300-2': {
    title: '300 Level - 2nd Semester',
    level: '300',
    courses: [
      { code: 'CSC 302', title: 'Compiler Design', units: 3, grade: 'A', points: 12 },
      { code: 'CSC 304', title: 'Machine Learning', units: 3, grade: 'B+', points: 10.5 },
      { code: 'CSC 306', title: 'Cybersecurity', units: 3, grade: 'A', points: 12 },
      { code: 'CSC 308', title: 'Mobile Development', units: 3, grade: 'A', points: 12 },
      { code: 'GST 302', title: 'Research Methods', units: 2, grade: 'A', points: 8 }
    ],
    gpa: 4.50,
    cgpa: 4.45,
    outstanding: 'N/A'
  }
};

// Store results data in localStorage for other pages to access
localStorage.setItem('studentResultsData', JSON.stringify({
  '300-1': {
    gpa: resultsData['300-1'].gpa,
    cgpa: resultsData['300-1'].cgpa
  },
  '300-2': {
    gpa: resultsData['300-2'].gpa,
    cgpa: resultsData['300-2'].cgpa
  },
  overall: {
    cgpa: resultsData['300-2'].cgpa // Use latest CGPA
  }
}));

function showResult(semester) {
  const data = resultsData[semester];
  if (!data) return;

  // Update title
  const titleEl = document.getElementById('result-title');
  const levelEl = document.getElementById('student-level');
  if (titleEl) titleEl.textContent = data.title;
  if (levelEl) levelEl.textContent = data.level;

  // Populate courses table
  const tbody = document.getElementById('courses-body');
  if (tbody) {
    tbody.innerHTML = '';
    data.courses.forEach(course => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${course.code}</td>
        <td>${course.title}</td>
        <td>${course.units}</td>
        <td>${course.grade}</td>
        <td>${course.points}</td>
      `;
      tbody.appendChild(row);
    });
  }

  // Update summary
  const gpaEl = document.getElementById('gpa');
  const cgpaEl = document.getElementById('cgpa');
  const outstandingEl = document.getElementById('outstanding');
  if (gpaEl) gpaEl.textContent = data.gpa;
  if (cgpaEl) cgpaEl.textContent = data.cgpa;
  if (outstandingEl) outstandingEl.textContent = data.outstanding;

  // Show the result details
  const detailsEl = document.getElementById('result-details');
  if (detailsEl) detailsEl.style.display = 'block';
}

// Update student info in results pages
function updateStudentInfo() {
  const studentData = JSON.parse(localStorage.getItem('studentAccountData'));
  if (!studentData) return;

  // Update welcome message
  const welcomeMessage = document.querySelector('.welcome-message');
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${studentData.personalInfo.firstName}`;
  }

  // Update student info in result details
  const studentNameElements = document.querySelectorAll('.student-info p');
  studentNameElements.forEach(p => {
    if (p.innerHTML.includes('<strong>Student Name:</strong>')) {
      p.innerHTML = `<strong>Student Name:</strong> ${studentData.personalInfo.fullName}`;
    }
    if (p.innerHTML.includes('<strong>Department:</strong>')) {
      p.innerHTML = `<strong>Department:</strong> ${studentData.academicInfo.department}`;
    }
  });
}

// Dropdown functionality and initialization
document.addEventListener('DOMContentLoaded', function() {
  // Update student info on page load
  updateStudentInfo();
  
  const dropdownToggle = document.getElementById('dropdownToggle');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', function() {
      dropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
      if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('active');
      }
    });
  }
});