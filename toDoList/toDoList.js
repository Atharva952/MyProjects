document.addEventListener('DOMContentLoaded', ()=>{
const input = document.getElementById('todo-input');
const taskBtn = document.getElementById('task-btn');
const todoList = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => renderTask(task))

taskBtn.addEventListener('click', ()=>{
    const tasktext = input.value.trim()
    if(tasktext === ""){
        return;
    }

    const newTask = {
        id:Date.now(),
        text: tasktext,
        completed :false

    }
    tasks.push(newTask)
    saveTask();
    renderTask(newTask)
    input.value = "";
    console.log(tasks);
    
});

function renderTask(task){
    const li = document.createElement('li')
    li.setAttribute('data-id',task.id)
    if(task.completed) {
        li.classList.add('completed') 
    }
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`;
    li.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON' ) return;
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTask();

    })
    li.querySelector('button').addEventListener('click', (e)=>{
        e.stopPropagation()
        tasks = tasks.filter(t => t.id !== task.id)
        li.remove();
        saveTask();
    })
    todoList.appendChild(li);
    
}

function saveTask(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
})



