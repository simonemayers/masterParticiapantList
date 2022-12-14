// Main JS file where all of the state and data actually 'happens'
// Imports
import { renderNewStudent } from "./controller/student-controller.js";
import { showCheckboxes, takeNewParticipantInput, addStudentCapstoneButton, addStudentMentorButton, addStudentElectiveButton, addStudentTardyButton, addStudentAbsenseButton, addStudentNoteButton, addStudentProbationButton, addStudentMeetingButton, getCurrentFilterSelections, toggleAll } from "./view/view.js"
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


let filters = getCurrentFilterSelections()
let [probationCheckbox, electiveCheckbox, notesCheckbox, mentorCheckbox, metCheckbox, absenseOption, tardyOption, cityOption, cohortOption, electiveOption] = filters

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

absenseOption.addEventListener("change", () => {toggleAll(students)});
tardyOption.addEventListener("change", () => {toggleAll(students)});
cityOption.addEventListener("change", () => {toggleAll(students)});
cohortOption.addEventListener("change", () => {toggleAll(students)});
electiveOption.addEventListener("change", () => {toggleAll(students)});
probationCheckbox.parentElement.addEventListener("change", () => {toggleAll(students)})
electiveCheckbox.parentElement.addEventListener("change", () => {toggleAll(students)})
notesCheckbox.parentElement.addEventListener("change", () => {toggleAll(students)})
mentorCheckbox.parentElement.addEventListener("change", () => {toggleAll(students)})
metCheckbox.parentElement.addEventListener("change", () => {toggleAll(students)})
additionalFilters.addEventListener("click", () => {toggleAll(students)})


