// import {TodoService} from './TodoService';

let edittingDiv = null;
let taskListElem = null;
let taskNameElement = null;
let dateInFuture = null;
let listLeft = null;
let taskNameEdit = null;
let datetimePickerEdit = null;


function onLoad(){
    taskListElem = document.getElementById('task_list');
    taskNameElement = document.getElementById("task_name");
    dateInFuture = document.getElementById("datetime_picker");
    listLeft= document.getElementById("listLeft")
    taskNameEdit = document.getElementById('taskNameEdit');
    datetimePickerEdit = document.getElementById('datetimePickerEdit');
 }

function add(){
    let addNewTask = document.getElementById("addNewTask")
    addNewTask.style.display = "block"
    
    let h1= document.getElementById('h1');
    h1.style.display = "none";

    let close = document.getElementById("close");
    close.style.display = "initial";
    close.addEventListener('click',closed);
    document.getElementById('task_list').style.display = "none";
}

//add new Task
function addTask() {
    let taskName = taskNameElement.value;
    let dueDate = dateInFuture.value;

    let itemElement = document.createElement('li');
    itemElement.setAttribute('id','itemElement')
    taskListElem.appendChild(itemElement);

    let selecter = document.createElement('button');
    selecter.setAttribute('id', 'select');
    itemElement.appendChild(selecter);
    selecter.innerHTML = "..."

    selecter.addEventListener('mouseenter', select);
    selecter.addEventListener('mouseleave', leave);
     
    let div = document.createElement('div');
    itemElement.appendChild(div);

    let h4 = document.createElement('h4')
    h4.innerHTML = dueDate;
    dateInFuture.value = "";
    div.appendChild(h4)

    let p = document.createElement('p');
    p.innerHTML = taskName;
    document.getElementById("task_name").value = "";
    div.appendChild(p)

//tao list tai Add Task
    let itemElementLeft = document.createElement('li');
    listLeft.appendChild(itemElementLeft);
    let divLeft = document.createElement('div');
    itemElementLeft.appendChild(divLeft);

    let h4Left = document.createElement('h4')
    h4Left.innerHTML = dueDate;
    dateInFuture.value = "";
    divLeft.appendChild(h4Left)

    let pLeft = document.createElement('p');
    pLeft.innerHTML = taskName;
    document.getElementById("task_name").value = "";
    divLeft.appendChild(pLeft)

    // Save to local storage
    // let newIndex = taskList.length;

    // let key = "todo" + newIndex;
    // let value = taskName + "+" + dueDate;
    // localStorage.setItem(key, value)
}

//Close Add Task
function closed(){
    let addNewTask = document.getElementById("addNewTask")
    addNewTask.style.display = "none";
    let listLeft = document.getElementById('listLeft');
    let itemListLeft = listLeft.children;
    let numOfLiLeft = listLeft.children.length;
    for(let i= numOfLiLeft-1; i>=0; i--){
        itemListLeft[i].remove();
    }
       
    h1.style.display = "block";
    document.getElementById('task_list').style.display = "block";
}

//function mouseenter in list:
function select(event) {
    console.log(event)
    let selecter = event.srcElement;
   
    let ul = document.createElement('ul');
    ul.setAttribute('id', 'menuEdit')
    selecter.appendChild(ul);

    let edit = document.createElement('li');
    ul.appendChild(edit);
    edit.innerHTML = "Edit"
    edit.addEventListener('click', editLi);

    let del = document.createElement('li');
    ul.appendChild(del);
    del.innerHTML = "Delete";
    del.addEventListener('click', dele);

    let done = document.createElement('li');
    ul.appendChild(done);
    done.addEventListener('click', did);
    done.innerHTML = "Done"

}

//function mouseleave in list:
function leave(event) {
    let btn = event.srcElement
    btn.removeChild(btn.childNodes[1]);
}


//function edit list
function editLi(event) {
    let saveEdit = document.getElementById('saveEdit');
    saveEdit.style.display = 'block';

    let editbtn = event.srcElement;
    let ul = editbtn.parentNode;
    let btn = ul.parentNode;
 
    edittingDiv = btn.nextElementSibling;
    let h4 = edittingDiv.childNodes;

    datetimePickerEdit.value = h4[0].innerHTML;
    taskNameEdit.value = h4[1].innerHTML;
    console.log(h4[0], h4[1])

    let saveButton = document.getElementById('saveButton');
    console.log(saveButton);
    saveButton.addEventListener('click', saveEdited);
    saveButton.style.display = 'initial';
    
    let list = btn.parentNode;
    list.style.backgroundColor = "rgba(112,112,122,0.5)";
}

//function save edit
function saveEdited() {
    console.log(edittingDiv);
    if (edittingDiv != null) {
        console.log(edittingDiv);

        let h4 = edittingDiv.firstChild;
        h4.innerHTML = datetimePickerEdit.value;

        let p = edittingDiv.lastChild;
        p.innerHTML = taskNameEdit.value;

        dateInFuture.value = '';
        taskNameElement.value = '';

        let saveEdit = document.getElementById('saveEdit');
        saveEdit.style.display = 'none';

        let list = edittingDiv.parentNode;
        list.style.backgroundColor = "rgb(225, 248, 237)";
    }
}

//Function delete list
function dele(event) {
    let ul = event.path[3];
    ul.remove();
}

//function to ticked this task has done
function did(event) {
    console.log(event)
    let btn = event.path[2];
    let div = btn.nextElementSibling;
    let h4 = div.firstChild;
    let p = div.lastChild;

    let delh4 = document.createElement('s');
    h4.appendChild(delh4);
    let text = h4.firstChild;
    delh4.appendChild(text);

    let delP = document.createElement('s');
    p.appendChild(delP);
    let text1 = p.firstChild;
    delP.appendChild(text1);
}

// function to sort list
function sort() {
    let ulOfSort = document.createElement('ul');
    let sortButton = document.getElementById('sort');
    sortButton.appendChild(ulOfSort);
    ulOfSort.setAttribute('id', 'ulOfSort');

    let sortIncrease = document.createElement('li');
    ulOfSort.appendChild(sortIncrease);
    sortIncrease.innerHTML = "Ascending day"
    sortIncrease.addEventListener('click', ascending);

    let sortDecrease = document.createElement('li');
    ulOfSort.appendChild(sortDecrease);
    sortDecrease.innerHTML = "Descending day";
    sortDecrease.addEventListener('click', Descending);
}

function ascending(){
    let ol = document.getElementById("task_list");
    let li = ol.children;
    let listItem = [];
    for(let i = 0; i<ol.children.length; i++){
        listItem.push(li[i]);
    }
    listItem.sort(compare);
     for (let i = ol.children.length-1; i>=0; i--)
    {
        console.log(li[i]);
        li[i].remove();
        console.log(listItem)
    }
    listItem.forEach(element => {
            ol.appendChild(element)
    });
    }


function compare(libf , liaf){
    
    let divbf = libf.lastChild;
    let divaf = liaf.lastChild;
    
    let h4bf = divaf.firstChild;
    let h4af = divbf.firstChild;
    
    let datebf = new Date(h4bf.innerHTML);
    let dateaf = new Date(h4af.innerHTML);
        
    return dateaf > datebf ? 1 : -1
}

function Descending(){
    let ol = document.getElementById("task_list");
    let li = ol.children;
    let listItem = [];
    for(let i = 0; i<ol.children.length; i++){
        listItem.push(li[i]);
    }
    listItem.sort(compareDescending);
     for (let i = ol.children.length-1; i>=0; i--)
    {
        console.log(li[i]);
        li[i].remove();
        console.log(listItem)
    }
    listItem.forEach(element => {
            ol.appendChild(element)
    });
    }


function compareDescending(libf , liaf){
    
    let divbf = libf.lastChild;
    let divaf = liaf.lastChild;
    
    let h4bf = divaf.firstChild;
    let h4af = divbf.firstChild;
    
    let datebf = new Date(h4bf.innerHTML);
    let dateaf = new Date(h4af.innerHTML);
        
    return datebf > dateaf ? 1 : -1
}



function leaveSort() {
    let sortButton = document.getElementById('sort');
    let numbOfSort = sortButton.children.length;
    for (let i = 0; i < numbOfSort; i++) {
        sortButton.removeChild(sortButton.lastChild);
    }
}

//function to search

function search() {
    let searchItem = document.getElementById("searchTerm");
    let ol = document.getElementById('task_list');
    let li = ol.children;
    let numbOfLi = ol.childElementCount
    console.log(numbOfLi)
    for (let i = 0; i < numbOfLi; i++) {
        let div = li[i].lastChild;
        let child = div.lastChild;
        console.log(child)
        if (searchItem.value == child.innerHTML) {
            li[i].style.display = "block";

        }
        else {
            li[i].style.display = "none";
        }
    }
    searchItem.value = '';

}

function homePage() {
    let ol = document.getElementById('task_list');
    let li = ol.children;
    let numbOfLi = ol.childElementCount
    for (let i = 0; i < numbOfLi; i++) {
        li[i].style.display = "block"
    }
}