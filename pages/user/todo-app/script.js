const today = new Date();
const options = { day: 'numeric', month: 'long', year: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);
document.getElementById('task-date').textContent = `📅 Tasks for ${formattedDate}`;
const taskNameInput = document.getElementById('task-name');
const taskPrioritySelect = document.getElementById('task-priority');
const taskStatusSelect = document.getElementById('task-status');
const taskDueDateInput = document.getElementById('task-due-date');
const saveButton = document.getElementById('save-task-btn');
const taskNameInputEdit = document.getElementById('task-name-edit');
const taskPrioritySelectEdit = document.getElementById('task-priority-edit');
const taskStatusSelectEdit = document.getElementById('task-status-edit');
const taskDueDateInputEdit = document.getElementById('task-due-date-edit');
const saveButtonEdit = document.getElementById('save-task-btn-edit');
const clearStorageBtn = document.getElementById('clear-storage');
clearStorageBtn.addEventListener('click', () => {
    localStorage.removeItem('activeUser');
    location.reload();
});
let activeUser = localStorage.getItem('activeUser') ? JSON.parse(localStorage.getItem('activeUser')) : null;
let tasksFull = JSON.parse(localStorage.getItem('tasks')) || [{
    userId: activeUser.id,
    tasks: []
}];
let tasks = tasksFull.find(task => task.userId == activeUser.id) || {
    userId: activeUser.id,
    tasks: []
};
let editTaskIndex = null;
function renderTasks() {
    const container = document.getElementById('container-tasks');
    const tasksList = document.getElementById('task-list');
    const noTaskDiv = document.getElementById('no-tasks');
    tasksList.innerHTML = '';
    if (tasks.tasks.length == 0) {
        noTaskDiv.style.display = 'block';
        return;
    }
    noTaskDiv.style.display = 'none';
    tasks.tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'bg-indigo-200 p-4 rounded-lg mb-4 w-full max-w-3xl mx-auto flex justify-between items-center';

        const priorityColors = {
            Low: 'bg-green-100 text-green-700',
            Medium: 'bg-yellow-100 text-yellow-700',
            High: 'bg-red-100 text-red-700'
        };

        const statusColors = {
            'In Progress': 'bg-blue-100 text-blue-700',
            Completed: 'bg-green-100 text-green-700',
            Pending: 'bg-gray-100 text-gray-700'
        };

        taskItem.innerHTML = `
            <div class="flex justify-between items-start w-full">
                <div>
                    <h4 class="text-lg font-semibold text-indigo-700 flex items-center gap-2">
                        ${task.name}
                    </h4>
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span class="text-xs font-medium px-2 py-1 rounded-full ${priorityColors[task.priority]}">
                            ${task.priority} Priority
                        </span>
                        <span class="text-xs font-medium px-2 py-1 rounded-full ${statusColors[task.status]}">
                            📋 ${task.status}
                        </span>
                        <span class="text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
                            📅 Due: ${task.dueDate || 'N/A'}
                        </span>
                    </div>
                </div>
                <button 
                    class="ml-4 text-indigo-500 hover:text-indigo-700 text-lg" data-toggle="modal" data-target="#editTaskModal"
                    onclick="(() => {
                        editTask(${index});
                    })()">
                    ✏️
                </button>
                <button 
                    class="ml-4 text-red-500 hover:text-red-700 text-lg"
                    onclick="(() => {
                        tasks.splice(${index}, 1);
                        renderTasks();
                    })()">
                    🗑️
                </button>
            </div>
        `;
        tasksList.appendChild(taskItem);
    });
}

renderTasks();

saveButton.addEventListener('click', () => {
    const task = {
        id: tasks.length + 1,
        name: taskNameInput.value,
        priority: taskPrioritySelect.value,
        status: taskStatusSelect.value,
        dueDate: taskDueDateInput.value
    };
    tasks.tasks.push(task);
    const tasksFull = JSON.parse(localStorage.getItem('tasks')) || [];
    tasksFilter = tasksFull.filter(task => task.userId != activeUser.id);
    tasksFilter.push(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasksFilter));
    taskNameInput.value = '';
    taskPrioritySelect.value = 'Low';
    taskStatusSelect.value = 'In Progress';
    taskDueDateInput.value = '';
    $('.modal').modal('hide');
    renderTasks();
});

function editTask(index) {
    const task = tasks.tasks[index];
    editTaskIndex = index;
    taskNameInputEdit.value = task.name;
    taskPrioritySelectEdit.value = task.priority;
    taskStatusSelectEdit.value = task.status;
    taskDueDateInputEdit.value = task.dueDate;
}
saveButtonEdit.addEventListener('click', () => {
    const task = {
        id: tasks.tasks[editTaskIndex].id,
        name: taskNameInputEdit.value,
        priority: taskPrioritySelectEdit.value,
        status: taskStatusSelectEdit.value,
        dueDate: taskDueDateInputEdit.value
    };
    tasks.tasks[editTaskIndex] = task;
    const tasksFull = JSON.parse(localStorage.getItem('tasks')) || [];
    tasksFilter = tasksFull.filter(task => task.userId != activeUser.id);
    tasksFilter.push(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasksFilter));
    taskNameInputEdit.value = '';
    taskPrioritySelectEdit.value = 'Low';
    taskStatusSelectEdit.value = 'In Progress';
    taskDueDateInputEdit.value = '';
    $('.modal').modal('hide');
    renderTasks();
});