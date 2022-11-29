// Main JS file where all of the state and data actually 'happens'


// Imports
import { addStudentRow, addStudentId, addStudentName,  } from "./controller/student.js";

// What we would consider 'state' in an application
let students = [];
let capstoneProjects = [];
let absenses = [];
let tardies = [];


let list = document.querySelector(".participant-list tbody");



function createNewStudent() {
	let student = students[students.length - 1];
	let newRow = addStudentRow();
	newRow.classList.add("student-row");
	let idTd = addStudentId(student);
	let nameTd = addStudentName(student);
	let absensesTd = addStudentAbsenses(student);
	let tardiesTd = addStudentTardies(student);
	let notesTd = addStudentNotes(student);
	let actionTd = addStudentActions(student);
	let mentorButton = addStudentMentorButton(student);
	newRow.id = `student${idTd.textContent}`;
	newRow.appendChild(idTd);
	newRow.appendChild(nameTd);
	newRow.appendChild(absensesTd);
	newRow.appendChild(tardiesTd);
	newRow.appendChild(notesTd);
	newRow.appendChild(actionTd);
	actionTd.appendChild(mentorButton);
}