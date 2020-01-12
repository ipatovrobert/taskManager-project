const taskForm = document.querySelector('form');
const taskInput = document.querySelector('.taskInput');
const taskList = document.querySelector('.main-right--tasksList');
const delItem = document.querySelector('body');

// We initialize the array
let localTasksList;

//If there s no data then we set the the array, else we get the data
if(localStorage.getItem('tasks') === null){
    localTasksList = [];
}else {
    localTasksList = JSON.parse(localStorage.getItem('tasks'));
    for (i = 0; i < localTasksList.length; i++){
        const taskCreated = document.createElement('div');
        taskCreated.className = 'taskCreated';
        const taskName = document.createElement('p');
        taskName.className = 'paragraph';
        taskName.innerText = localTasksList[i];
        taskCreated.appendChild(taskName);
        const delTask = document.createElement('a');
        delTask.setAttribute('href', '#');
        delTask.className = 'delete-item';
        delTask.innerHTML = `<img src="img/delete.png" alt="">`;
        taskCreated.appendChild(delTask);
        taskList.appendChild(taskCreated);
    }
}

taskForm.addEventListener('submit', addTaskToList);
function addTaskToList(e){
    //Reset the default function of the form
    e.preventDefault();

    // We check if the value entered is null
    if(taskInput.value == ""){
        taskInput.style.borderColor = 'red';

        // If its null and there s no warning poped, we pop the warning null
        if(document.querySelector('#warning1') == null){
            const warning1 = document.createElement('p');
            warning1.className = 'paragraph';
            warning1.id = 'warning1'
            warning1.style.color = 'red';
            warning1.innerText = 'You cannot insert an undefined task';
        
            taskForm.appendChild(warning1);
        }

    // We check if the text entered is bigger than 45 letters
    } else if(taskInput.value.length > 45) {  
        taskInput.style.borderColor = 'red';

        // If theres no warning popped we pop the warning for letter
        if(document.querySelector('#warning2') == null){
            const warning2 = document.createElement('p');
            warning2.className = 'paragraph';
            warning2.id = 'warning2'
            warning2.style.color = 'red';
            warning2.innerText = 'Your task has more than 45 letters';
            taskForm.appendChild(warning2);
        }

    } else{

    // Creating the DIV with Class: taskCreated
    const taskCreated = document.createElement('div');
    taskCreated.className = 'taskCreated';

    //Creating the <p> witch gets the innerText from our user input
    const taskName = document.createElement('p');
    taskName.className = 'paragraph';
    taskName.innerText = taskInput.value;
    taskCreated.appendChild(taskName);

    //Creating the delete button
    const delTask = document.createElement('a');
    delTask.setAttribute('href', '#');
    delTask.className = 'delete-item';
    delTask.innerHTML = `<img src="img/delete.png" alt="">`;

    //Appending the delete button to the created DIV
    taskCreated.appendChild(delTask);

    //Appending the created DIV to the main HTML
    taskList.appendChild(taskCreated);

    // Save the task to the localStorage
    localTasksList.push(taskInput.value);
    localStorage.setItem('tasks', JSON.stringify(localTasksList));

    //Setting the form input to nothing after the submit
    taskInput.value = '';

        // If warning is popped on then remove the warning and set back the border to black
        if(document.querySelector('#warning1') != null){
            taskInput.style.borderColor = 'black';
            document.querySelector('#warning1').remove();
        }

        // If warning is popped on then remove the warning and set back the border to black
        if(document.querySelector('#warning2') != null){
            taskInput.style.borderColor = 'black';
            document.querySelector('#warning2').remove();
        }

    }
}

// Delete the task 
delItem.addEventListener('click', delCreatedItem);
function delCreatedItem(e){
    //We check if the clicked button contains the delete-item class
    if(e.target.parentElement.classList.contains('delete-item')){

        //if it contains then we delete the task
        e.preventDefault();
        e.target.parentElement.parentElement.remove();
        
        if(localTasksList.indexOf(e.target.parentElement.parentElement.innerText) === 0){
            localTasksList.shift();
        }else{
            localTasksList.splice(localTasksList.indexOf(e.target.parentElement.parentElement.innerText));
        }

        localStorage.setItem('tasks', JSON.stringify(localTasksList));
    }
}