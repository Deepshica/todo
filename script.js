document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert("Please enter a task!");
    return;
  }

  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  saveTasks(tasks);

  taskInput.value = '';
  loadTasks();
}

function loadTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const tasks = getTasks();
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleComplete(index);

    const span = document.createElement('span');
    span.textContent = task.text;

    const actions = document.createElement('div');
    actions.classList.add('action-buttons');

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✏️';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  loadTasks();
}

function editTask(index) {
  const tasks = getTasks();
  const newText = prompt('Edit your task:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    saveTasks(tasks);
    loadTasks();
  }
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  loadTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem('todoTasks')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}
