const toggleBtn = document.getElementById("toggleBtn");
const arrowIcon = document.getElementById("arrowIcon");
function hideShowForm() {
    //todoForm.classList.toggle("hide-form");
    toggleBtn.classList.toggle("mt-4");
    arrowIcon.classList.toggle("bi-chevron-down");
    arrowIcon.classList.toggle("bi-chevron-up")
}

toggleBtn.addEventListener("click", hideShowForm);