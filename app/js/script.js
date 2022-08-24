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
    selecter.addEventListener('mouseenter', select);
    selecter.addEventListener('mouseleave', leave);
    itemElement.appendChild(selecter);

    function select() {
        let ul = document.createElement('ul');
        ul.setAttribute('id', 'menuEdit')
        selecter.appendChild(ul);
        let edit = document.createElement('li');
        ul.appendChild(edit);
        edit.innerHTML = "Edit"
        edit.addEventListener('click', editLi)
        let del = document.createElement('li');
        ul.appendChild(del);
        del.innerHTML= "Delete";
        let done = document.createElement('li');
        ul.appendChild(done);
        done.innerHTML = "Done"

    }
    function leave(event){
         let btn = event.srcElement
        btn.removeChild(btn.childNodes[1]);
        
    }
    
    taskListElem.appendChild(itemElement);
    let div = document.createElement('div');
     itemElement.appendChild(div);
    let h4 = document.createElement('h4')
    h4.innerHTML = dueDate;
    div.appendChild(h4)
    let p=document.createElement('p');
    p.innerHTML = taskName;
    div.appendChild(p)
    // Save to local storage
    let newIndex = taskList.length;

    let key = "todo" + newIndex;
    let value = taskName + "+" + dueDate;
    localStorage.setItem(key, value)
}

function editLi(event){
    console.log(event)
    let editbtn = event.srcElement
    let ul = editbtn.parentNode;
    let btn = ul.parentNode;
    let div = btn.nextElementSibling;
    console.log(div)
    let h4 = div.childNodes;
    let taskName = document.getElementById("task_name");
    let dueDate = document.getElementById("datetime_picker");
    dueDate.value = h4[0].innerHTML;
    taskName.value =h4[1].innerHTML
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