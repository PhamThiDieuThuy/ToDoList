// import {TodoService} from './TodoService';

let taskList = [];
let currentItemIndex = -1;

function addTask() {
    let taskListElem = document.getElementById('task_list');
    let itemElement = document.createElement('li');
    // itemElement.onclick = onClickItem;

    let taskNameElement = document.getElementById("task_name");

    let taskName = taskNameElement.value;

    let dateInFuture = document.getElementById("datetime_picker");

    let dueDate = dateInFuture.value;

    taskList.push({ taskName, dueDate })

    let selecter = document.createElement('button');
    selecter.setAttribute('id', 'select');
    selecter.innerHTML = "..."
    selecter.addEventListener('click', select)
    itemElement.appendChild(selecter);

    function select() {
        let ul = document.createElement('ul');
        ul.setAttribute('id', 'menuEdit')
        selecter.appendChild(ul);
        let edit = document.createElement('li');
        ul.appendChild(edit);
        edit.innerHTML = "Edit"
    }
    // div.innerHTML = "edit";

    taskListElem.appendChild(itemElement);
    let div = document.createElement('div');
    div.innerHTML = dueDate + ' <br><br>' + taskName;
    itemElement.appendChild(div);

    // Save to local storage
    let newIndex = taskList.length;

    let key = "todo" + newIndex;
    let value = taskName + "+" + dueDate;
    localStorage.setItem(key, value)
}


function onClickItem(event) {
    let item = event.path[0];
    let itemParent = item.parentNode;
    currentItemIndex = Array.prototype.indexOf.call(itemParent.children, item);

    let taskName = document.getElementById("task_name");
    let dueDate = document.getElementById("datetime_picker");
    dueDate.value = taskList[currentItemIndex].dueDate;
    taskName.value = taskList[currentItemIndex].taskName


}
function edit() {

    let taskName = document.getElementById("task_name").value;
    let dueDate = document.getElementById("datetime_picker").value;

    taskList[currentItemIndex] = { taskName, dueDate };

    let taskListElem = document.getElementById('task_list');
    let itemElement = taskListElem.children

    itemElement[currentItemIndex].innerHTML = taskName + " AT " + dueDate

}

function del() {
    taskList.splice(currentItemIndex, 1);
    let taskListElem = document.getElementById('task_list');
    let itemElement = taskListElem.children;
    let items = taskListElem.removeChild(itemElement[currentItemIndex])
    console.log(items)
    console.log(taskList)
}
function compare(a, b) {
    let taskNameA = a.dueDate;
    let taskNameB = b.taskName;
    let comparison = 0;
    if (taskNameA > taskNameB) {
        comparison = 1;
    }
    if (taskNameB > taskNameA) {
        comparison = -1;
    }
    return comparison;
}

function sort() {
    let taskListSort = taskList.sort(compare)
    console.log(taskListSort)

    let taskListElem = document.getElementById('task_list');
    console.log(taskListElem)
    let itemElement = taskListElem.children;
    console.log(itemElement)

    for (let i = 0; i < taskList.length; i++) {

        itemElement[i].innerHTML = taskListSort[i].dueDate + '<br><br>' + taskListSort[i].taskName
        console.log(taskListSort[i])

    }

}

function search() {
    console.log("search")
    let input = document.getElementById("searchTerm");
    let taskListElem = document.getElementById('task_list')
    let listItem = taskListElem.children;
    // taskList.forEach(function find(task) {
    //     if(task.taskName.toUpperCase()==input.value.toUpperCase()){
    //         listItem.style.display = "block";}
    //     else{
    //         listItem.style.display = "none";
    //     }
    //     }

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].taskName == input.value) {
            listItem[i].style.display = "block";
        }
        else {
            listItem[i].style.display = "none"
        };
        console.log(listItem[i])
    }

}

function saveToDoList(todoList) {

}