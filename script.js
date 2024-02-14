//Todo ELEMAN EKLEME

// Eleman Seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;


// LOAD İTEMS
loadItems()
eventlisteners()

function eventlisteners() {
    //submit event
    form.addEventListener("submit", addNewItem);
    // delete item
    taskList.addEventListener("click", deleteItem)
    //deelte all
    btnDeleteAll.addEventListener("click", deleteAllItems)
};

// Yükleme
function loadItems() {
    todos = getItemsFromLS();
    todos.forEach(function (item) {
        createItem(item)
    })
}

//get items from local storage
function getItemsFromLS(){
    if (localStorage.getItem("todos") === null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}

//set ıtem to LS
function setItemToLS(text){
    todos = getItemsFromLS()
    todos.push(text)
    localStorage.setItem("todos", JSON.stringify(todos))

}

// Eleman taslak
function createItem(text) {
    // li oluşturma
    const li = document.createElement("li")
    li.className = "list-group-item list-group-item-secondary"
    li.appendChild(document.createTextNode(text))

    // a oluşturma

    const a = document.createElement("a")
    a.classList = 'delete-item float-right'
    a.setAttribute("href", "#")
    a.innerHTML = '<i class="fas fa-times"></i>'

    li.appendChild(a)
    taskList.appendChild(li)
}

// ELEMAN EKLEME
function addNewItem(e) {

    if (input.value === "") {
        alert("boş bırakılamaz")
    } else {
        createItem(input.value)
        setItemToLS(input.value)
    }
    input.value = ""

    e.preventDefault()

};
// ELEMAN EKLME BİTİŞ

// ELEMAN SİLME
function deleteItem(e) {

    if (e.target.className === "fas fa-times" && confirm("silmek istediğinize eminmisiniz")) {
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
    }

    e.preventDefault
}
// ELEMAN SİLME BİTİŞ

function deleteTodoFromStorage(deleteTodo){
    let todos = getItemsFromLS();
    todos.forEach(function(todo,index){
        if(todo=== deleteTodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));

}

//TÜMÜNÜ SİL
function deleteAllItems(e) {

    if (confirm("Herşeyi silmek istediğinize eminmisiniz")) {
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }
        localStorage.clear();

        // taskList.innerHTML = ""
    }
}