const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load any previously saved tasks when the page first loads
loadTasks();

taskForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === "") {
    return;
  }

  addTask(taskText, false);
  saveTasks();
  taskInput.value = "";
});

function addTask(text, isCompleted) {
  const listItem = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = text;
  if (isCompleted) {
    taskSpan.classList.add("completed");
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteBtn);
  taskList.appendChild(listItem);
}

taskList.addEventListener("click", function(event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains("delete-btn")) {
    const listItem = clickedElement.closest("li");
    listItem.remove();
    saveTasks();
  } else if (clickedElement.tagName === "SPAN") {
    clickedElement.classList.toggle("completed");
    saveTasks();
  }
});

function saveTasks() {
  const tasks = [];
  const allItems = taskList.querySelectorAll("li");

  allItems.forEach(function(item) {
    const span = item.querySelector("span");
    tasks.push({
      text: span.textContent,
      completed: span.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (!saved) {
    return;
  }

  const tasks = JSON.parse(saved);
  tasks.forEach(function(task) {
    addTask(task.text, task.completed);
  });
}
