const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todosList = document.getElementById("todos");
const completedList = document.getElementById("completed");
const tabs = document.querySelectorAll(".tab");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let completed = JSON.parse(localStorage.getItem("completed")) || [];

// render todos and completed items on load
renderTodos(todos);
renderCompleted(completed);

// event listeners
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText) {
    const todo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos);
    todoInput.value = "";
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");
    const target = tab.getAttribute("data-target");
    if (target === "todos") {
      todosList.classList.remove("hide");
      completedList.classList.add("hide");
    } else {
      completedList.classList.remove("hide");
      todosList.classList.add("hide");
    }
  });
});

function renderTodos(todos) {
  todosList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    if (todo.completed) {
      todoItem.classList.add("completed");
    }
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      todo.completed = !todo.completed;
      if (todo.completed) {
        completed.push(todo);
        todos = todos.filter((t) => t.id !== todo.id);
      } else {
        todos.push(todo);
        completed = completed.filter((t) => t.id !== todo.id);
      }
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("completed", JSON.stringify(completed));
      renderTodos(todos);
      renderCompleted(completed);
    });
    const text = document.createElement("span");
    text.innerText = todo.text;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      completed = completed.filter((t) => t.id !== todo.id);
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("completed", JSON.stringify(completed));
      renderTodos(todos);
      renderCompleted(completed);
    });
    todoItem.appendChild(checkbox);
    todoItem.appendChild(text);
    todoItem.appendChild(deleteBtn);
    todosList.appendChild(todoItem);
  });
}

function renderCompleted(completed) {
  completedList.innerHTML = "";
  completed.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item", "completed");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.disabled = true;
    const text = document.createElement("span");
    text.innerText = todo.text;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id
