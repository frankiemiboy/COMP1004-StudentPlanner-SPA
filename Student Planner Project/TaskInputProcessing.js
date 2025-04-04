/*--------------------------------------Navigation------------------------------------*/
// Function to show the selected page and hide others
function showPage(pageId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.toggle('hidden', section.id !== pageId);
    });
    localStorage.setItem('currentPage', pageId);
}

document.querySelectorAll('.navigationButtons').forEach(button => {
    button.addEventListener('click', () => {
        showPage(button.dataset.page);
    });
});

// Ensure that the user is taken to the last page they were on when they refresh the page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = localStorage.getItem('currentPage') || 'tasksPage';
    showPage(currentPage); // Show the page saved in local storage
});
/*------------------------------------Navigation------------------------------------*/



/*------------------------------------Task Management------------------------------------*/

// Task and Subtask classes
class Task {
    constructor(title, taskID, status) {
        this.title = title;
        this.taskID = taskID;
        this.status = status;
    }

}

let tasks = [];
let taskID = 1; // Static ID for tasks
loadTasksFromLocalStorage(); // Load tasks from local storage on page load
loadTaskIDFromLocalStorage(); // Load task ID from local storage on page load
initialiseFormHandler(); // Initialise the form handler

function initialiseFormHandler() {
    const taskForm = document.getElementById('taskInputForm');
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskTitle = document.getElementById('taskInputTitle').value;
        if (taskTitle.trim() === '') {
            return;
        }
        createTask(taskTitle, taskID);
        taskForm.reset();
        console.log(tasks);
        console.log(tasks.length);
    });
}

function createTask(title, ID) {
    const newTask = new Task(title, ID, false);
    tasks.push(newTask);
    refreshTaskList();
    taskID++;
    localStorage.setItem('taskID', taskID);
    pushTasksToLocalStorage();
}

function refreshTaskList() {
    const taskList = document.getElementById('tasksList');
    taskList.innerHTML = "";
    if (tasks.length === 0) {
        taskList.innerHTML = `<div style="display: flex; justify-content:center;"><p>Currently no tasks to display. Please enter a task.</p></div?`;
        return;
    }
    // Re-add each task to the list in reverse order; newly added tasks are placed at the top of the list
    for (let i = (tasks.length - 1); i >= 0; i--) {
        const task = tasks[i];
        addTaskToList(task);
    }
}

function addTaskToList(task) {
    const newtaskTitle = document.createElement('li');
    const taskId = "Task_" + task.taskID;
    newtaskTitle.classList.add("taskTitleContainer");
    newtaskTitle.innerHTML = `
        <input type="checkbox" id="${taskId}">
        <label class="customCheckbox" for="${taskId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${taskId}" class="taskTitle">${task.title}</label>
        <button class="deleteButton" style="display: inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
        
    `;
    const newHorizontalRule = document.createElement('hr');
    const taskList = document.getElementById('tasksList');
    taskList.appendChild(newtaskTitle);
    taskList.appendChild(newHorizontalRule);

    // Event listener for delete button
    const deleteButton = newtaskTitle.querySelector('.deleteButton');
    deleteButton.addEventListener('click', () => {
        deleteTask(task.taskID);
        newtaskTitle.remove();
        newHorizontalRule.remove();
    });

    // Event listener for checkbox
    const checkbox = newtaskTitle.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            task.status = true; // Mark task as complete
        } else {
            task.status = false; // Mark task as incomplete
        }
        pushTasksToLocalStorage();
    });

    // Set the checkbox state based on the task status
    checkbox.checked = task.status;
}

function deleteTask(taskID) {
    const taskIndex = tasks.findIndex(task => task.taskID === taskID);
    if (taskIndex === -1) {
        return;
    }
    const removed = tasks.splice(taskIndex, 1);
    pushTasksToLocalStorage();
    console.log(tasks);
    console.log(removed);
    if (tasks.length === 0) {
        const taskList = document.getElementById('tasksList');
        taskList.innerHTML = `<div style="display: flex; justify-content:center;"><p>Currently no tasks to display. Please enter a task.</p></div>`;
    }
}

// Function to push the task list to local storage
function pushTasksToLocalStorage() {
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksJSON);
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    refreshTaskList();
}

function loadTaskIDFromLocalStorage() {
    const storedTaskID = localStorage.getItem("taskID");
    if (storedTaskID) {
        taskID = parseInt(storedTaskID, 10);
    } else {
        taskID = 1; // Default value if not found
    }
}

/*------------------------------------End of Task Management------------------------------------*/


/*------------------------------------Module Management------------------------------------*/

// Module and Assessment classes
class Module {
    constructor() {
        this.moduleCode = "Not Specified";
        this.moduleName = "Not Specified";
        this.lectureDays = "Not Specified";

        // Lecturer Information
        this.lecturerName = "Not Specified";
        this.lecturerEmail = "Not Specified";
        this.lecturerOffice = "Not Specified";

        //The number of exams and assignments that the module has
        this.numExams = 0;
        this.numAssignments = 0;
    }

}

class Assignment {
    constructor(assignmentTitle, moduleCode, dueDate, contribution) {
        this.assignmentTitle = assignmentTitle;
        this.moduleCode = moduleCode;
        this.dueDate = dueDate;
        this.contribution = contribution;
        this.assignmentID = 0;
    }
}

class Exam {
    constructor(examTitle, moduleCode, dueDate, contribution) {
        this.examTitle = examTitle;
        this.moduleCode = moduleCode;
        this.dueDate = dueDate;
        this.contribution = contribution;
        this.examID = 0;
    }
}

class Lecturer {
    constructor(name, email, office) {
        this.name = name;
        this.email = email;
        this.office = office;
    }
}

// Arrays to store modules and assessments
let modules = [];
let assignments = [];
let exams = [];

// Array to store temporary assessments before they are saved to the module
let temporaryAssignments = [];
let temporaryExams = [];

// Temporary lecturer details
let temporaryLecturer = new Lecturer("", "", "");

// Global variables for modules and assessments
const modulesPage = document.getElementById('modulesPage');
let tempAssessmentID = 1;
let assessmentID = 1;
let unsavedAssignmentDataPresent = false;
let unsavedExamDataPresent = false;
let unsavedLecturerDataPresent = false;
let edittingLecturer = false;
let edittingModule = false;
let currentModuleCode = "";
let currentModuleIndex = -1;

loadModulesFromLocalStorage();
loadAssignmentsFromLocalStorage();
loadExamsFromLocalStorage();
loadAssessmentIDFromLocalStorage();
displayModuleCards(); // Display the module cards on page load


// ------------Navigating around the module page---------//
// Function to open the module add overlay
function openModuleAddOverlay() {
    const addModuleOverlay = document.createElement('div');
    addModuleOverlay.id = "moduleAddOverlay";
    addModuleOverlay.classList.add("overlay");
    addModuleOverlay.innerHTML =`
                    <div class="overlay_Content">
                        <h2 id="moduleOverlayHeader">Add Module</h2>
                        <form id="moduleInputForm">
                            <div class="moduleDetails_Input-Container">
                                <label for="moduleCode_Input">Module Code:</label>
                                <input type="text" id="moduleCode_Input" class="overlay_Input" name="moduleCode" placeholder="Enter Module Code" required autocomplete="off">
                                <label for="moduleName_Input">Module Name:</label>
                                <input type="text" id="moduleName_Input" class="overlay_Input" name="moduleName" placeholder="Enter Module Name" autocomplete="off">
                                <label for="moduleLectureDays_Input">Lecture Days:</label>
                                <input type="text" id="moduleLectureDays_Input" class="overlay_Input" name="moduleLectureDays" placeholder="Enter Days on which Lectures are held" autocomplete="off">
                            </div>

                            <div style="display: flex; gap: 10px;">
                                <!--Buttons for submitting or cancelling the form-->
                                <button type="submit" id="moduleOverlay-saveModuleButton" class="overlayActionButtons overlay-saveButton">Save</button> <!--Remember to add the function to save/submit the module-->
                                <button type="button" id="moduleOverlay-cancelSaveModuleButton" class="overlayActionButtons overlay-cancelButton">Cancel</button>
                                
                                <!--Button to add more lecturer information-->
                                <button type="button" id="moduleOverlay-addLecturerDetailsButton" class="overlayActionButtons">Lecturer Information</button>

                                <!--Buttons for adding assignments and exams to the module-->
                                <button type="button" id="moduleOverlay-addAssignmentButton" class="overlayActionButtons">Assignments</button>
                                <button type="button" id="moduleOverlay-addExamButton" class="overlayActionButtons">Exams</button>
                            </div>
                        </form>

                        <p id="defaultAssessmentListHeader" >Any assessments that you add will be listed below:</p>
                        <div id="moduleOverlay-assessmentListContainer"></div>
                    </div>`;

    modulesPage.insertAdjacentElement('beforeend', addModuleOverlay);

    // Add an event listener to the form
    const moduleForm = addModuleOverlay.querySelector("#moduleInputForm");
    moduleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (edittingModule) {
            updateModule();
        }
        else {
            saveModule();
        }
    });

    // Add event listener to the cancel button
    const cancelButton = document.getElementById("moduleOverlay-cancelSaveModuleButton");
    if (edittingModule) {
        cancelButton.innerText = "Close";
    }
    cancelButton.addEventListener("click", () => {
        if (edittingModule) {
            // Exit editing mode
            edittingModule = false;
            edittingLecturer = false;
            currentModuleCode = "";
            currentModuleCode = -1;
        }
        closeModuleAddOverlay();
        displayModuleCards();
    });

    // Add event listener to the save lecturer details button
    const addLecturerDetailsButton = document.getElementById("moduleOverlay-addLecturerDetailsButton");
    addLecturerDetailsButton.addEventListener("click", () => {
        if (edittingModule) {
            editLecturerDetails();
        } 
        else {
            openLecturerDetailsInputForm();
        }
    });

    // Add event listener to the add assignment button
    const addAssignmentButton = document.getElementById("moduleOverlay-addAssignmentButton");
    addAssignmentButton.addEventListener("click", () => {
        if (edittingModule) {
            editAssessmentDetails('Assignment');
        }
        else {
            openAssessmentInputForm("Assignment");
        }
    });

    // Add event listener to the add exam button
    const addExamButton = document.getElementById("moduleOverlay-addExamButton");
    addExamButton.addEventListener("click", () => {
        if (edittingModule) {
            editAssessmentDetails('Exam');
        }
        else {
            openAssessmentInputForm("Exam");
        }
    });
}

function closeModuleAddOverlay() {
    unsavedAssignmentDataPresent = false;
    unsavedExamDataPresent = false;
    unsavedLecturerDataPresent = false;
    document.getElementById("moduleAddOverlay").remove();
    
    // Clear temporary details
    if (temporaryAssignments.length > 0) {
        temporaryAssignments = [];
    }
    if (temporaryExams.length > 0) {
        temporaryExams = [];
    }
    if (temporaryLecturer.name !== "") {
        temporaryLecturer = new Lecturer("", "", ""); // Reset temporary lecturer details
    }
}

// Function to open the lecturer details overlay
function openLecturerDetailsInputForm() {
    const lecturerDetailsOverlay = document.createElement('div');
    lecturerDetailsOverlay.id = "moduleLecturerDetailsOverlay";
    lecturerDetailsOverlay.classList.add("overlay");
    lecturerDetailsOverlay.innerHTML = `
                    <div id="moduleLecturerDetailsOverlay_Content" class="overlay_Content">
                        <h3>Addtional Lecturer Details</h3>
                        <form id="moduleLecturerDetailsForm">
                            <div class="moduleDetails_Input-Container">
                                <label for="moduleLecturerName_Input">Lecturer Name:</label>
                                <input type="text" id="moduleLecturerName_Input" class="overlay_Input" name="moduleLecturerName_Input" placeholder="e.g. Dr. John Doe" autocomplete="off">
                                <label for="moduleLecturerEmail_Input">Lecturer Email:</label>
                                <input type="text" id="moduleLecturerEmail_Input" class="overlay_Input" name="moduleLecturerEmail_Input" placeholder="e.g. name@example.com" autocomplete="off">
                                <label for="moduleLecturerOffice_Input">Lecturer Office:</label>
                                <input type="text" id="moduleLecturerOffice_Input" class="overlay_Input" name="moduleLecturerOffice_Input" placeholder="e.g. Room 100, Mary Newman Building" autocomplete="off">
                            </div>
                            <div style="display: flex; gap: 10px;">
                                <button type="submit" id="moduleLecturerDetails-saveButton" class="overlayActionButtons overlay-saveButton">Save</button>
                                <button type="button" id="moduleLecturerDetails-cancelButton" class="overlayActionButtons overlay-cancelButton">Cancel</button>
                            </div>
                        </form>
                    </div>`;
    document.getElementById("moduleAddOverlay").insertAdjacentElement('afterend', lecturerDetailsOverlay);

    //If the user has already entered lecturer details, display them in the input fields
    if (unsavedLecturerDataPresent) {
        if (edittingLecturer) {
            if (modules[currentModuleIndex].lecturerName !== "Not Specified") {
                document.getElementById("moduleLecturerName_Input").value = modules[currentModuleIndex].lecturerName;
            }
            if (modules[currentModuleIndex].lecturerEmail !== "Not Specified") {
                document.getElementById("moduleLecturerEmail_Input").value = modules[currentModuleIndex].lecturerEmail;
            }
            if (modules[currentModuleIndex].lecturerOffice !== "Not Specified") {
                document.getElementById("moduleLecturerOffice_Input").value = modules[currentModuleIndex].lecturerOffice;
            }
        }
        else {
            document.getElementById("moduleLecturerName_Input").value = temporaryLecturer.name;
            document.getElementById("moduleLecturerEmail_Input").value = temporaryLecturer.email;
            document.getElementById("moduleLecturerOffice_Input").value = temporaryLecturer.office;
        }
    }

    // Add event listener to the save button
    const lecturerDetailsForm = document.getElementById("moduleLecturerDetailsForm");
    lecturerDetailsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        unsavedLecturerDataPresent = true;
        if (edittingLecturer) {
            modules[currentModuleIndex].lecturerName = document.getElementById("moduleLecturerName_Input").value.trim();
            modules[currentModuleIndex].lecturerEmail = document.getElementById("moduleLecturerEmail_Input").value.trim();
            modules[currentModuleIndex].lecturerOffice = document.getElementById("moduleLecturerOffice_Input").value.trim();
        }
        else {
            saveTemporaryLecturerDetailsButton();
        }
        closeLecturerDetailsOverlay();
    });

    // Add event listener to the cancel button
    const lecturerDetailsCancelButton = document.getElementById("moduleLecturerDetails-cancelButton");
    if (edittingLecturer) {
        lecturerDetailsCancelButton.innerText = "Close";
    }
    lecturerDetailsCancelButton.addEventListener("click", () => {
        closeLecturerDetailsOverlay();
    });
}

function closeLecturerDetailsOverlay() {
    document.getElementById("moduleLecturerDetailsOverlay").remove();
}

// Function to temporarily save lecturer details for the module
function saveTemporaryLecturerDetailsButton() {
    temporaryLecturer.name = document.getElementById("moduleLecturerName_Input").value.trim();
    if (temporaryLecturer.name === '') {
        alert("Lecturer name cannot be empty.");
        return;
    }
    temporaryLecturer.email = document.getElementById("moduleLecturerEmail_Input").value;
    temporaryLecturer.office = document.getElementById("moduleLecturerOffice_Input").value;
}


// Function to open the assessment overlay
function openAssessmentInputForm(assessmentType) {
    const assessmentOverlay = document.createElement('div');
    assessmentOverlay.id = "assessmentOverlay";
    assessmentOverlay.classList.add("overlay");
    assessmentOverlay.innerHTML = `
                    <div class="overlay_Content">
                        <h2 id="assessmentOverlayHeader">Add ${assessmentType}</h2>
                        <form id="assessmentInputForm" >
                            <div class="assessmentDetailsInput-Container">                                
                                <label for="assessmentName_Input">${assessmentType} Title:</label>
                                <input type="text" id="assessmentName_Input" class="overlay_Input" name="assessmentName_Input" placeholder="Enter ${assessmentType} Title" autocomplete="off">
                                <label for="assessmentDueDate_Input">Date:</label>
                                <input type="date" id="assessmentDueDate_Input" class="overlay_Input" name="assessmentDueDate_Input">
                                <label for="assessmentContribution_Input">Contribution:</label>
                                <div>
                                    <input type="number" id="assessmentContribution_Input" class="overlay_Input" name="assessmentContribution" placeholder="Contribution to Final Grade (e.g. 30)">
                                    <label for="assessmentContribution_Input">%</label>
                                </div>
                            </div>

                            <button type="submit" id="assessmentOverlay-addAssessmentButton" class="overlayActionButtons">Add</button>
                            <button type="button" id="assessmentOverlay-saveAssessmentsButton" class="overlayActionButtons overlay-saveButton">Save</button>
                            <button type="button" id="assessmentOverlay-cancelAssessmentsButton" class="overlayActionButtons overlay-cancelButton">Cancel</button>
                        </form>
                        
                        <p>Any ${assessmentType}s You Add Will Appear Below:</p>
                        <u><b>${assessmentType}s:</b></u>
                        <ul id="assessmentOverlay-addedAssessmentsList"></ul>
                    </div>`;
    modulesPage.insertAdjacentElement('beforeend', assessmentOverlay);


    if (edittingModule) {
        // Make the save button the submit button
        document.getElementById("assessmentOverlay-saveAssessmentsButton").remove();
        const addButton = document.getElementById("assessmentOverlay-addAssessmentButton");
        addButton.classList.add("overlay-saveButton");
    }
    // Add event listener to the add button
    const addAssessmentForm = document.getElementById("assessmentInputForm");
    addAssessmentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (edittingModule) {
            addAssessmentToModule(assessmentType);
        }
        else {
            createTempAssessments(assessmentType);
        }
    });

    // Only enable this save button if the user is not editing an already existing module
    if (!edittingModule) {
        // Add event listener to the save button
        const saveAssessmentButton = document.getElementById("assessmentOverlay-saveAssessmentsButton");
        saveAssessmentButton.addEventListener("click", () => {
            transferTemporaryAssessments();
            if (assessmentType === "Assignment") {
                unsavedAssignmentDataPresent = true;
            }
            else if (assessmentType === "Exam") {
                unsavedExamDataPresent = true;
            }
            closeAssessmentInputForm();
        });
    }

    // Add event listener to the cancel button
    const cancelAssessmentButton = document.getElementById("assessmentOverlay-cancelAssessmentsButton");
    if (edittingModule) {
        cancelAssessmentButton.innerText = "Close";
    }
    cancelAssessmentButton.addEventListener("click", () => {
        closeAssessmentInputForm();
    });

    // Display the temporary assessments if they are present or the saved module assessments if the user is editing a module
    if (unsavedAssignmentDataPresent || unsavedExamDataPresent) {
        if (edittingModule) { // When the user is editing a module
            if (assessmentType === "Assignment") {
                displayAssessmentList("Assignment", assignments.filter(assignment => assignment.moduleCode === currentModuleCode));
            }
            else if (assessmentType === "Exam") {
                displayAssessmentList("Exam", exams.filter(exam => exam.moduleCode === currentModuleCode));
            }
        }
        else { // When the user is creating a module
            if (assessmentType === "Assignment") {
                displayAssessmentList("Assignment", temporaryAssignments);
            }
            else if (assessmentType === "Exam") {
                displayAssessmentList("Exam", temporaryExams);
            }
        }
    }
}

function closeAssessmentInputForm() {
    document.getElementById("assessmentOverlay").remove();
}

// Function to transfer temporary assessments to the module input form
function transferTemporaryAssessments() {
    const assessmentListContainer = document.getElementById("moduleOverlay-assessmentListContainer");
    assessmentListContainer.innerHTML = "";
    
    const assignmentList = document.createElement("ul");
    assignmentList.classList.add("moduleOverlay-addedAssessmentsLists");
    assignmentList.id = "moduleOverlay-addedAssignmentsList";
    assignmentList.innerHTML = "<u><b>Assignments:</b></u>";
    assessmentListContainer.appendChild(assignmentList);
    temporaryAssignments.forEach(assignment => {
        const assignmentItem = document.createElement("div");
        assignmentItem.classList.add("moduleOverlay-addedAssignmentItem");
        assignmentItem.innerHTML = `
            <li>${assignment.assignmentTitle}</li>
            <dd><b>Due date:</b> ${assignment.dueDate}</dd>
            <dd><b>Contribution:</b> ${assignment.contribution}%</dd>
            `;
        assignmentList.appendChild(assignmentItem);
        assignmentList.appendChild(document.createElement("hr"));
    });

    const examList = document.createElement("ul");
    examList.classList.add("moduleOverlay-addedAssessmentsLists");
    examList.id = "moduleOverlay-addedExamsList";
    examList.innerHTML = "<u><b>Exams:</b></u>";
    assessmentListContainer.appendChild(examList);
    temporaryExams.forEach(exam => {
        const examItem = document.createElement("div");
        examItem.classList.add("moduleOverlay-addedAssignmentItem");
        examItem.innerHTML = `
            <li>${exam.examTitle}</li>
            <dd><b>Due date:</b> ${exam.dueDate}</dd>
            <dd><b>Contribution:</b> ${exam.contribution}%</dd>
            `;
        examList.appendChild(examItem);
        examList.appendChild(document.createElement("hr"));
    });

}

// Function to expand the module information
function displayModuleInformation(moduleID) {
    const module = modules.find(module => module.moduleCode === moduleID);
    const moduleCode = module.moduleCode;
    const moduleName = module.moduleName;
    const lectureDays = module.lectureDays;
    const lecturerName = module.lecturerName;
    const lecturerEmail = module.lecturerEmail;
    const lecturerOffice = module.lecturerOffice;

    // Fetch the assignments and exams for the module
    const moduleAssignments = assignments.filter(assignment => assignment.moduleCode === moduleCode);
    const moduleExams = exams.filter(exam => exam.moduleCode === moduleCode);
    
    const moduleInformationOverlay = document.createElement('div');
    moduleInformationOverlay.id = "moduleInformationOverlay";
    moduleInformationOverlay.classList.add("overlay");
    moduleInformationOverlay.innerHTML = `
                    <div id="moduleInformationOverlay_Content" class="overlay_Content">
                        <div id="moduleInformationOverlay_Content-Header-Container" class="moduleInformationOverlay-divContainers">
                            <h2 id="moduleInformationOverlay-Header">${moduleCode} - ${moduleName}</h2>
                            <button id="moduleInformationOverlay-editButton" class="overlayActionButtons plainButtons">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                            </button>
                            <button id="moduleInformationOverlay-closeButton" class="overlayActionButtons plainButtons">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                            </button>
                        </div>
                        <hr>
                        <div class="moduleInformationOverlay-Container">
                            <div id="moduleInformationOverlay-lectureInformation-Container" class="moduleInformationOverlay-divContainers">
                                <div id="moduleInformationOverlay-lecturerInformation-Container">
                                    <h3>Lecturer Information:</h3>
                                    <div id="moduleInformationOverlay-lecturerInformation">
                                        <p><b>Name:</b> ${lecturerName}</p>
                                        <p><b>Email:</b> <a href="mailto:${lecturerEmail}">${lecturerEmail}</a></p>
                                        <p><b>Office:</b> ${lecturerOffice}</p>
                                    </div>
                                </div>
                                <div id="moduleInformationOverlay-lectureDays-Container">
                                    <h3>Lecture Days:</h3>
                                    <ul id="moduleInformationOverlay-lectureDaysList"></ul>
                                </div>
                            </div>
                            <br>
                            <h3>Assignments:</h3>
                            <ul id="moduleInformationOverlay-assignmentsList"></ul>
                            <br>
                            <h3>Exams:</h3>
                            <ul id="moduleInformationOverlay-examsList"></ul>
                        </div>
                        <br>
                        <div id="moduleInformationOverlay-deleteButton-Container" >
                            <button id="moduleDeleteButton" class="overlayActionButtons overlay-cancelButton">Delete Module</button>
                        </div>
                    </div>`;

    modulesPage.appendChild(moduleInformationOverlay);

    // Add event listener to the edit button
    const editButton = document.getElementById("moduleInformationOverlay-editButton");
    editButton.addEventListener("click", () => {
        editModuleInformation(moduleCode);
        closeModuleInformationOverlay();
    });

    // Add event listener to the close module information button
    const closeButton = document.getElementById("moduleInformationOverlay-closeButton");
    closeButton.addEventListener("click", () => {
        closeModuleInformationOverlay();
    });

    // Add event listener to the delete button
    const deleteButton = document.getElementById("moduleDeleteButton");
    deleteButton.addEventListener("click", () => {
        deleteModule(moduleCode);
        displayModuleCards();
        closeModuleInformationOverlay();
    });

    // Display lecture days
    const lectureDaysList = document.getElementById("moduleInformationOverlay-lectureDaysList");
    lectureDays.forEach (lectureday => { 
        const lectureDay = document.createElement("li");
        lectureDay.innerText = lectureday;
        lectureDaysList.appendChild(lectureDay);
    });
    

    // Display assignments and exams
    const assignmentsList = document.getElementById("moduleInformationOverlay-assignmentsList");
    const examsList = document.getElementById("moduleInformationOverlay-examsList");
    if (moduleAssignments.length === 0) {
        const noAssignments = document.createElement("p");
        noAssignments.innerText = "No assignments have been added to this module.";
        assignmentsList.appendChild(noAssignments);
    }
    else {
        moduleAssignments.forEach (assignment => { 
            // Format the date to DD/MM/YYYY
            let formattedDate = "";
            if (assignment.dueDate.trim() !== "") {
                const dateObject = new Date(assignment.dueDate);
                formattedDate = dateObject.toLocaleDateString();
            }
            const assignmentContainer = document.createElement("div");
            assignmentContainer.classList.add("moduleInformationOverlay-divContainers");
            assignmentsList.appendChild(assignmentContainer);
            const assignmentItemContainer = document.createElement("div");
            assignmentItemContainer.classList.add("moduleInformationOverlay-assessmentItem")
            assignmentItemContainer.innerHTML = `
                <li> ${assignment.assignmentTitle}</li>
                <dd><b>Due date:</b> ${formattedDate}</dd>`;
            assignmentContainer.appendChild(assignmentItemContainer);
            const assignmentContribution = document.createElement("dd");
            assignmentContribution.innerHTML = `Contribution: ${assignment.contribution}%`;
            assignmentContainer.appendChild(assignmentContribution);
            assignmentsList.appendChild(document.createElement("hr"));
        });
    }

    if (moduleExams.length === 0) {
        const noExams = document.createElement("p");
        noExams.innerText = "No exams have been added to this module.";
        examsList.appendChild(noExams);
    }
    else {
        moduleExams.forEach (exam => {
            // Format the date to DD/MM/YYYY
            let formattedDate = "";
            if (exam.dueDate.trim() !== "") {
                const dateObject = new Date(exam.dueDate);
                formattedDate = dateObject.toLocaleDateString();
            } 
            const examContainer = document.createElement("div");
            examContainer.classList.add("moduleInformationOverlay-divContainers");
            examsList.appendChild(examContainer);
            const examItemContainer = document.createElement("div");
            examItemContainer.classList.add("moduleInformationOverlay-assessmentItem")
            examItemContainer.innerHTML = `
                <li> ${exam.examTitle}</li>
                <dd><b>Due date:</b> ${formattedDate}</dd>`;
            examContainer.appendChild(examItemContainer);
            const examContribution = document.createElement("dd");
            examContribution.innerHTML = `Contribution: ${exam.contribution}%`;
            examContainer.appendChild(examContribution);
            examsList.appendChild(document.createElement("hr"));
        });
    }
}

function closeModuleInformationOverlay() {
    document.getElementById("moduleInformationOverlay").remove();
}

/* ------------End of Navigating around the module page---------- */


/* ------------Processing User Input for Mdules------------------ */
// Function to save the module input to the modules array
function saveModule() {
    const moduleCode = document.getElementById("moduleCode_Input").value.trim();
    const moduleName = document.getElementById("moduleName_Input").value.trim();

    // Check if the module code already exists
    const existingModule = modules.find(module => module.moduleCode === moduleCode);
    if (existingModule !== undefined) {
        alert("A module with the same code already exists.");
        return;
    }
    const lectureDays = document.getElementById("moduleLectureDays_Input").value.split(";");
    
    const newModule = new Module();
    newModule.moduleCode = moduleCode;
    newModule.moduleName = moduleName;
    newModule.lectureDays = lectureDays;
    
    // Add lecturer details if they are present
    if (temporaryLecturer.name !== "") {
        newModule.lecturerName = temporaryLecturer.name;
        newModule.lecturerEmail = temporaryLecturer.email;
        newModule.lecturerOffice = temporaryLecturer.office;
    }
    
    // Add assessments if they are present
    if (temporaryAssignments.length > 0) {
        temporaryAssignments.forEach(assignment => {
            assignment.moduleCode = moduleCode;
            assignment.assignmentID = assessmentID;
            assessmentID++;
            assignments.push(assignment);
            newModule.numAssignments++;
        });
    }
    if (temporaryExams.length > 0) {
        temporaryExams.forEach(exam => {
            exam.moduleCode = moduleCode;
            exam.examID = assessmentID;
            assessmentID++;
            exams.push(exam);
            newModule.numExams++;
        });
    }

    modules.push(newModule);
    pushModulesToLocalStorage();
    pushAssignmentsToLocalStorage();
    pushExamsToLocalStorage();
    pushAssessmentIDToLocalStorage();
    console.log(modules);
    displayModuleCards();
    closeModuleAddOverlay();
}

// Function to delete a module
function deleteModule(moduleCode) {
    const moduleIndex = modules.findIndex(module => module.moduleCode === moduleCode);
    if (moduleIndex === -1) {
        return;
    }
    deleteAllModuleAssessments(moduleCode);
    modules.splice(moduleIndex, 1);
    pushModulesToLocalStorage();
}

// Function to delete all assessments for a module
function deleteAllModuleAssessments(moduleCode) {
    for (let i = assignments.length - 1; i >= 0; i--) {
        if (assignments[i].moduleCode === moduleCode) {
            assignments.splice(i, 1);
        }
    }
    pushAssignmentsToLocalStorage();

    for (let i = exams.length - 1; i >= 0; i--) {
        if (exams[i].moduleCode === moduleCode) {
            exams.splice(i, 1);
        }
    }
    pushExamsToLocalStorage();
}



// Function to edit module information

function editModuleInformation(moduleCode) {
    // Show the module add overlay
    edittingModule = true;
    unsavedLecturerDataPresent = true;
    currentModuleIndex = modules.findIndex(module => module.moduleCode === moduleCode);
    if (currentModuleIndex === -1) {
        return;
    }
    currentModuleCode = modules[currentModuleIndex].moduleCode;
    openModuleAddOverlay();
    document.getElementById("defaultAssessmentListHeader").remove();

    // Prepopulate the input fields with the module details
    document.getElementById("moduleCode_Input").value = modules[currentModuleIndex].moduleCode;
    document.getElementById("moduleName_Input").value = modules[currentModuleIndex].moduleName;
    document.getElementById("moduleLectureDays_Input").value = modules[currentModuleIndex].lectureDays.join(";");
    
}

function updateModule() {
    const newModuleCode = document.getElementById("moduleCode_Input").value.trim();

    // Ensure that the user does not change the module code to one that already exists
    if (newModuleCode !== currentModuleCode) {
        const existingModule = modules.find(module => module.moduleCode === newModuleCode);
        if (existingModule !== undefined) {
            alert("A module with the same code already exists.");
            return;
        }
    }
    const newModuleName = document.getElementById("moduleName_Input").value.trim();
    const newLectureDays = document.getElementById("moduleLectureDays_Input").value.split(";");

    // Update the module details
    const module = modules[currentModuleIndex];
    module.moduleCode = newModuleCode; 
    module.moduleName = newModuleName;
    module.lectureDays = newLectureDays;
    pushModulesToLocalStorage();
    currentModuleCode = "";
    currentModuleIndex = -1;
    unsavedLecturerDataPresent = false;
    edittingLecturer = false;
    edittingModule = false;
    displayModuleCards();
    closeModuleAddOverlay();
}

// Function to edit lecturer details
function editLecturerDetails() {
    console.log("Edit button clicked");
    unsavedLecturerDataPresent = true;
    edittingLecturer = true;
    openLecturerDetailsInputForm();
}

// Function to edit assessment details
function editAssessmentDetails(assignmentType) {
    if (assignmentType === "Assignment") {
        unsavedAssignmentDataPresent = true;
    }
    else if (assignmentType === "Exam") {
        unsavedExamDataPresent = true;
    }
    else {
        return;
    }
    openAssessmentInputForm(assignmentType);
    console.log(unsavedAssignmentDataPresent);
    console.log(unsavedExamDataPresent);
    console.log(edittingModule);
}


// Function to display modules on the page
function displayModuleCards() {
    const moduleList = document.getElementById("moduleList");
    moduleList.innerHTML = "";
    if (modules.length === 0) {
        const noModules = document.createElement("p");
        noModules.innerText = "No modules have been added yet.";
        moduleList.appendChild(noModules);
        return;
    }
    for (let i = (modules.length - 1); i >= 0; i--) {
        const module = modules[i];
        const moduleElement = document.createElement("div");
        moduleElement.classList.add("moduleCard");
        moduleElement.id = module.moduleCode;
        moduleElement.innerHTML = `
            <header class="moduleCard_Header">
                <h3>${module.moduleCode} - ${module.moduleName}</h3>
            </header>
            <hr>
            <div class="moduleCard_Content">
                <h4 class="moduleCard_Content-itemHeader">Lecturer/Module Leader: </h4>
                <p class="moduleCard_Content-item">${module.lecturerName}</p>
                <h4 class="moduleCard_Content-itemHeader"">Lecture Days:</h4>
                <p id="${module.moduleCode}-lectureDays" class="moduleCard_Content-item"></p>
                <h4 class="moduleCard_Content-itemHeader"">Assignments:</h4>
                <p class="moduleCard_Content-item">${module.numAssignments} assignment(s)</p>
                <h4 class="moduleCard_Content-itemHeader"">Exams:</h4>
                <p class="moduleCard_Content-item">${module.numExams} exam(s)</p>
            </div>
            <hr>
            <div>
                <button id="expandModuleButton-${module.moduleCode}" class="expandModuleButton" onclick="displayModuleInformation('${module.moduleCode}')">View More</button>
            </div>
        `;
        
        moduleList.appendChild(moduleElement);
        
        // Display lecture days
        for (let j = 0; j < module.lectureDays.length; j++) {
            const lectureDay = document.createElement("span");
            lectureDay.innerText = `${module.lectureDays[j]};`;
            document.getElementById(`${module.moduleCode}-lectureDays`).appendChild(lectureDay);    
        }

    }
}

/* ------------Processing User Input for Mdules------------------ */






/*--- THIS FUNCTION ONLY APPLIES WHEN YOU ARE CREATING A NEW MODULE FROM SCRATCH---*/
// Function to add temporary assessments to assessment form for a module

function createTempAssessments(assessmentType) {
    const assessmentForm = document.getElementById("assessmentInputForm");

    // Determine if the assessment is an exam or assignment    
    const assessmentName = document.getElementById("assessmentName_Input").value;
    if (assessmentName.trim() === '') {
        alert("You must enter the title (name) of the assessment.");
        return;
    }

    const dueDate = document.getElementById("assessmentDueDate_Input").value;
    const contribution = document.getElementById("assessmentContribution_Input").value;

    if (assessmentType === "Assignment") {
        const assignment = new Assignment(assessmentName, '0', dueDate, contribution);
        assignment.assignmentID = tempAssessmentID;
        tempAssessmentID++;
        temporaryAssignments.push(assignment);
        displayAssessmentList(assessmentType, temporaryAssignments);
    }
    else if (assessmentType === "Exam") {
        const exam = new Exam(assessmentName, '0', dueDate, contribution);
        exam.examID = tempAssessmentID;
        tempAssessmentID++;
        temporaryExams.push(exam);
        displayAssessmentList(assessmentType, temporaryExams);
    }
    
    // Clear the input fields
    assessmentForm.reset();
}



// When editting assignments for module, this function will be used to add new assignments to the module
function addAssessmentToModule(assessmentType) {
    const assessmentForm = document.getElementById("assessmentInputForm");
    const assessmentName = document.getElementById("assessmentName_Input").value;
    if (assessmentName.trim() === '') {
        alert("You must enter the title (name) of the assessment.");
        return;
    }
    const dueDate = document.getElementById("assessmentDueDate_Input").value;
    const contribution = document.getElementById("assessmentContribution_Input").value;

    if (assessmentType === "Assignment") {
        const assignment = new Assignment(assessmentName, currentModuleCode, dueDate, contribution);
        assignment.assignmentID = assessmentID;
        assessmentID++;
        assignments.push(assignment);
        pushAssessmentIDToLocalStorage();
        modules[currentModuleIndex].numAssignments++;
        displayAssessmentList(assessmentType, assignments.filter(assignment => assignment.moduleCode === currentModuleCode));
    }
    else if (assessmentType === "Exam") {
        const exam = new Exam(assessmentName, currentModuleCode, dueDate, contribution);
        exam.examID = assessmentID;
        assessmentID++;
        exams.push(exam);
        pushAssessmentIDToLocalStorage();
        modules[currentModuleIndex].numExams++;
        displayAssessmentList(assessmentType, exams.filter(exam => exam.moduleCode === currentModuleCode));
    }
    pushAssignmentsToLocalStorage();
    pushExamsToLocalStorage();
    
    assessmentForm.reset(); // Clear the input fields
}

// Function to format the temporary assignments list and display them on the assignment form
function displayAssessmentList(assessmentType, assessmentList) {

    const tempAssessmentList = document.getElementById("assessmentOverlay-addedAssessmentsList");
    tempAssessmentList.innerHTML = "";
    
    if (assessmentType === "Assignment") {
        if (assessmentList.length === 0) {
            return;
        }
        assessmentList.forEach(assignment => {
            let formattedDate = "";
            if (assignment.dueDate.trim() !== "") {
                const dateObject = new Date(assignment.dueDate);
                formattedDate = dateObject.toLocaleDateString();
            }
            const tempAssignmentElement = document.createElement("div");
            tempAssignmentElement.classList.add("assessmentOverlay-AssessmentsList-Container");
            tempAssignmentElement.innerHTML = `
                <div class="assessmentOverlay-AssessmentItemContainer">
                    <li>${assignment.assignmentTitle}</li>
                    <dd><b>Date:</b> <span>${formattedDate}</span></dd>
                    <dd><b>Contribution:</b> <span>${assignment.contribution}</span>%</dd>
                </div>
                <div class="assessmentOverlay-AssessmentItem-ActionButtons-Container">
                    <button class="assessmentOverlay-AssessmentItem-ActionButtons deleteTemporaryAssessmentButton">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>
                </div>`;
            tempAssessmentList.appendChild(tempAssignmentElement);
            const newHorizontalRule = document.createElement("hr");
            tempAssessmentList.appendChild(newHorizontalRule);
            // Add event listener to delete button
            const deleteButton = tempAssignmentElement.querySelector('.deleteTemporaryAssessmentButton');
            deleteButton.addEventListener('click', () => {
                if (edittingModule) {
                    this.deleteAssessmentItem(assessmentType, assignments, assignment.assignmentID);
                }
                else {
                    this.deleteAssessmentItem(assessmentType, temporaryAssignments, assignment.assignmentID);
                }
                tempAssignmentElement.remove();
                newHorizontalRule.remove();
            });

        });
    }
    else if (assessmentType === "Exam") {
        if (assessmentList.length === 0) {
                return;
            }
        assessmentList.forEach(exam => {
            let formattedDate = "";
            if (exam.dueDate.trim() !== "") {
                const dateObject = new Date(exam.dueDate);
                formattedDate = dateObject.toLocaleDateString();
            }
            const tempExamElement = document.createElement("div");
            tempExamElement.classList.add("assessmentOverlay-AssessmentsList-Container");
            tempExamElement.innerHTML = `
                <div class="assessmentOverlay-AssessmentItemContainer">
                    <li>${exam.examTitle}</li>
                    <dd><b>Date:</b> <span>${formattedDate}</span></dd>
                    <dd><b>Contribution:</b> <span>${exam.contribution}</span>%</dd>
                </div>
                <div class="assessmentOverlay-AssessmentItem-ActionButtons-Container">
                    <button class="assessmentOverlay-AssessmentItem-ActionButtons deleteTemporaryAssessmentButton"> 
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>
                </div>`;
            tempAssessmentList.appendChild(tempExamElement);
            const newHorizontalRule = document.createElement("hr");
            tempAssessmentList.appendChild(newHorizontalRule);

            // Add event listener to delete button
            const deleteButton = tempExamElement.querySelector('.deleteTemporaryAssessmentButton');
            deleteButton.addEventListener('click', () => {
                if (edittingModule) {
                    this.deleteAssessmentItem(assessmentType, exams, exam.examID);
                }
                else {
                    this.deleteTemporaryAssessment(assessmentType, temporaryExams, exam.examID);
                }
                tempExamElement.remove();
                newHorizontalRule.remove();
            });

        });
    } 

} 

// Function to delete a temporary assessment
function deleteAssessmentItem(assessmentType, assessmentList, assessmentID) {
    if (assessmentType === "Assignment") {
        const assignmentIndex = assessmentList.findIndex(assignment => assignment.assignmentID === assessmentID);
        if (assignmentIndex === -1) {
            return;
        }
        assessmentList.splice(assignmentIndex, 1);
        pushAssignmentsToLocalStorage();
        if (edittingModule) {
            modules[currentModuleIndex].numAssignments--;
        }
    }
    else if (assessmentType === "Exam") {
        const examIndex = assessmentList.findIndex(exam => exam.examID === assessmentID);
        if (examIndex === -1) {
            return;
        }
        assessmentList.splice(examIndex, 1);
        pushExamsToLocalStorage();
        if (edittingModule) {
            modules[currentModuleIndex].numExams--;
        }
    }
}

function pushAssessmentIDToLocalStorage() {
    localStorage.setItem("assessmentID", assessmentID);
}

function loadAssessmentIDFromLocalStorage() {
    const storedAssessmentID = localStorage.getItem("assessmentID");
    if (storedAssessmentID) {
        assessmentID = parseInt(storedAssessmentID, 10);
    } else {
        assessmentID = 0; // Default value if not found in local storage
    }
}

function pushModulesToLocalStorage() {
    localStorage.setItem("modules", JSON.stringify(modules));
}

function loadModulesFromLocalStorage() {
    const storedModules = localStorage.getItem("modules");
    if (storedModules) {
        modules = JSON.parse(storedModules).map(module => ({
            ...module, 
            numAssignments: parseInt(module.numAssignments, 10),
            numExams: parseInt(module.numExams, 10)
        }));
    } else {
        modules = []; // Reset if not found in local storage
    }
}

function pushAssignmentsToLocalStorage() {
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function loadAssignmentsFromLocalStorage() {
    const storedAssignments = localStorage.getItem("assignments");
    if (storedAssignments) {
        assignments = JSON.parse(storedAssignments).map(assignment => ({
            ...assignment, 
            assignmentID: parseInt(assignment.assessmentID)
        }));
    } else {
        assignments = [];
    }
}

function pushExamsToLocalStorage() {
    localStorage.setItem("exams", JSON.stringify(exams));
}

function loadExamsFromLocalStorage() {
    const storedExams = localStorage.getItem("exams");
    if (storedExams) {
        exams = JSON.parse(storedExams).map(exam => ({
            ...exam, 
            examID: parseInt(exam.assessmentID)
        }));
    } else {
        exams = [];
    }
}

// Event listener to clear all data from local storage
const clearDataButton = document.getElementById("deleteDataButton");
clearDataButton.addEventListener("click", () => {
    const confirmation = confirm("Are you sure you want to clear all data? This action cannot be undone.");
    if (confirmation) {
        clearLocalStorage();
    }
});

    
// Function to clear all data from local storage
function clearLocalStorage() {
    localStorage.clear();

    // Reset all variables to their initial state
    modules = [];
    assignments = [];
    exams = [];
    taskID = 0;
    assessmentID = 0;

    location.reload(); // Reload the page
    alert("All data has been cleared from local storage."); // Inform user that data has been cleared
}

/*----------------------------- User Privacy Policy and Terms & Conditions ----------------------*/
// Check whether the user has accepted the privacy policy before
window.addEventListener('DOMContentLoaded', () => {
    console.log("Checking privacy policy acceptance status...");
    if (localStorage.getItem('privacyPolicyAccepted') !== "true") {
        console.log("Privacy policy not accepted. Showing privacy policy overlay.");
        showPrivacyPolicy();
    }
});

// Function to show privacy policy
function showPrivacyPolicy() {
    const privacyPolicyOverlay = document.getElementById("privacyPolicyOverlay-Container");
    privacyPolicyOverlay.classList.toggle("hidden");
}

// Event listener to close privacy policy overlay
/*
const closePrivacyPolicyButton = document.getElementById("privacyPolicy-closeOverlayButton");
closePrivacyPolicyButton.addEventListener("click", () => {
    const privacyPolicyOverlay = document.getElementById("privacyPolicyOverlay-Container");
    localStorage.setItem("privacyPolicyAccepted", "true");
    privacyPolicyOverlay.classList.toggle("hidden");
});
*/

// Event listener to Accept privacy policy
const acceptPrivacyPolicyButton = document.getElementById("privacyPolicy-acceptButton");
acceptPrivacyPolicyButton.addEventListener("click", () => {
    const privacyPolicyOverlay = document.getElementById("privacyPolicyOverlay-Container");
    localStorage.setItem("privacyPolicyAccepted", "true");
    privacyPolicyOverlay.classList.toggle("hidden");
});

// Event listen for Declining privacy policy
const declinePrivacyPolicyButton = document.getElementById("privacyPolicy-declineButton");
declinePrivacyPolicyButton.addEventListener("click", () => {
    localStorage.clear();
    alert("You have declined the privacy policy. Any existing data has been cleared from local storage.");
    const applicationContainer = document.getElementById("page-container");
    applicationContainer.innerHTML = "";
    applicationContainer.innerHTML = `<h2 id="privacyPolicy-declineMessage">If you change your mind, Refresh/Reload the page, or simply close and reopen the application, then "Agree" to the Terms & Conditions</h2>`;
});

// Event listener to show Data Information Overlay
const dataInfoButton = document.getElementById("dataOptions-Button");
dataInfoButton.addEventListener("click", () => {
    const dataInfoOverlay = document.getElementById("dataOptionsOverlay-Container");
    dataInfoOverlay.classList.toggle("hidden");
});

// Event listener to move from Data Information Overlay to Privacy Policy
const privacyPolicyButton = document.getElementById("dataOptions-privacyPolicyButton");
privacyPolicyButton.addEventListener("click", () => {
    const dataInfoOverlay = document.getElementById("dataOptionsOverlay-Container");
    dataInfoOverlay.classList.toggle("hidden");
    showPrivacyPolicy();
});

// Event listener to close Data Information Overlay
const closeDataInfoButton = document.getElementById("dataOptions-closeOverlayButton");
closeDataInfoButton.addEventListener("click", () => {
    const dataInfoOverlay = document.getElementById("dataOptionsOverlay-Container");
    dataInfoOverlay.classList.toggle("hidden");
});

