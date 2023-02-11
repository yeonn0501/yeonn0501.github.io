
const time1 = document.getElementById("time1");
const time2 = document.getElementById("time2");

time1.addEventListener("focusout", validateTime);
time1.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    validateTime(e);
  }
});

time2.addEventListener("focusout", validateTime);
time2.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    validateTime(e);
  }
});

function validateTime(e) {
  let input = e.target.value;
  if (input.length === 2) {
    input = input + ":00";
  } else if (input.length !== 4) {
    alert("Invalid time format. Please enter 4 digits.");
    e.target.value = "";
    return false;
  }
  e.target.value = input;
  return true;
  
}

// function submitTextarea(event) {
//     let key = event.key || event.keyCode;

//     if (key === 'Enter' || key === 13) {
//         alert('전송');
//     }
// }

// let textarea = document.getElementById('my-textarea');
// textarea.addEventListener('keyup', event => submitTextarea(event));
