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
class Task {
    constructor(title, description, date) {
        this.taskTitle = title;
        this.taskDescription = description;
        // this.taskDueDate = date;
    }
    
}

// This is the class for the subtask object
class SubTask {
    constructor(title, description) {
        this.subTaskTitle = title;
        this.subTaskDescription = description;
    }
}



// These are the elements that will be created for each subtask
let newSubTaskList = document.createElement("ul");
let newSubTaskTitle = document.createElement("li");
let newSubTaskDescription = document.createElement("dd");


// This is the class for the task manager object, responsible for creating tasks
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
        // These are the elements that will be created for each task
        let newTaskTitle = document.createElement("li");
        let newTaskDescription = document.createElement("dd");
        let newHorizontalRule = document.createElement("hr");
        document.getElementById("tasksList").appendChild(newHorizontalRule);
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

// This is the class for the subtask manager object, responsible for creating subtasks
class subTaskManager {
    constructor() {
        this.subTaskMap = {};
        this.subTaskID = 0;
    }

    createSubTask(title, description) {
        this.subTaskID++;
        const subTaskID = `SubTask${this.subTaskID}`;
        this.subTaskMap[this.subTaskID] = new SubTask(title, description);
        console.log(`Subtask created with ID: ${subTaskID}`);
    
        this.addSubTaskToDOM(title, description);
    }

    addSubTaskToDOM(title, description, newTaskTitle) {
        newSubTaskList.classList.add("individualTaskProperties");
        newSubTaskTitle.classList.add("subTaskTitle");
        newSubTaskTitle.innerHTML = `${title}\n`;
        newSubTaskDescription.classList.add("subTaskDescription");
        newSubTaskDescription.innerHTML = `${description}`;
        newSubTaskTitle.appendChild(newSubTaskDescription);
        newSubTaskList.appendChild(newSubTaskTitle);
        newTaskTitle.appendChild(newSubTaskList);        
    }

    listSubTasks() {
        for (const [key, subTask] of Object.entries(this.subTaskMap)) {
            console.log(`SubTask ID: ${key}\n` + `SubTask Title: ${subTask.subTaskTitle}\n` + `SubTask Description: ${subTask.subTaskDescription}`);
        }
    }

}

const taskManager_ = new taskManager();
taskManager_.createTask("Race the hot wheels cars... Title", "Lightning McQueen must win at all costs, no matter what, followed by matter... Description");
taskManager_.createTask("Race the hot wheels cars... Title", "Lightning McQueen must win at all costs, no matter what, followed by matter... Description");
const subTaskManager_ = new subTaskManager();
subTaskManager_.createSubTask("Subtask 1", "Subtask 1 Description");
// taskManager1.listTasks();



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
