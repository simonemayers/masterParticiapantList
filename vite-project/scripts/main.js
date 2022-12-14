// Main JS file where all of the state and data actually 'happens'
// Imports
import { renderNewStudent } from "./controller/student-controller.js";
import {takeNewParticipantInput, getAllFilters, toggleAll } from "./view/view.js"
import { showNewParticipantPopUp, hideNewParticipantPopUp } from "./controller/new-participant-popup.js"
import { showCheckboxes } from "./view/viewCheckBoxes.js";
import { addStudentAbsense } from "./view/viewAddAbsense.js";
import { addStudentTardy } from "./view/viewAddTardy.js";
import { addStudentMentor } from "./view/viewAddMentor.js";
import { addStudentCapstone } from "./view/viewAddCapstone.js";
import { addStudentElective } from "./view/viewAddStudentElective.js";
import { addStudentNote } from "./view/viewAddNote.js";
import { addStudentMeeting } from "./view/viewAddMeeting.js";
import { addStudentProbation } from "./view/viewAddProbation.js";


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


let filters = getAllFilters()
let [probationCheckbox, electiveCheckbox, notesCheckbox, mentorCheckbox, metCheckbox, absenseOption, tardyOption, cityOption, cohortOption, electiveOption] = filters

newParticipantButton.addEventListener("click", showNewParticipantPopUp);
exitButton.addEventListener("click", hideNewParticipantPopUp);
additionalFilters.addEventListener("click", showCheckboxes)



submitButton.addEventListener("click", (e) => {
	let newStudent = takeNewParticipantInput(students)
	renderNewStudent(newStudent);
	hideNewParticipantPopUp();
	addStudentMentor(newStudent, students)
	addStudentCapstone(newStudent, students);
	addStudentElective(newStudent, students);
	addStudentTardy(newStudent, students);
	addStudentAbsense(newStudent, students);
	addStudentNote(newStudent, students);
	addStudentMeeting(newStudent, students)
	addStudentProbation(newStudent, students);

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


