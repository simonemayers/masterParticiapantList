// Main JS file where all of the state and data actually 'happens'
// Imports
import { renderNewStudent } from "./controller/student-controller.js";
import { showCheckboxes, toggleNumberOfAbsenses, toggleNumberOfTardies, toggleCities, toggleCohorts, takeNewParticipantInput, addStudentCapstoneButton, addStudentMentorButton, addStudentElectiveButton, addStudentTardyButton, addStudentAbsenseButton, addStudentNoteButton, addStudentProbationButton, addStudentMeetingButton, toggleAll } from "./view/view.js"
import { showNewParticipantPopUp, hideNewParticipantPopUp } from "./controller/new-participant-popup.js"




// What we would consider 'state' in an application
export let students = [];
export let capstoneProjects = [];
export let absenses = [];
export let tardies = [];
let newParticipantButton = document.querySelector("#add-new-participant");
let exitButton = document.querySelector(".exit-pop-up-button");
let submitButton = document.querySelector(".new-participant-button");
let list = document.querySelector(".participant-list tbody");
let additionalFilters = document.querySelector(".selectBox")
let absensesDropDown = document.querySelector("#absenses");
let tardiesDropDown = document.querySelector("#tardies");
let citiesDropDown = document.querySelector("#cities");
let cohortsDropDown = document.querySelector("#cohorts");
let electivesDropDown = document.querySelector("#electives")



let probationCheckbox = document.querySelector("#probation").parentElement;
let electiveCheckbox = document.querySelector("#elective").parentElement;
let notesCheckbox = document.querySelector("#notes").parentElement;
let mentorCheckbox = document.querySelector("#mentor").parentElement;
let meetingCheckbox = document.querySelector("#met").parentElement;




newParticipantButton.addEventListener("click", showNewParticipantPopUp);
exitButton.addEventListener("click", hideNewParticipantPopUp);
additionalFilters.addEventListener("click", showCheckboxes)



submitButton.addEventListener("click", (e) => {
	let newStudent = takeNewParticipantInput(students)
	renderNewStudent(newStudent);
	hideNewParticipantPopUp();
	addStudentMentorButton(newStudent, students)
	addStudentCapstoneButton(newStudent, students);
	addStudentElectiveButton(newStudent, students);
	addStudentTardyButton(newStudent, students);
	addStudentAbsenseButton(newStudent, students);
	addStudentNoteButton(newStudent, students);
	addStudentMeetingButton(newStudent, students)
	addStudentProbationButton(newStudent, students);

	toggleAll(students)
});

absensesDropDown.addEventListener("change", () => {toggleAll(students)});
tardiesDropDown.addEventListener("change", () => {toggleAll(students)});
citiesDropDown.addEventListener("change", () => {toggleAll(students)});
cohortsDropDown.addEventListener("change", () => {toggleAll(students)});
electivesDropDown.addEventListener("change", () => {toggleAll(students)});
probationCheckbox.addEventListener("change", () => {toggleAll(students)})
electiveCheckbox.addEventListener("change", () => {toggleAll(students)})
notesCheckbox.addEventListener("change", () => {toggleAll(students)})
mentorCheckbox.addEventListener("change", () => {toggleAll(students)})
meetingCheckbox.addEventListener("change", () => {toggleAll(students)})
document.querySelector(".selectBox").addEventListener("click", () => {toggleAll(students)})


