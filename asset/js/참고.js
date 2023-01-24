const toDoForm = document.getElementById("todo-form");
const toDoList = document.getElementById("todo-list");
const toDoInput = toDoForm.querySelector("input");
// const toDoInput = docuemnt.querySelector("#todo-form input"); 과 동일
const TODOS_KEY = "todos";
let toDos = [];


// 로컬스토리지에 할 일 저장 기능
function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
  // '["1","2","3","4"]' 로 저장됨.

  // json 형태를 string 으로 변환하여 저장해야함 
  // localStorage 에 setItem 을 할때는 문자열로밖에 저장이 안되기때문에
  // stringify 를 안하게 되면 '1,2,3,4' 로 저장됨.
}

// 화면에 할 일 목록을 보여주기 기능
function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const btn = document.createElement("button");
  btn.innerText = "❌";

  li.appendChild(span);
  li.appendChild(btn);
  toDoList.appendChild(li);
  // 삭제 버튼 클릭 이벤트 지정
  btn.addEventListener("click", deleteToDo);
}

// 삭제 기능
function deleteToDo(event) {
  const li = event.target.parentElement;
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  li.remove();
  saveToDos();
}

// 할 일 입력시 입력란 비우고 화면에 그려주고 저장하기
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now()
  }
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveToDos();
}

// submit 할 때 핸들함수 실행
toDoForm.addEventListener("submit", handleToDoSubmit);

// 로컬스토리지에서 할 일 불러오기
const savedToDos = localStorage.getItem(TODOS_KEY);
// 로컬스토리지에 저장된 할 일 savedToDos가 null 이 아닐 때 기존 toDos 에 불러온 savedToDos 를 넣고
// 각각 값들에 paintTodo 를 실행하여 화면에 그려준다.
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintTodo);
}
// function 을 작성하여 이 함수를 실행할 수도 있음.