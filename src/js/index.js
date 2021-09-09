const menuInput = document.querySelector("#espresso-menu-name");
const menuList = document.querySelector("#espresso-menu-list");
const menuForm = document.querySelector("#espresso-menu-form");
const submitBtn = document.querySelector("#espresso-menu-submit-button");
const menuCount = document.querySelector(".menu-count");

//enter key press
menuForm.addEventListener("keydown", (event) => {
    if (event.keyCode != 13)
        return;
    event.preventDefault();
    const name = menuInput.value;
    addMenu(name);
});

//button press
submitBtn.addEventListener("click", () => {
    const name = menuInput.value;
    addMenu(name);
});

function addMenu(name) {
    if (!name || name == '') {
        return;
    }
    // adding
    menuList.innerHTML += `
    <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${name}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
            수정
        </button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
            삭제
        </button>
    </li>
    `;
    menuInput.value = '';
    showMenuCount();

}

function showMenuCount() {
    const count = (menuList.children.length);
    menuCount.innerHTML = `total: ${count}`;
}

menuList.addEventListener("click", (event) => {
    if (event.target.nodeName !== 'BUTTON') {
        return;
    }
    const targetClassList = event.target.classList;
    const targetClass = targetClassList[targetClassList.length - 1];
    const li = event.target.parentNode;
    if (targetClass == 'menu-edit-button') {
        updateName(li)
    }
    if (targetClass == 'menu-remove-button') {
        deleteMenu(li)
    }
})

function updateName(li) {
    const newName = prompt("Enter a new name.");
    const span = li.querySelector("span");
    span.innerHTML = newName;
    showMenuCount();
}

function deleteMenu(li) {
    const answer = confirm("Do you really want to delete it?");
    if (!answer)
        return;
    li.remove();
    showMenuCount();
}