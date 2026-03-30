const tasks = [];
const form = document.getElementById("todo-form");
const listContainer = document.querySelector(".listTasks");
const input = document.getElementById("task-input");

form.onsubmit = (e) => {
    e.preventDefault();
    addTask();
};

function addTask() {
    const text = input.value.trim();
    if (text === "") return;

    const taskObj = {
        task_id: tasks.length,
        text: text,
        done: false
    };

    tasks.push(taskObj);
    renderTask(taskObj);
    input.value = "";
}

function renderTask(task) {
    const div = document.createElement("div");
    div.classList.add("task-item");
    div.setAttribute("data-task-id", task.task_id);

    div.innerHTML = `
        <button class="delete-btn"><i class="fas fa-times"></i></button>
        <input type="checkbox" class="task-check">
        <label>${task.text}</label>
    `;

    // Bonus Logic: Done/Delete Listeners
    div.querySelector(".task-check").onchange = (e) => doneTask(e, task.task_id);
    div.querySelector(".delete-btn").onclick = () => deleteTask(div, task.task_id);

    listContainer.appendChild(div);
}

function doneTask(event, id) {
    const task = tasks.find(t => t.task_id === id);
    task.done = event.target.checked;
    
    const label = event.target.nextElementSibling;
    label.classList.toggle("is-done", task.done);
}

function deleteTask(element, id) {
    element.remove();
    const index = tasks.findIndex(t => t.task_id === id);
    if (index > -1) tasks.splice(index, 1);
}
