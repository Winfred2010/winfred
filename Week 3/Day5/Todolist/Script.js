const tasks = [];
const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const listContainer = document.querySelector('.listTasks');

form.addEventListener('submit', addTask);

function addTask(event) {
    event.preventDefault(); // Prevent page refresh

    if (taskInput.value.trim() === "") return;

    // Create Task Object (Bonus 1)
    const newTask = {
        task_id: tasks.length,
        text: taskInput.value,
        done: false
    };

    tasks.push(newTask);
    renderTasks();
    taskInput.value = ""; // Clear input
}

function renderTasks() {
    listContainer.innerHTML = ""; // Clear list before re-rendering

    tasks.forEach((task) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-item');
        taskDiv.setAttribute('data-task-id', task.task_id);
        
        // Bonus styling for completed tasks
        if (task.done) taskDiv.classList.add('is-done');

        taskDiv.innerHTML = `
            <button class="delete-btn" onclick="deleteTask(${task.task_id})">
                <i class="fas fa-times"></i>
            </button>
            <input type="checkbox" ${task.done ? 'checked' : ''} 
                   onchange="doneTask(${task.task_id})">
            <span>${task.text}</span>
        `;

        listContainer.appendChild(taskDiv);
    });
}

// Bonus 1: Toggle 'done' state
function doneTask(id) {
    const taskIndex = tasks.findIndex(t => t.task_id === id);
    tasks[taskIndex].done = !tasks[taskIndex].done;
    renderTasks();
}

// Bonus 2: Delete task
function deleteTask(id) {
    const taskIndex = tasks.findIndex(t => t.task_id === id);
    tasks.splice(taskIndex, 1);
    renderTasks();
}