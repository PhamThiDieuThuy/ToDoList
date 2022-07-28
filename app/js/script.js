function addTask() {
    //get user input element
    let taskNameElement = document.getElementById("task_name")
    //get value of input element
    let taskName = taskNameElement.value;
    // create new item element
    let itemElement = document.createElement('li')
    // set value for new element
    itemElement.innerHTML = taskName;
    //get parent list
    let taskList = document.getElementById('task_list')
    //add new item to list
    taskList.appendChild(itemElement)

}

function dueDate(){
    let dateInFuture = document.getElementsByClassName("due_date")
    let dueDate = dateInFuture.value;
    let taskList = document.getElementById('task_list')
    let dateElement = document.createElement('li');
    dateElement.innerHTML=dueDate;
    taskList.appendChild(dateElement)
    console.log(dueDate)
    console.log(dateInFuture)
}