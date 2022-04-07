// UI vars 

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

// load items
loadItems();

// call event listeners
eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener('submit', addNewItem);

    // delete an item
    taskList.addEventListener('click', deleteItem);

    // delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {

    items = getItemsFromLS();


    items.forEach(function(item) {
        createItem(item);
    })
}



// Get Item From Local Storage
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}






// Set Item From Local Storage
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('item', JSON.stringify(items));
}


// Delete From items Local Storage

function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function(item, index) {
        if (item === text) {
            item.splice(index, 1);
        }
    });
    localStorage.setItem('item', JSON.stringify(items));
}




function createItem(text) {
    // create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    // add a to li
    li.appendChild(a);

    // add li to ul
    taskList.appendChild(li);

}

// add new item
function addNewItem(e) {
    if (input.value === '') {
        alert('add new item');
    }

    // create item
    createItem(input.value);


    // Save To Local Storage
    setItemToLS(input.value);



    // clear input
    input.value = '';

    e.preventDefault();

}

// delete an item
function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        if (confirm('Are You Sure ?')) {
            e.target.parentElement.parentElement.remove();

            // Delete Item From Local Storage
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

// delete all items
function deleteAllItems(e) {

    if (confirm('Are You Sure ?')) {
        // taskList.innerHTML='';
        // taskList.childNodes.forEach(function(item) {  // Bu işlem de geçerli, ama daha kolayı var
        //     if (item.nodeType === 1) {
        //         item.remove();
        //     }
        // });
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}