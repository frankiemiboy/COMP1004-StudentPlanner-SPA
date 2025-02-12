/* 
Show page based on button click.
The function will remove the desired page from the hidden class, meaning that it is displayed
But the other pages that were previously displayed are added to the hidden class, therefore no longer displayed.
*/
function showPage(pageId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.toggle('hidden', section.id !== pageId);
    });
}

          
/* 
Attach event listeners to navigation buttons
The clicked button is used as a parameter for the the showPage() function  
*/
document.querySelectorAll('.navigationButtons').forEach(button => {
    button.addEventListener('click', () => {
        showPage(button.dataset.page);
    });
});
/*------------------------------------Navigation------------------------------------*/






// Task and Subtask classes
class Task {
    constructor(title, taskID) {
        this.title = title;
        //this.description = description;
        //this.date = date;
        this.taskID = taskID;
        //this.subtasks = []; // Composition: Task contains subtasks
    }

    /*
    addSubtask(subtask) {
        this.subtasks.push(subtask);
    }
    */
}

class TaskManager {
    constructor() {
        this.tasks = [];
        this.taskID = 1;

        //Form Submission Handler
        this.initialiseFormHandler();
    }

    initialiseFormHandler() {
        const taskForm = document.getElementById('taskInputForm');
        taskForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent page refresh
            const taskTitle = document.getElementById('taskInputTitle').value;

            if (taskTitle.trim() === '') {
                //alert("Task title cannot be empty.");
                return;
            }

            this.createTask(taskTitle, this.taskID);
            taskForm.reset(); // Clear the form after submission
            console.log(this.tasks);
            console.log(this.tasks.length);
        });
    }

    createTask(title, ID) {
        const newTask = new Task(title, ID);
        
        this.addTaskToList(newTask);
        this.tasks.push(newTask);
        this.taskID++;
    }

    addTaskToList(task) {
        const newtaskTitle = document.createElement('li');
        const taskId = "Task_" + task.taskID;
        newtaskTitle.classList.add("taskTitleContainer");
        newtaskTitle.innerHTML = `
            <input type="checkbox" id="${taskId}">
            <label class="customCheckbox" for="${taskId}">
                <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
            </label>
            <label for="${taskId}" class="taskTitle">${task.title}</label>
            <button class="deleteTaskButton" style="display: inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
            
        `;
        const newHorizontalRule = document.createElement('hr');
        const taskList = document.getElementById('tasksList');
        if (taskList.children.length > 0) {
            taskList.insertBefore(newHorizontalRule, taskList.children[0]);
            taskList.insertBefore(newtaskTitle, taskList.children[0]);
        }
        else{
            document.getElementById('tasksList').appendChild(newtaskTitle);
            document.getElementById('tasksList').appendChild(newHorizontalRule);
        }

        // Add event listener to delete button
        const deleteButton = newtaskTitle.querySelector('.deleteTaskButton');
        deleteButton.addEventListener('click', () => {
            this.deleteTask(task.taskID);
            newtaskTitle.remove();
            newHorizontalRule.remove();
        });
    }

    deleteTask(taskID) {
        const taskIndex = this.tasks.findIndex(task => task.taskID === taskID);
        if (taskIndex === -1) {
            return;
        }
        const removed = this.tasks.splice(taskIndex, 1);
        console.log(this.tasks);
        console.log(removed);
    }
}


const TaskManager_ = new TaskManager();




/*function createTask() {
    const taskTitle = document.getElementById("taskInputForm").value;
    TaskManager_.createTask(taskTitle, TaskManager_.taskID);
    console.log(TaskManager_.tasks);
}*/