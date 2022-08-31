// import {TodoService} from './TodoService';

let edittingDiv = null;
let taskListElem = null;
let taskNameElement = null;
let dateInFuture = null;

function onLoad(){
    taskListElem = document.getElementById('task_list');
    taskNameElement = document.getElementById("task_name");
    dateInFuture = document.getElementById("datetime_picker");
}

//add new Task
function addTask() {
    let taskName = taskNameElement.value;
    let dueDate = dateInFuture.value;

    let itemElement = document.createElement('li');
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
    // Save to local storage
    // let newIndex = taskList.length;

    // let key = "todo" + newIndex;
    // let value = taskName + "+" + dueDate;
    // localStorage.setItem(key, value)
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
    let editbtn = event.srcElement
    let ul = editbtn.parentNode;
    let btn = ul.parentNode;

    edittingDiv = btn.nextElementSibling;
    let h4 = edittingDiv.childNodes;

    dateInFuture.value = h4[0].innerHTML;
    taskNameElement.value = h4[1].innerHTML;

    let saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', saveEdit);
    document.getElementById('saveButton').style.display = 'initial';
    document.getElementById('add_task').style.display = 'none';

    let list = btn.parentNode;
    list.style.backgroundColor = "rgba(112,112,122,0.5";
}

//function save edit
function saveEdit() {
    if (edittingDiv != null) {
        console.log(edittingDiv);

        let h4 = edittingDiv.firstChild;
        h4.innerHTML = dateInFuture.value;

        let p = edittingDiv.lastChild;
        p.innerHTML = taskNameElement.value;

        dateInFuture.value = '';
        taskNameElement.value = '';

        document.getElementById('saveButton').style.display = 'none';
        document.getElementById('add_task').style.display = 'initial';

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