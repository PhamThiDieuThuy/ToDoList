// import {TodoService} from './TodoService';

let taskList = [];
let currentItemIndex = -1;
let edittingDiv = null;

function addTask() {
    let taskListElem = document.getElementById('task_list');
    itemElement = document.createElement('li');
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
    dateInFuture = document.getElementById("datetime_picker").value = "";
    div.appendChild(h4)
    let p=document.createElement('p');
    p.innerHTML = taskName;
    document.getElementById("task_name").value= "";
    div.appendChild(p)
    // Save to local storage
    let newIndex = taskList.length;

    let key = "todo" + newIndex;
    let value = taskName + "+" + dueDate;
    localStorage.setItem(key, value)
}

function editLi(event){
 
    let editbtn = event.srcElement
    let ul = editbtn.parentNode;
    let btn = ul.parentNode;
    edittingDiv = btn.nextElementSibling;
    let h4 = edittingDiv.childNodes;
    let taskName = document.getElementById("task_name");
    let dueDate = document.getElementById("datetime_picker");
    dueDate.value = h4[0].innerHTML;
    taskName.value =h4[1].innerHTML;
    let saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click',saveEdit);
    document.getElementById('saveButton').style.display='initial';
    document.getElementById('add_task').style.display = 'none';
  
}
function saveEdit(){
    if(edittingDiv!= null)
    {
        console.log(edittingDiv)
        let h4 = edittingDiv.firstChild
        console.log(h4)
        h4.innerHTML = document.getElementById("datetime_picker").value
        let p = edittingDiv.lastChild;
        p.innerHTML = document.getElementById('task_name').value;
        document.getElementById("datetime_picker").value = '';
        document.getElementById('task_name').value = '';
        document.getElementById('saveButton').style.display='none';
        document.getElementById('add_task').style.display = 'initial';
        
    }
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