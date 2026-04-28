// ==================== CLASS SCHEDULE ====================
function addSchedule() {
  const input = document.getElementById("new-schedule");
  const value = input.value.trim();
  if (!value) return;

  const li = document.createElement("li");
  li.innerHTML = `<span>${value}</span> 
    <button class="complete">✔</button> 
    <button class="remove">✖</button>`;

  document.getElementById("schedule-list").appendChild(li);
  input.value = "";
  attachScheduleEvents(li);
}

function attachScheduleEvents(li) {
  li.querySelector(".complete").addEventListener("click", () => {
    li.querySelector("span").classList.toggle("completed");
  });
  li.querySelector(".remove").addEventListener("click", () => {
    li.remove();
  });
}

document.querySelectorAll("#schedule-list li").forEach(attachScheduleEvents);

// ==================== RESOURCES ====================
function addResource() {
  const titleInput = document.getElementById("resource-title");
  const linkInput = document.getElementById("resource-link");
  const title = titleInput.value.trim();
  const link = linkInput.value.trim();

  if (!title || !link || !/^https?:\/\//.test(link)) {
    alert("Please enter a valid title and link (starting with http/https).");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
  document.getElementById("resource-list").appendChild(li);

  titleInput.value = "";
  linkInput.value = "";
}

// ==================== FAQ ====================
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const icon = btn.querySelector("span");
    if (answer.style.display === "block") {
      answer.style.display = "none";
      icon.textContent = "+";
    } else {
      answer.style.display = "block";
      icon.textContent = "-";
    }
  });
});

// ==================== FORUM ====================
function postMessage() {
  const input = document.getElementById("forum-input");
  const text = input.value.trim();
  if (!text) return;

  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<span>${text}</span> <button onclick="this.parentElement.remove()">Delete</button>`;

  document.getElementById("forum-messages").appendChild(div);

  saveMessages();
  input.value = "";
}

// Save forum messages in localStorage
function saveMessages() {
  const messages = Array.from(document.querySelectorAll("#forum-messages span"))
    .map(span => span.textContent);
  localStorage.setItem("forumMessages", JSON.stringify(messages));
}

// Load forum messages
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("forumMessages") || "[]");
  saved.forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<span>${msg}</span> <button onclick="this.parentElement.remove()">Delete</button>`;
    document.getElementById("forum-messages").appendChild(div);
  });
});
