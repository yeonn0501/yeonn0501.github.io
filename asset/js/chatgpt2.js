const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todosContainer = document.getElementById("todos");
const completedContainer = document.getElementById("completed");

let todos = [];

// todo 생성 함수
function addTodoItem(todo) {
  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    todo.completed = !todo.completed;
    renderTodos();
  });
  const todoText = document.createElement("span");
  todoText.textContent = todo.text;
  if (todo.completed) {
    todoItem.classList.add("completed");
    checkbox.checked = true;
  }
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "삭제";
  deleteBtn.addEventListener("click", () => {
    const todoIndex = todos.indexOf(todo);
    todos.splice(todoIndex, 1);
    renderTodos();
  });
  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(deleteBtn);
  if (todo.completed) {
    completedContainer.appendChild(todoItem);
  } else {
    todosContainer.appendChild(todoItem);
  }
}

// todo 조회 및 렌더링 함수
function renderTodos() {
  todosContainer.innerHTML = "";
  completedContainer.innerHTML = "";
  todos.forEach((todo) => {
    addTodoItem(todo);
  });
}

// form 제출 이벤트 핸들러
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const todo = {
      text: todoText,
      completed: false,
    };
    todos.push(todo);
    todoInput.value = "";
    renderTodos();
  }
});

// 탭 이벤트 핸들러
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    if (tab.dataset.target === "todos") {
      todosContainer.classList.remove("hide");
      completedContainer.classList.add("hide");
    } else {
      completedContainer.classList.remove("hide");
      todosContainer.classList.add("hide");
    }
  });
});

// 초기 렌더링
renderTodos();



// 이 코드는 todos 배열을 사용하여 to-do 리스트를 관리합니다.
// todos 배열의 각 요소는 to-do 아이템을 나타내는 JavaScript 객체입니다.
// 객체에는 text와 completed 프로퍼티가 있습니다.
// text 프로퍼티는 to-do 아이템의 텍스트를 나타내고,
// completed 프로퍼티는 to-do 아이템이 완료되었는지 여부를 나타냅니다.
// 먼저 getTodos 함수는 로컬스토리지에서 저장된 데이터를 가져와서 배열로 반환합니다.
// 만약 로컬스토리지에 데이터가 없으면 빈 배열을 반환합니다.

// addTodo 함수는 todoForm에서 제출 이벤트가 발생했을 때 실행되며,
// 이벤트 객체의 preventDefault() 메서드를 사용하여 페이지가 새로고침되는 것을 방지합니다. 
// 그리고 todo-input 엘리먼트에서 입력된 값을 가져와서 새로운 객체로 만듭니다.
// 객체는 id, text, completed 프로퍼티를 가지며 id는 현재 시간 값을 사용하도록 하였습니다.
// 그리고 todos 배열에 새로운 객체를 추가합니다.
// 이후 todos 배열을 로컬스토리지에 저장하고, renderTodos 함수를 호출하여 목록을 다시 그리도록 합니다.

// renderTodos 함수는 todos 배열을 받아와서, #todos 엘리먼트와 #completed 엘리먼트를 비우고,
// todos 배열을 순회하며 각 객체에 대해 HTML 코드를 생성하여 #todos 엘리먼트에 추가합니다.
// completed 프로퍼티가 true인 경우에는 #completed 엘리먼트에 추가합니다.

// deleteTodo 함수는 삭제할 todo의 id 값을 받아와서 todos 배열에서 해당 객체를 찾아서 제거합니다.
// 이후 todos 배열을 로컬스토리지에 저장하고, renderTodos 함수를 호출하여 목록을 다시 그리도록 합니다.

// completeTodo 함수는 체크박스 이벤트가 발생했을 때 실행되며,
// 해당 체크박스가 속한 todo의 id 값을 찾아서 todos 배열에서 해당 객체를 찾아서 completed 프로퍼티 값을 반전시킵니다.
// 이후 todos 배열을 로컬스토리지에 저장하고, renderTodos 함수를 호출하여 목록을 다시 그리도록 합니다.




