// Main JS file where all of the state and data actually 'happens'


// Imports
import { renderNewStudent } from "./controller/student-controller.js";
import { showCheckboxes, toggleNumberOfAbsenses, takeNewParticipantInput, addStudentCapstoneButton, addStudentMentorButton, addStudentElectiveButton, addStudentTardyButton, addStudentAbsenseButton, addStudentNoteButton } from "./view/view.js"
import { showNewParticipantPopUp, hideNewParticipantPopUp } from "./controller/new-participant-popup.js"


// What we would consider 'state' in an application
export let students = [];
let capstoneProjects = [];
let absenses = [];
let tardies = [];
let newParticipantButton = document.querySelector("#add-new-participant");
let exitButton = document.querySelector(".exit-pop-up-button");
let submitButton = document.querySelector(".new-participant-button");
let list = document.querySelector(".participant-list tbody");
let additionalFilters = document.querySelector(".selectBox")
let absensesDropDown = document.querySelector("#absenses");
let tardiesDropDown = document.querySelector("#tardies");


newParticipantButton.addEventListener("click", showNewParticipantPopUp);
exitButton.addEventListener("click", hideNewParticipantPopUp);
additionalFilters.addEventListener("click", showCheckboxes)

submitButton.addEventListener("click", (e) => {
	let newStudent = takeNewParticipantInput(students)
	renderNewStudent(newStudent);
	hideNewParticipantPopUp();
	addStudentMentorButton(newStudent, students)
	addStudentCapstoneButton(newStudent, students);

	addStudentElectiveButton();
	addStudentTardyButton();
	addStudentAbsenseButton();
	addStudentNoteButton();
});


absensesDropDown.addEventListener("change", (e) => toggleNumberOfAbsenses);
tardiesDropDown.addEventListener("change", (e) => toggleNumberOfTardies);
console.log("working")
