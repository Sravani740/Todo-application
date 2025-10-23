const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const statusMsg = document.getElementById("status");

// Load initial todos from API
async function loadTodos() {
  try {
    statusMsg.textContent = "⏳ Loading tasks...";
    const res = await fetch("https://dummyjson.com/todos");
    const data = await res.json();
    statusMsg.textContent = "";
    data.todos
      .slice(0, 5)
      .forEach((todo) => addTaskToDOM(todo.todo, todo.completed));
  } catch (error) {
    statusMsg.textContent = "❌ Failed to load tasks. Please try again.";
  }
}

// Add new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  addTaskToDOM(taskText, false);
  taskInput.value = "";
}

// Add task to DOM
function addTaskToDOM(taskText, isCompleted) {
  const li = document.createElement("li");
  if (isCompleted) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = taskText;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Event Listeners
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Initialize app
loadTodos();
