
// 등록 버튼 이벤트
// 입력 폼 유효성 검사
// 1. 기간 선택시 첫번째 기간 < 두번째 기간
// 2. 등록시 객체에 id값 생성 후 저장 (0부터 시작)
// test
const category = document.getElementById("Category");
const title = document.getElementById("Title");
const desc = document.getElementById("Desc");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");
const insertBtn = document.getElementById("insertBtn");
const clearBtn = document.getElementById("clearBtn");
const todoForm = document.getElementById("todoForm");
const spanSumTodos = document.getElementById("spanSumTodos");
const spanSumDone = document.getElementById("spanSumDone");

const todoItem = document.getElementById("todoItem");
const row = document.getElementById("Row");
let validate = false;


const todoTitle = document.getElementById("todoTitle");
const todoDesc = document.getElementById("todoDesc");
const TODOS_KEY = "todos";
const TODOS_DONE_KEY = "todosDone";
let toDos = [];
let toDosDone = [];
let start;
let end;
let time;
let replaceTime;
let hours;
let minutes;
let checkedId;
let sumTodos;
let sumTodosDone;
title.focus();
changeSumNumber();

// 시간 입력시 유효성 검사 및 세미콜론 추가
function onFocusOut() {
  time = this.value;
  // 세미콜론이 들어가면 제외한다.
  replaceTime = time.replace(/\:/g, "");

  // 두자리수만 입력, 25보다 작을때 HH:00 으로 표시
  if (replaceTime.length < 2 && replaceTime.length > 0) {
    this.value = "0" + this.value + ":00";

  } else if (replaceTime.length == 3) {

    this.value = '';
    this.focus();
    return false;

  } else if (replaceTime.length === 2 && replaceTime < 25) {
    this.value = replaceTime + ":00";

  } else if (replaceTime.length === 2 && replaceTime > 24) {
    alert("시간은 24시를 넘길 수 없습니다.");
    this.focus();
    this.value = "";
    return false;

  } else if (replaceTime.length >= 4) {
    if (replaceTime.length == 5) {
      replaceTime = replaceTime.substring(0, 4);
      this.value = replaceTime;
    }
    hours = replaceTime.substring(0, 2);
    minutes = replaceTime.substring(2, 4);

    if (hours + minutes > 2400) {
      alert("시간은 24시를 넘길 수 없습니다.");
      this.value = "";
      this.focus();
      return false;

    } else if (minutes > 60) {
      this.focus();
      this.value = hours + ":";
      return false;

    } else {
      this.value = `${hours}:${minutes}`;
    }
  }
}

// 유효성 검사
function ValidateTodo() {
  let blank_pattern = /^\s+|\s+$/g;
  if (title.value.replace(blank_pattern, '') == '') {
    title.value = '';
    title.focus();
    validate = false;
    return false;
  } else {
    validate = true;
  }
}

// 화면에 todo item 그리기
function paintTodo(newTodoObj) {
  todoTitle.innerHTML = newTodoObj.title;
  todoDesc.innerHTML = newTodoObj.desc;
  let item = todoItem.cloneNode(true);
  item.id = newTodoObj.id;
  item.classList.remove('d-none');
  row.appendChild(item);
  item.addEventListener("dblclick", onDoubleClick);
  let chkbox = item.childNodes[1].childNodes[1].children[1].childNodes[1];
  chkbox.addEventListener("change", onChangeCheckBox);
}

// 화면에 todoDone item 그리기
function paintTodoDone() {

}
// 할 일 등록시 유효성 검사, 입력란 비우고 화면에 그린뒤 저장
function handleTodoSubmit(event) {
  event.preventDefault();
  ValidateTodo();
  if (validate) {
    const newCategory = category.value;
    const newTitle = title.value;
    const newDesc = desc.value;
    const newStart = startTime.value;
    const newEnd = endTime.value;
    const nowDate = Date.now();
    const dateCreated = new Date(nowDate);
    const Success = false;
    const newTodoObj = {
      category: newCategory,
      title: newTitle,
      id: nowDate,
      success: Success,
      date: dateCreated,
      desc: newDesc,
      start: newStart,
      end: newEnd
    }
    toDos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodos();
    clearFormInput();
    title.focus();
  }
}

function deleteToDo() {
  toDos = toDos.filter(toDo => toDo.id !== parseInt(card.id))
}

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  changeSumNumber();

}

// 할 일 추가하거나 상태 변경시 합계 숫자 변경
function changeSumNumber() {
  if(localStorage.getItem("todos")){
    sumTodos = JSON.parse(localStorage.getItem("todos")).length;
    spanSumTodos.innerHTML = sumTodos;
    console.log(sumTodos)
  } else {
    spanSumTodos.innerHTML = "0"
  }
  if(localStorage.getItem("todosDone")) {
    sumTodosDone = JSON.parse(localStorage.getItem("todosDone")).length;
    spanSumDone.innerHTML = sumTodosDone;
  } else {
    spanSumDone.innerHTML = "0";
  }
}

function saveTodosDone() {
  localStorage.setItem(TODOS_DONE_KEY, JSON.stringify(toDosDone));
}

function clearFormInput() {
  let formInput = document.getElementsByClassName("form-control");
  for (let i = 0; i < formInput.length; i++) {
    formInput[i].value = "";
  }
}

// 체크버튼 클릭시 success true로 변경 후 달성 완료 처리
function onChangeCheckBox(event) {
  const card = this.parentNode.parentNode.parentNode.parentNode;
  checkedId = card.id;
  if (this.checked) {
    // 체크상태일때 toDos 에서 그 객체만을 뽑아내어 toDosDone 에 push 후 localStorage에 저장한다.
    let arr = JSON.parse(localStorage.getItem(TODOS_KEY));
    let toDoDone = arr.filter(toDo => toDo.id == parseInt(card.id));
    toDoDone[0].success = true;
    toDoDone = { ...toDoDone[0] }
    toDos = arr.filter(toDo => toDo.id !== parseInt(card.id));
    card.remove();
    toDosDone.push(toDoDone);
    toDos.push(toDos);
    saveTodosDone();
    saveTodos();
    //paintTodo();
  } else {

  }
}



// 두번 클릭시 할 일 완료 및 미완료 처리
function onDoubleClick() {

}

function findId(event) {
  console.log('카드클릭');

}



// 로컬스토리지에 저장된 할일을 가져와서 보이기
const savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos !== null) {
  const parsedToDos = JSON.parse(savedTodos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintTodo);
}

const savedTodosDone = localStorage.getItem(TODOS_DONE_KEY);
if (savedTodosDone !== null) {
  const parsedToDosDone = JSON.parse(savedTodosDone);
  toDosDone = parsedToDosDone;
  //parsedToDosDone.forEach(paintTodoDone);
}



// items.addEventListener("dblclick", onDoubleClick);
startTime.addEventListener("blur", onFocusOut);
endTime.addEventListener("focusout", onFocusOut);
todoForm.addEventListener("submit", handleTodoSubmit);
clearBtn.addEventListener("click", clearFormInput);
