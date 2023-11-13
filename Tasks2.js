'use strict';

const taskInput = document.querySelector('.task-input');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const form = document.querySelector('.create-task-form');
const list = document.querySelector('.collection');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (taskInput.value.trim() === ''){
        return;
    }

    createSingleTaskElement (taskInput.value);

    storeTaskInLocalStorage(taskInput.value);

    //form.reset();
    taskInput.value = '';
});

taskList.addEventListener('click', (event)=>{
    const iconContainer = event.target.parentElement;
    let elementIndex = Array.prototype.indexOf.call(list.childNodes, iconContainer.parentElement);

    if(iconContainer.classList.contains('delete-item')){
        if (confirm('Are you sure?')){


            iconContainer.parentElement.remove();

            const tasks = localStorage.getItem('tasks') !== null 
            ? JSON.parse(localStorage.getItem('tasks')) 
            : [];

            tasks.splice(elementIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));

        }
    }

    if(iconContainer.classList.contains('edit-item')){

        let sign = prompt("Please, update the item value");

        if (sign !== null){


            iconContainer.parentElement.childNodes.forEach(element => {
                if (element.className === 'text-element'){
                    element.innerText = sign;
                }
            });

            const tasks = localStorage.getItem('tasks') !== null 
            ? JSON.parse(localStorage.getItem('tasks')) 
            : [];

            tasks[elementIndex] = sign;
            localStorage.setItem('tasks', JSON.stringify(tasks));

        }
    }
})


function createSingleTaskElement(newTask){
    const li = document.createElement('li');
    li.className = 'collection-item list-group-item';
    
    const textElement = document.createElement('span');
    textElement.className = 'text-element';
    textElement.innerText = newTask;
    li.appendChild(textElement);

    const editElement = document.createElement('span');
    editElement.className = 'edit-item badge bg-secondary m-1';
    editElement.innerHTML = '<i class="fa fa-edit"></i>';
    li.appendChild(editElement);

    const deleteElement = document.createElement('span');
    deleteElement.className = 'delete-item badge bg-secondary m-1';
    deleteElement.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(deleteElement);

    taskList.appendChild(li);
}

function storeTaskInLocalStorage(newTask){

    const tasks = localStorage.getItem('tasks') !== null 
    ? JSON.parse(localStorage.getItem('tasks')) 
    : [];

    tasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', renderTasks);

function renderTasks() {
    
    const tasks = localStorage.getItem('tasks') !== null 
    ? JSON.parse(localStorage.getItem('tasks')) 
    : [];

    tasks.forEach(element => {
        createSingleTaskElement(element);
    });
    
}

clearButton.addEventListener('click', ()=>{
    if (confirm('Are you sure?')){
        localStorage.clear();
        taskList.innerHTML = '';
    }

})