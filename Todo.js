// document.addEventListener('DOMContentLoaded', () => {
//     const task = document.getElementById('task');
//     task.classList.add('centered-input');
//     const addbttn = document.getElementById('add-task');
//     const tskbtn = document.getElementById('task-list');
    
//     const addTask = (event) => {
//         event.preventDefault();
//         const taskText = task.value.trim();
//         if(! taskText){
//             return;
//         }

//         const li = document.createElement('li');
//         li.innerHTML = '
//         <input type="checkbox" class="checkbos">
//         <span>${taskText}</span>
//         ';
//         li.textContent = taskText;
//         tskbtn.appendChild(li);
//         task.value = '';
//         task.className('centered-input');
//     };
//     addbttn.addEventListener('click', addTask);
//     task.addEventListener('keypress', (e) => {
//         if(e.key === 'Enter'){
//             addTask(e);
//         }
//     });
// });
    const API_URL = "http://localhost:8080/api/todos"
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const taskInput = document.getElementById('task');
    const addTaskBtn = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const form = document.querySelector('form');

    // Load tasks from localStorage when page loads
    loadTasks();

    // Add task when form is submitted
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask();
    });

    // Add task when button is clicked
    addTaskBtn.addEventListener('click', function(e) {
        e.preventDefault();
        addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create new task item
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="task-actions">
                <button class="complete-btn"><i class="fa-solid fa-check">✓</i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash">×</i></button>
            </div>
        `;

        // Add event listeners for the buttons
        const completeBtn = taskItem.querySelector('.complete-btn');
        const deleteBtn = taskItem.querySelector('.delete-btn');

        completeBtn.addEventListener('click', function() {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        deleteBtn.addEventListener('click', function() {
            taskItem.remove();
            saveTasks();
        });

        // Add to the list
        taskList.appendChild(taskItem);
        
        // Clear input and save tasks
        taskInput.value = '';
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                if (task.completed) {
                    taskItem.classList.add('completed');
                }
                
                taskItem.innerHTML = `
                    <span class="task-text">${task.text}</span>
                    <div class="task-actions">
                        <button class="complete-btn"><i class="fa-solid fa-check">✓</i></button>
                        <button class="delete-btn"><i class="fa-solid fa-trash">×</i></button>
                    </div>
                `;

                // Add event listeners for loaded tasks
                const completeBtn = taskItem.querySelector('.complete-btn');
                const deleteBtn = taskItem.querySelector('.delete-btn');

                completeBtn.addEventListener('click', function() {
                    taskItem.classList.toggle('completed');
                    saveTasks();
                });

                deleteBtn.addEventListener('click', function() {
                    taskItem.remove();
                    saveTasks();
                });

                taskList.appendChild(taskItem);
            });
        }
    }

    // Optional: Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});