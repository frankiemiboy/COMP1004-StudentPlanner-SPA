/*------------------------------------Navigation------------------------------------*/

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



/*------------------------------------Task Manager------------------------------------*/

// This is the class for the main task object
// Task and Subtask classes
class Task {
    constructor(title, description, taskID) {
        this.title = title;
        this.description = description;
        //this.date = date;
        this.taskID = taskID;
        this.subtasks = []; // Composition: Task contains subtasks
    }

    addSubtask(subtask) {
        this.subtasks.push(subtask);
    }
}

class Subtask {
    constructor(title, subtaskID) {
        this.title = title;
        //this.description = description;
        this.subtaskID = subtaskID;
    }
}

// Task Manager to handle tasks and subtasks
class TaskManager {
    constructor() {
        this.tasks = [];
        this.taskID = 0;
        this.subtaskID = 0;
    }

    createTask(title, description) {
        this.taskID++;
        const newTask = new Task(title, description);
        const taskID = this.taskID;
        this.tasks.push(newTask);
        this.addTaskToList(newTask);
        console.log(`Task created with ID: ${taskID}`);
    }

    addTaskToList(task) {
        const taskElement = document.createElement("li");
        taskElement.id = this.taskID;
        taskElement.innerHTML = `${task.title}`;
        const taskDescription = document.createElement("dd");
        taskDescription.innerHTML = `${task.description}`;
        const subTaskList = document.createElement("ul");
        taskElement.appendChild(subTaskList);       

        // Button to add a subtask
        const addSubtaskButton = document.createElement("button");
        addSubtaskButton.innerHTML = "Add Subtask";
        addSubtaskButton.onclick = () => this.addSubtaskToList(task, subTaskList);

        taskElement.appendChild(addSubtaskButton);
        document.getElementById("tasksList").appendChild(taskElement);
    }

    createSubtask(task, taskElement) {
        const subtaskTitle = prompt("Enter subtask title:");
        // const subtaskDescription = prompt("Enter subtask description:");
        if (subtaskTitle/*&& subtaskDescription*/) {
            const newSubtask = new Subtask(subtaskTitle/*, subtaskDescription*/, subtaskID);
            task.addSubtask(newSubtask);
            this.addSubtaskToList(newSubtask, taskElement);
        }
    }

    addSubtaskToList(subtask, taskElement) {
        const subtaskElement = document.createElement("li");
        subtaskElement.innerHTML = `${subtask.title}`;
        taskElement.appendChild(subtaskElement);
    }
}

const taskManager = new TaskManager();


/*
// Handle task form submission
document.getElementById("taskForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    if (title && description) {
        taskManager.createTask(title, description);
        document.getElementById("taskForm").reset();
    }
});
*/

/*------------------------------------Task Manager------------------------------------*/

/*
function formTask(){
    Task1 = new Task(`Task ${i}`, `Task ${i} Description`, `Task ${i} Due Date`);
}

function displayTask(){
    formTask();
    document.getElementById("demo").innerHTML = Task1.taskTitle + "<br>" + Task1.taskDescription + "<br>" + Task1.taskDueDate;
}

class subTask {
    constructor(title, description) {
        this.subTaskTitle = title;
        this.subTaskDescription = description;
    }
}
*/
