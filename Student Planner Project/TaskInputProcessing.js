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



/*------------------------------------Task Management------------------------------------*/

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
            <button class="deleteButton" style="display: inline-flex">
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
        const deleteButton = newtaskTitle.querySelector('.deleteButton');
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

// Static IDs for modules and assessments
const modulesPage = document.getElementById('modulesPage');


// Test data
const assignment1 = new Assignment();
assignment1.assignmentTitle = "Microbiology Report";
assignment1.moduleCode = "COMP8000";
assignment1.dueDate = "27/09/2020";
assignment1.contribution = 30;
assignments.push(assignment1);

const assignment3 = new Assignment();
assignment3.assignmentTitle = "Physics Assignment";
assignment3.moduleCode = "COMP1004";
assignment3.dueDate = "27/09/2020";
assignment3.contribution = 40;
assignments.push(assignment3);

const assignment2 = new Assignment();
assignment2.assignmentTitle = "Math Report";
assignment2.moduleCode = "COMP5000";
assignment2.dueDate = "27/09/2020";
assignment2.contribution = 40;
assignments.push(assignment2);
console.log(assignments);

const assignment4 = new Assignment();
assignment4.assignmentTitle = "Math Report";
assignment4.moduleCode = "COMP1004";
assignment4.dueDate = "27/09/2020";
assignment4.contribution = 40;
assignments.push(assignment4);
console.log(assignments);

const moduleAssignments = assignments.filter(assignment => assignment.moduleCode === "COMP8000");
console.log(moduleAssignments);
moduleAssignments.forEach(assignment => {
    console.log(`${assignment.assignmentTitle} - ${assignment.dueDate}`);
});


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
                                <input type="text" id="moduleCode_Input" class="overlay_Input" name="moduleCode" placeholder="Enter Module Code">
                                <label for="moduleName_Input">Module Name:</label>
                                <input type="text" id="moduleName_Input" class="overlay_Input" name="moduleName" placeholder="Enter Module Name">
                                <label for="moduleLectureDays_Input">Lecture Days:</label>
                                <input type="text" id="moduleLectureDays_Input" class="overlay_Input" name="moduleLectureDays" placeholder="Enter Days on which Lectures are held">
                            </div>
                        </form>
                    
                        <div style="display: flex; gap: 10px;">
                            <!--Buttons for submitting or cancelling the form-->
                            <button type="submit" id="moduleOverlay-saveModuleButton" class="overlayActionButtons overlay-saveButton" onclick="saveModule()">Save</button> <!--Remember to add the function to save/submit the module-->
                            <button type="button" id="moduleOverlay-cancelSaveModuleButton" class="overlayActionButtons overlay-cancelButton" onclick="closeModuleAddOverlay()">Cancel</button>
                            
                            <!--Button to add more lecturer information-->
                            <button type="button" id="moduleOverlay-addLecturerDetailsButton" class="overlayActionButtons" onclick="openLecturerDetailsInputForm()">Add Lecturer Information</button>

                            <!--Buttons for adding assignments and exams to the module-->
                            <button type="button" id="moduleOverlay-addAssignmentButton" class="overlayActionButtons" onclick="openAssessmentInputForm('Assignment')">Add Assignments</button>
                            <button type="button" id="moduleOverlay-addExamButton" class="overlayActionButtons" onclick="openAssessmentInputForm('Exam')">Add Exams</button>
                        </div>

                        <p>Any assessments that you add will be listed below:</p>
                        <div id="moduleOverlay-assessmentListContainer">
                        </div>
                    </div>`;
    modulesPage.insertAdjacentElement('beforeend', addModuleOverlay);
}

function closeModuleAddOverlay() {
    unsavedAssignmentDataPresent = false;
    unsavedExamDataPresent = false;
    unsavedLecturerDataPresent = false;
    document.getElementById("moduleAddOverlay").remove();
    
    // Clear temporary details
    if (temporaryAssignments.length > 0) {
        temporaryAssignments = [];
        console.log(temporaryAssignments);
    }
    if (temporaryExams.length > 0) {
        temporaryExams = [];
        console.log(temporaryExams);
    }
    if (temporaryLecturer.name !== "") {
        console.log("Lecturer details were present. Clearing lecturer details");
        temporaryLecturer = new Lecturer("", "", "");
    }
    else {console.log("Lecturer details were not present");}

}

// Function to open the lecturer details overlay
let unsavedLecturerDataPresent = false;
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
                                <input type="text" id="moduleLecturerName_Input" class="overlay_Input" name="moduleLecturerName_Input" placeholder="e.g. Dr. John Doe">
                                <label for="moduleLecturerEmail_Input">Lecturer Email:</label>
                                <input type="text" id="moduleLecturerEmail_Input" class="overlay_Input" name="moduleLecturerEmail_Input" placeholder="e.g. name@example.com">
                                <label for="moduleLecturerOffice_Input">Lecturer Office:</label>
                                <input type="text" id="moduleLecturerOffice_Input" class="overlay_Input" name="moduleLecturerOffice_Input" placeholder="e.g. Room 100, Mary Newman Building">
                            </div>
                            <div style="display: flex; gap: 10px;">
                                <button type="submit" id="moduleLecturerDetails-saveButton" class="overlayActionButtons overlay-saveButton">Save</button>
                                <button type="button" id="moduleLecturerDetails-cancelButton" class="overlayActionButtons overlay-cancelButton" onclick="closeLecturerDetailsOverlay()">Cancel</button>
                            </div>
                        </form>
                    </div>`;
    document.getElementById("moduleAddOverlay").insertAdjacentElement('afterend', lecturerDetailsOverlay);

    //If the user has already entered lecturer details, display them in the input fields
    if (unsavedLecturerDataPresent) {
        document.getElementById("moduleLecturerName_Input").value = temporaryLecturer.name;
        document.getElementById("moduleLecturerEmail_Input").value = temporaryLecturer.email;
        document.getElementById("moduleLecturerOffice_Input").value = temporaryLecturer.office;
    }

    // Add event listener to the save button
    const lecturerDetailsForm = document.getElementById("moduleLecturerDetailsForm");
    lecturerDetailsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Button clicked, event prevented");
        unsavedLecturerDataPresent = true;
        saveTemporaryLecturerDetailsButton();
        closeLecturerDetailsOverlay();
    });
}

function closeLecturerDetailsOverlay() {
    document.getElementById("moduleLecturerDetailsOverlay").remove();
}

// Function to transfer lecturer details to the module input form
function saveTemporaryLecturerDetailsButton() {
    temporaryLecturer.name = document.getElementById("moduleLecturerName_Input").value.trim();
    if (temporaryLecturer.name === '') {
        alert("Lecturer name cannot be empty.");
        return;
    }
    temporaryLecturer.email = document.getElementById("moduleLecturerEmail_Input").value;
    temporaryLecturer.office = document.getElementById("moduleLecturerOffice_Input").value;
    console.log(temporaryLecturer);
}

// Function to open the assessment overlay
let unsavedAssignmentDataPresent = false;
let unsavedExamDataPresent = false;
function openAssessmentInputForm(assessmentType) {
    const assessmentOverlay = document.createElement('div');
    assessmentOverlay.id = "assessmentOverlay";
    assessmentOverlay.classList.add("overlay");
    assessmentOverlay.innerHTML = `
                    <div class="overlay_Content">
                        <h2 id="assessmentOverlayHeader">Add ${assessmentType} (Module Code)</h2>
                        <form id="assessmentInputForm" >
                            <div class="assessmentDetailsInput-Container">                                
                                <label for="assessmentName_Input">${assessmentType} Title:</label>
                                <input type="text" id="assessmentName_Input" class="overlay_Input" name="assessmentName_Input" placeholder="Enter ${assessmentType} Title">
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
                            <button type="button" id="assessmentOverlay-cancelAssessmentsButton" class="overlayActionButtons overlay-cancelButton" onclick="closeAssessmentInputForm()">Cancel</button>
                        </form>
                        
                        <p>Any ${assessmentType}s You Add Will Appear Below:</p>
                        <u><b>${assessmentType}s:</b></u>
                        <ul id="assessmentOverlay-addedAssessmentsList"></ul>
                    </div>`;
    modulesPage.insertAdjacentElement('beforeend', assessmentOverlay);

    // Add event listener to the add button
    const addAssessmentForm = document.getElementById("assessmentInputForm");
    addAssessmentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log(assessmentType);
        console.log("Button clicked, event prevented");
        createTempAssessments(assessmentType);
    });

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

    if (unsavedAssignmentDataPresent == true) {
    displayTempAssessmentList(assessmentType);
    }
    else if (unsavedExamDataPresent == true) {
    displayTempAssessmentList(assessmentType);
    }
    else {
        console.log("No unsaved data present");
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
    console.log(module);
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
                            <button class="overlayActionButtons plainButtons" onclick="editModuleInformation()">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                            </button>
                            <button class="overlayActionButtons plainButtons" onclick="closeModuleInformationOverlay()">
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
                            <ul id="moduleInformationOverlay-assignmentsList">
                                <div id="moduleInformationOverlay-assignmentsList-Container" class="moduleInformationOverlay-divContainers">
                                </div>
                            </ul>
                            <br>
                            <h3>Exams:</h3>
                            <ul id="moduleInformationOverlay-examsList" ></ul>
                        </div>
                        <br>
                        <div id="moduleInformationOverlay-deleteButton-Container" >
                            <button class="overlayActionButtons overlay-cancelButton" onclick=deleteModule()>Delete Module</button>
                        </div>
                    </div>`;

    modulesPage.appendChild(moduleInformationOverlay);

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
            const assignmentContainer = document.createElement("div");
            assignmentContainer.classList.add("moduleInformationOverlay-divContainers");
            assignmentsList.appendChild(assignmentContainer);
            const assignmentItemContainer = document.createElement("div");
            assignmentItemContainer.classList.add("moduleInformationOverlay-assessmentItem")
            assignmentItemContainer.innerHTML = `
                <li> ${assignment.assignmentTitle}</li>
                <dd><b>Due date:</b> ${assignment.dueDate}</dd>`;
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
            const examContainer = document.createElement("div");
            examContainer.classList.add("moduleInformationOverlay-divContainers");
            examsList.appendChild(examContainer);
            const examItemContainer = document.createElement("div");
            examItemContainer.classList.add("moduleInformationOverlay-assessmentItem")
            examItemContainer.innerHTML = `
                <li> ${exam.examTitle}</li>
                <dd><b>Due date:</b> ${exam.dueDate}</dd>`;
            examContainer.appendChild(examItemContainer);
            const examContribution = document.createElement("dd");
            examContribution.innerHTML = `Contribution: ${exam.contribution}%`;
            examContainer.appendChild(examContribution);
            examContainer.appendChild(document.createElement("hr"));
        });
    }
}

function closeModuleInformationOverlay() {
    document.getElementById("moduleInformationOverlay").remove();
}

/* ------------End of Navigating around the module page---------- */


/* ------------Processing User Input for Mdules------------------ */
// Function to save the module input to the modules array
let assessmentID = 1; // Static IDs for assessments
function saveModule() {
    const moduleCode = document.getElementById("moduleCode_Input").value.trim();
    const moduleName = document.getElementById("moduleName_Input").value.trim();
    if (moduleCode === "" && moduleName === "") {
        alert("Please fill in at least one of the following:\nModule Code or Module Name");
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
    console.log(assignments);
    if (temporaryExams.length > 0) {
        temporaryExams.forEach(exam => {
            exam.moduleCode = moduleCode;
            exam.examID = assessmentID;
            assessmentID++;
            exams.push(exam);
            newModule.numExams++;
        });
    }
    console.log(exams);

    modules.push(newModule);
    console.log(modules);
    displayModuleCards();
    closeModuleAddOverlay();
}


// Function to display modules on the page
function displayModuleCards() {
    const moduleList = document.getElementById("moduleList");
    moduleList.innerHTML = "";
    for (let i = 0; i < modules.length; i++) {
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






/*--- THIS ONLY APPLIES WHEN ADDING ASSESSMENTS DIRECTLY FROM THE MODULES PAGE!!!---*/
// Function to temporarily save an assignment to the module form


// Function to add temporary assessments to assessment form for a module
let tempAssessmentID = 1;
function createTempAssessments(assessmentType) {
    const assessmentForm = document.getElementById("assessmentInputForm");

    // Determine if the assessment is an exam or assignment    
    const assessmentName = document.getElementById("assessmentName_Input").value;
    console.log(assessmentName);
    if (assessmentName.trim() === '') {
        console.log(assessmentName.trim());
        alert("You must enter the title or name of the assessment.");
        return;
    }

    const dueDate = document.getElementById("assessmentDueDate_Input").value;
    const contribution = document.getElementById("assessmentContribution_Input").value;
    if (assessmentType === "Assignment") {
        const assignment = new Assignment(assessmentName, '0', dueDate, contribution);
        assignment.assignmentID = tempAssessmentID;
        tempAssessmentID++;
        temporaryAssignments.push(assignment);
        console.log(assignment);
        console.log(temporaryAssignments);
    }
    else if (assessmentType === "Exam") {
        const exam = new Exam(assessmentName, '0', dueDate, contribution);
        exam.examID = tempAssessmentID;
        tempAssessmentID++;
        temporaryExams.push(exam);
        console.log(exam);
        console.log(temporaryExams);
    }
    else {console.log("Invalid assessment type");}
    displayTempAssessmentList(assessmentType);
    
    // Clear the input fields
    assessmentForm.reset();
}


// Function to format the temporary assignments list and display them on the assignment form
function displayTempAssessmentList(assessmentType) {

    const tempAssessmentList = document.getElementById("assessmentOverlay-addedAssessmentsList");
    tempAssessmentList.innerHTML = "";        
    
    if (assessmentType === "Assignment") {
        temporaryAssignments.forEach(assignment => {
            //Format the date DD/MM/YYYY
            const dateObject = new Date(assignment.dueDate);
            //const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
            const formattedDate = dateObject.toLocaleDateString();
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
                this.deleteTemporaryAssessment(assessmentType ,assignment.assignmentID);
                tempAssignmentElement.remove();
                newHorizontalRule.remove();
            });

        });
    }
    else if (assessmentType === "Exam") {
        temporaryExams.forEach(exam => {
            //Format the date DD/MM/YYYY
            const dateObject = new Date(exam.dueDate);
            //const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
            const formattedDate = dateObject.toLocaleDateString();
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
                this.deleteTemporaryAssessment(assessmentType, exam.examID);
                tempExamElement.remove();
                newHorizontalRule.remove();
            });

        });
    }
    else {console.log("Invalid assessment type");}    

} 

// Function to delete a temporary assessment
function deleteTemporaryAssessment(assessmentType, assessmentID) {
    if (assessmentType === "Assignment") {
        const assignmentIndex = temporaryAssignments.findIndex(assignment => assignment.assignmentID === assessmentID);
        if (assignmentIndex === -1) {
            return;
        }
        temporaryAssignments.splice(assignmentIndex, 1);
        console.log(temporaryAssignments);
    }
    else if (assessmentType === "Exam") {
        const examIndex = temporaryExams.findIndex(exam => exam.examID === assessmentID);
        if (examIndex === -1) {
            return;
        }
        temporaryExams.splice(examIndex, 1);
        console.log(temporaryExams);
    }
    else {console.log("Invalid assessment type");}
}






// Function to add an exam to a module





// Temporary Assessment Items Editor
function editTemporaryAssessmentDetails(assessmentItem) {
    if (assessmentItem.classList.contains("editing")) return; // Prevent multiple edits
    assessmentItem.classList.add("editing");

    const currentAssessmentName = assessmentItem.innerText;
    const currentDueDateElement = assessmentItem.nextElementSibling.querySelector("span");
    const currentDueDate = currentDueDateElement.innerText;

    // Create input fields
    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = currentAssessmentName;

    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = currentDueDate;

    // Create buttons to accept or cancel changes
    const buttonContainer = document.createElement("div");
    let saveButton = document.createElement("button");
    let cancelButton = document.createElement("button");
    saveButton.classList.add("detailsEditButton");
    saveButton.type = "submit";
    cancelButton.classList.add("detailsEditButton");
    cancelButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="18px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
    saveButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="18px" fill="#000000"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
    cancelButton.onclick = function() {
        saveAssessmentDetailsChanges(assessmentItem, currentAssessmentName, currentDueDate);
    }
    
    saveButton.onclick = function () {
        saveAssessmentDetailsChanges(assessmentItem, nameInput.value, dateInput.value);
    };
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);

    // Or click enter to save
    nameInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            saveAssessmentDetailsChanges(assessmentItem, nameInput.value, dateInput.value);
        }
    });
    dateInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            saveAssessmentDetailsChanges(assessmentItem, nameInput.value, dateInput.value);
        }
    });

    // Clear and add inputs
    assessmentItem.innerHTML = "";
    assessmentItem.nextElementSibling.innerHTML = "";
    const editContainer = document.createElement("div");
    editContainer.classList.add("edit-container");
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("edit-input-continaer");
    inputContainer.appendChild(nameInput);
    inputContainer.appendChild(dateInput);
    editContainer.appendChild(inputContainer);
    editContainer.appendChild(buttonContainer);
    assessmentItem.appendChild(editContainer);
}

function saveAssessmentDetailsChanges(assessmentItem, newAssessmentName, newDueDate) {
    assessmentItem.parentElement.innerHTML = `
        <li onclick="editTemporaryAssessmentDetails(this)">${newAssessmentName}</li>
        <dd><b>Due date:</b> <span>${newDueDate}</span></dd>
        `;
    assessmentItem.classList.remove("editing");
}



/*-------------Overlay Functionality---------------*/ 

/*function displayOverlay(overlay) {
    document.querySelectorAll('.overlay').forEach(o => {
        o.classList.add('hidden');
    });
    overlay.classList.remove('hidden');
}
*/

// Control the display of the overlays
/*function displayOverlay(overlayID) {
    document.querySelectorAll('.overlay').forEach(overlay => {
        overlay.classList.toggle('hidden', overlay.id !== overlayID);
    });
}
function addModule() {
    createAddModuleOverlay();
    displayOverlay('moduleAddOverlay');
}

function createAddModuleOverlay() {
    const modulesPage = document.getElementById('modulesPage');
    const addModuleOverlay = document.createElement('div');
    addModuleOverlay.id = "moduleAddOverlay";
    addModuleOverlay.classList.add("overlay", "hidden");
    addModuleOverlay.innerHTML =`
                <div class="overlay_Content">
                        <h2 id="moduleOverlayHeader">Add Module</h2>
                        <form id="moduleInputForm">
                            <div class="moduleDetails_Input-Container">
                                <label for="moduleCode_Input">Module Code:</label>
                                <input type="text" id="moduleCode_Input" class="overlay_Input" name="moduleCode" placeholder="Enter Module Code">
                                <label for="moduleName_Input">Module Name:</label>
                                <input type="text" id="moduleName_Input" class="overlay_Input" name="moduleName" placeholder="Enter Module Name">
                                <label for="moduleLecturer_Input">Lecturer / Module Leader:</label>
                                <input type="text" id="moduleLecturer_Input" class="overlay_Input" name="moduleLecturer" placeholder="Enter Lecturer's Name">
                                <label for="moduleLectureDays_Input">Lecture Days:</label>
                                <input type="text" id="moduleLectureDays_Input" class="overlay_Input" name="moduleLectureDays" placeholder="Enter Days on which Lectures are held">
                            </div>

                            <div style="display: flex; gap: 10px;">
                                <!--Buttons for submitting or cancelling the form-->
                                <button type="submit" id="moduleOverlay-saveModuleButton" class="overlayActionButtons overlay-saveButton">Save</button> <!--Remember to add the function to save/submit the module-->
                                <button type="button" id="moduleOverlay-cancelSaveModuleButton" class="overlayActionButtons overlay-cancelButton" onclick="closeOverlay('moduleAddOverlay')">Cancel</button>
                                
                                <!--Button to add more lecturer information-->
                                <button type="button" id="moduleOverlay-addLecturerDetailsButton" class="overlayActionButtons" onclick="openLecturerDetailsInputForm()" >Addtional Lecturer Details</button>

                                <!--Buttons for adding assignments and exams to the module-->
                                <button type="button" id="moduleOverlay-addAssignmentButton" class="overlayActionButtons" onclick="openAssignmentInputForm()">Add Assignments</button>
                                <button type="button" id="moduleOverlay-addExamButton" class="overlayActionButtons" onclick="openExamInputForm()">Add Exams</button>
                            </div>

                            <p>Any assessments that you add will be listed below:</p>
                            <div id="moduleOverlay-assessmentListContainer">
                                <ul id="moduleOverlay-addedAssignmentsList" class="moduleOverlay-addedAssessmentsLists">
                                    <u><b>Assignments:</b></u>
                                    <li>Microbiology Report</li>
                                    <dd>Due date: 27/09/2020</dd>
                                    <dd>Contribution: 30%</dd>
                                    <br>
                                    <li>Maths Assignment</li>
                                    <dd>Due date: 27/09/2020</dd>
                                    <dd>Contribution: 30%</dd>
                                    <br>
                                    <li>Physics Assignment</li>
                                    <dd>Due date: 27/09/2020</dd>
                                    <dd>Contribution: 40%</dd>
                                </ul>
                                <ul id="moduleOverlay-addedExamsList" class="moduleOverlay-addedAssessmentsLists">
                                    <u><b>Exams:</b></u>
                                    <li>Microbiology Exam</li>
                                    <dd>Due Date: 22/08/2025</dd>
                                    <dd>Contribution: 30%</dd>
                                    <br>
                                    <li>Maths Exam</li>
                                    <dd>Due Date: 22/08/2025</dd>
                                    <dd>Contribution: 30%</dd>
                                    <br>
                                    <li>Physics Exam</li>
                                    <dd>Due Date: 22/08/2025</dd>
                                    <dd>Contribution: 40%</dd>
                                    <br>
                                </ul>
                            </div>

                        </form>
                    </div>`;
    modulesPage.insertAdjacentElement('afterend', addModuleOverlay);
}

// Overlay for Lecturer Details/Information
function openLecturerDetailsInputForm() {
    const lecturerDetailsOverlay = document.createElement('div');
    lecturerDetailsOverlay.id = "moduleLecturerDetailsOverlay";
    lecturerDetailsOverlay.classList.add("overlay");
    lecturerDetailsOverlay.innerHTML = `
                    <div id="moduleLecturerDetailsOverlay_Content" class="overlay_Content">
                        <h3>Addtional Lecturer Details</h3>
                        <form id="moduleLecturerDetailsForm">
                            <div class="moduleDetails_Input-Container">
                                <label for="moduleLecturerEmail_Input">Lecturer Email:</label>
                                <input type="email" id="moduleLecturerEmail_Input" class="overlay_Input" name="moduleLecturerEmail" placeholder="e.g. name@example.com">
                                <label for="moduleLecturerOffice_Input">Lecturer Office:</label>
                                <input type="text" id="moduleLecturerOffice_Input" class="overlay_Input" name="moduleLecturerOffice" placeholder="e.g. Room 100, Mary Newman Building">
                                <label for="moduleLecturerOfficeHours_Input">Lecturer Office Hours:</label>
                                <input type="text" id="moduleLecturerOfficeHours_Input" class="overlay_Input" name="moduleLecturerOfficeHours" placeholder="e.g. Mondays, 14:00 - 16:00">
                            </div>
                            <div style="display: flex; gap: 10px;">
                                <button type="submit" id="moduleLecturerDetails-saveButton" class="overlayActionButtons overlay-saveButton">Save</button>
                                <button type="button" id="moduleLecturerDetails-cancelButton" class="overlayActionButtons overlay-cancelButton" onclick="closeOverlay('moduleLecturerDetailsOverlay')">Cancel</button>
                            </div>
                        </form>
                    </div>`;
    document.getElementById("moduleAddOverlay").insertAdjacentElement('afterend', lecturerDetailsOverlay);
    //displayOverlay('moduleLecturerDetailsOverlay');
}

// Expand the module 
function expandModule(moduleID) {
    let moduleCard = document.getElementById(moduleID);
    const moduleInformationOverlay = document.createElement('div');
    moduleInformationOverlay.id = "moduleInformationOverlay";
    moduleInformationOverlay.classList.add("overlay", "hidden");
    moduleInformationOverlay.innerHTML = `
                    <div id="moduleInformationOverlay_Content" class="overlay_Content">
                        <div id="moduleInformationOverlay_Content-Header-Container" class="moduleInformationOverlay-divContainers">
                            <h2 id="moduleInformationOverlay-Header">${moduleID} - Software Engineering 1</h2>
                            <button class="overlayActionButtons plainButtons" onclick="editModuleInformation()">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                            </button>
                            <button class="overlayActionButtons plainButtons" onclick="closeModuleInformationOverlay()">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                            </button>
                        </div>
                        <hr>
                        <div class="moduleInformationOverlay-Container">
                            <div id="moduleInformationOverlay-lectureInformation-Container" class="moduleInformationOverlay-divContainers">
                                <div id="moduleInformationOverlay-lecturerInformation-Container">
                                    <h3>Lecturer Information:</h3>
                                    <div id="moduleInformationOverlay-lecturerInformation">
                                        <p><b>Name:</b> Dr. Jacqueline Who</p>
                                        <p><b>Email:</b> <a href="mailto:jacquelinewho@example.com">jacquelinewho@example.com</a></p>
                                        <p><b>Office:</b> Room 100, Mary Newman Building</p>
                                        <p><b>Office Hours:</b> Mondays 14:00 - 16:00</p>
                                    </div>
                                </div>
                                <div id="moduleInformationOverlay-lectureDays-Container">
                                    <h3>Lecture Days:</h3>
                                    <ul id="moduleInformationOverlay-lectureDaysList">
                                        <li><b>Mondays</b>, 10:00 - 12:00</li>
                                        <li><b>Thursdays</b>, 14:00 - 16:00</li>
                                    </ul>
                                </div>
                            </div>
                            <br>
                            <h3>Assignments:</h3>
                            <ul style="">
                                <div class="moduleInformationOverlay-divContainers">
                                    <div class="moduleInformationOverlay-assessmentItem">
                                        <li>Microbiology Report</li>
                                        <dd>Due date: 27/09/2020</dd>
                                    </div>
                                    <dd>Contribution: 30%</dd>
                                </div>
                                <hr>
                            </ul>
                            <br>
                            <h3>Exams:</h3>
                            <ul>
                                <div class="moduleInformationOverlay-divContainers">
                                    <div class="moduleInformationOverlay-assessmentItem">
                                        <li>Microbiology Exam</li>
                                        <dd>Due date: 27/09/2020</dd>
                                    </div>
                                    <dd>Contribution: 70%</dd>
                                </div>
                                <hr>
                            </ul>
                        </div>
                        <br>
                        <div id="moduleInformationOverlay-deleteButton-Container" >
                            <button class="overlayActionButtons overlay-cancelButton" onclick=deleteModule()>Delete Module</button>
                        </div>
                    </div>`;

    moduleCard.insertAdjacentElement('afterend', moduleInformationOverlay);
    displayOverlay('moduleInformationOverlay');
}

// Close the module information overlay
function closeModuleInformationOverlay() {
    document.getElementById("moduleInformationOverlay").remove();
}

function closeOverlay(overlayID) {
    document.getElementById(overlayID).classList.add('hidden');
    document.getElementById(overlayID).remove();
}
*/

/*------------------------------------End of Module Management------------------------------------*/


/*------------------------------------Assessment Management------------------------------------*/

