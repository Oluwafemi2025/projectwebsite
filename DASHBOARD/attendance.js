document.addEventListener("DOMContentLoaded", function () {
  const semesterSelected = document.querySelector(".ddlclass");
  const classcards = [
    document.getElementById("classcard1"),
    document.getElementById("classcard2"),
    document.getElementById("classcard3"),
    document.getElementById("classcard4"),
    document.getElementById("classcard5"),
  ];
  const dateInput = document.querySelector('input[type="date"]');
  const classdetails_area = document.getElementById("classdetails_area");
  const studentnames_area = document.getElementById("studentnames_area");

  // Hide all cards and areas initially
  classcards.forEach((card) => (card.style.display = "none"));
  classdetails_area.style.display = "none";
  studentnames_area.style.display = "none";

  // Set today's date
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // Semester selection
  semesterSelected.addEventListener("change", function () {
    const selectedValue = semesterSelected.value;

    // Hide all cards and remove highlight
    classcards.forEach((card) => {
      card.style.display = "none";
      card.classList.remove("active");
      card.style.backgroundColor = ""; // reset highlight
    });

    // Show cards for selected semester
    if (selectedValue === "Rain Semester") {
      classcards.slice(0, 3).forEach((card) => (card.style.display = "grid"));
    } else if (selectedValue === "Harmattan Semester") {
      classcards.slice(3).forEach((card) => (card.style.display = "grid"));
    }

    // Hide class details & student list until a card is clicked
    classdetails_area.style.display = "none";
    studentnames_area.style.display = "none";
  });

  // Click on a course card
  classcards.forEach((card) => {
    card.addEventListener("click", function () {
      // Remove active from all cards
      classcards.forEach((c) => {
        c.classList.remove("active");
        c.style.backgroundColor = ""; // reset highlight
      });

      // Add active to clicked card and highlight
      card.classList.add("active");
      card.style.backgroundColor = "var(--success)"; // highlight clicked card

      // Show student list and class details
      classdetails_area.style.display = "grid";
      studentnames_area.style.display = "flex";
    });
  });
});

// Select button
var rptBtn = document.getElementById("rptBtn");
let selectedCourse = ""; // track the clicked course

// Store ELEMENT references (not .value yet!)
var sessionChoosed = document.getElementById("ddlclass");
var coursesChoosed = document.querySelector(".classlist_area");
var studentChoosed = document.querySelector(".studentnames_area");

let dateInput = document.getElementById("date");
// ✅ Update selectedCourse when a course card is clicked
coursesChoosed.querySelectorAll(".classcard").forEach((card) => {
  card.addEventListener("click", function () {
    selectedCourse = card.innerText.trim();
  });
});
// Click event
rptBtn.addEventListener("click", function () {
  // Collect values at the time of click
  const sessionVal = sessionChoosed ? sessionChoosed.value : "";
  const courseVal = selectedCourse || "";
  const dateVal = dateInput ? dateInput.value : "";

  // Get all checked students
  const checkedStudents = Array.from(
    document.querySelectorAll(".studentdetails input[type=checkbox]:checked")
  ).map((cb) =>
    cb.closest(".studentdetails").querySelector(".name_area").innerText.trim()
  );

  // / Stop if no students are selected
  if (checkedStudents.length === 0) {
    alert("⚠️ Please select at least one student.");
    return;
  }

  // Build CSV content
  let csvContent = "No,Session,Course,Date,Student\n";

  checkedStudents.forEach((student, index) => {
    csvContent += `${
      index + 1
    },${sessionVal},${courseVal},${dateVal},"${student}"\n`;
  });

  // Create and download CSV file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "attendance.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert("✅ Attendance report downloaded successfully!");

  //  // ===== Reset form selections =====
  if (sessionChoosed) sessionChoosed.value = ""; // reset dropdown
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.value = `${yyyy}-${mm}-${dd}`; // reset to today's date
  }
  if (coursesChoosed) {
    coursesChoosed.querySelectorAll(".classcard").forEach(card => {
      card.classList.remove("active");       // remove highlight if any
    });
  }
  if (studentChoosed) {
    studentChoosed.querySelectorAll("input[type=checkbox]").forEach(cb => {
      cb.checked = false;                    // uncheck all students
      cb.closest(".studentdetails").classList.remove("selected"); // remove bg if added
    });
  }

});
