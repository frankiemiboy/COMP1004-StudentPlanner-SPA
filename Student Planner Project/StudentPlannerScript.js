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

class Task {
    constructor(title, description, date) {
        this.taskTitle = title;
        this.taskDescription = description;
        // this.taskDueDate = date;
    }
    
}

class taskManager {
    constructor() {
        this.taskMap = {}; // Object to store tasks as key-value pairs
        this.taskID = 0; // ID to assign to tasks
    }

        createTask(title, description) {
        if (!title) {
            console.error("Title is required to create a task.");
            return;
        }
    
        this.taskID++;
        const taskID = `Task${this.taskID}`; // Dynamically create task ID that will change every time a new task is created
        this.taskMap[this.taskID] = new Task(title, description);
        console.log(`Task created with ID: ${taskID}`);
    
        this.addTaskToDOM(title, description);
    }
    
    addTaskToDOM(title, description) {
        let newTaskTitle = document.createElement("li");
        let newTaskDescription = document.createElement("dd");
        newTaskDescription.innerHTML = `${description}`;
        newTaskDescription.classList.add("taskDescription");
        newTaskTitle.innerHTML = `${title}\n`;
        newTaskTitle.classList.add("taskTitle");
        newTaskTitle.appendChild(newTaskDescription);
        document.getElementById("tasksList").appendChild(newTaskTitle);
    }

    listTasks() {
        for (const [key, task] of Object.entries(this.taskMap)) {
            console.log(`Task ID: ${key}\n` + `Task Title: ${task.taskTitle}\n` + `Task Description: ${task.taskDescription}`);
        }
    }

}

const taskManager1 = new taskManager();
taskManager1.createTask("Race the hot wheels cars... Title", "Lightning McQueen must win at all costs, no matter what, followed by matter... Description");
taskManager1.listTasks();



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
