// Imports of the classes and functions
import { renderAddMentorPopUp, deleteAddMentorPopUp } from "../controller/add-mentor-popup.js";

import { renderAddCapstonePopUp, deleteAddCapstonePopUp } from "../controller/add-capstone-popup.js";

import { showAddAbsensePopUp, hideAddAbsensePopUp } from "../controller/add-absense-popup.js";


import { showAddElectivePopUp, hideAddElectivePopUp } from "../controller/add-elective-popup.js";


import { showAddNotePopUp, hideAddNotePopUp } from "../controller/add-note-popup.js";

import { showAddTardyPopUp, hideAddTardyPopUp } from "../controller/add-tardy-popup.js";

import { showNewParticipantPopUp, hideNewParticipantPopUp } from "../controller/new-participant-popup.js";

import { renderNewStudent } from "../controller/student-controller.js"
import { Student } from "../model/Student.js"

import { renderStudentMentorButton } from "../controller/add-student-action-buttons.js";
import { c } from "docker/src/languages.js";




function findCurrentStudent(e, students){
	return students[parseInt(e.target.closest("tr").children[0].textContent)]
}

function handleMentorButtonClick(currentStudent){
	let mentorName = currentStudent.getMentor();
	renderAddMentorPopUp()

	if (mentorName) {
		document.querySelector("#new-mentor-name").value = mentorName;
		document.querySelector("#new-mentor-name").placeholder = "";
	} else {
		document.querySelector("#new-mentor-name").placeholder = "Not assigned";
	}
};

export function addStudentMentorButton(student, students) {
	let mentorButton = document.querySelector(`.mentor-btn-${student.id}`)
	mentorButton.addEventListener("click", (e) => {
		let currentStudent = findCurrentStudent(e, students)
		handleMentorButtonClick(currentStudent)

		let mentorPopUp = document.querySelector(".add-mentor-pop-up");
		let exitButton = mentorPopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", deleteAddMentorPopUp);

		let submitButton = document.querySelector(".add-mentor-button");
		submitButton.addEventListener("click", () => {
			currentStudent.addMentor(document.querySelector("#new-mentor-name").value);
			deleteAddMentorPopUp();
		}, { once: true })
	})
	return mentorButton;
}


var show = true;
export function showCheckboxes() {
	var checkboxes = document.getElementById("checkBoxes");

	if (show) {
		checkboxes.style.display = "flex";
		show = false;
	} else {
		checkboxes.style.display = "none";
		show = true;
	}
}

function isUserNameUnique(user, students) {
	let userNames = [];
	let answer;
	if (students.length != 0) {
		students.forEach((student) => {
			if (userNames.includes(user)) {
				answer = false;
			} else {
				answer = true;
			}
			userNames.push(student.userName);
		});
	}
	return answer;
}

// export let newParticipantButton = document.querySelector("#add-new-participant");
// export let exitButton = document.querySelector(".exit-pop-up-button");
// export let submitButton = document.querySelector(".new-participant-button");
let userNameN = 1;

// newParticipantButton.addEventListener("click", showNewParticipantPopUp);
// exitButton.addEventListener("click", hideNewParticipantPopUp);


// function findCurrentStudent(e, students){
// 	return students[parseInt(e.target.closest("tr").children[0].textContent)]
// }

function handleCapstoneButtonClick(currentStudent){
	console.log(currentStudent.getCapstone())
	// let capstoneTitle = currentStudent.getCapstone().getTitle()
	// let isGroup = currentStudent.getCapstone().getIsGroup()
	renderAddCapstonePopUp()

	if (currentStudent.getCapstone()) {
		document.querySelector("#new-capstone-name").value = currentStudent.getCapstone().getTitle();
		document.querySelector("#new-capstone-name").placeholder = "";
		document.querySelector("#new-structure").value = currentStudent.getCapstone().getIsGroup()
	} else {
		document.querySelector("#new-capstone-name").placeholder = "Not assigned";
		document.querySelector("#new-structure").value = "Not Assigned"
	}
};

export function addStudentCapstoneButton(student, students) {
	let capstoneButton = document.querySelector(`.capstone-btn-${student.id}`);
	capstoneButton.addEventListener("click", (e) => {
		let currentStudent = findCurrentStudent(e, students)
		handleCapstoneButtonClick(currentStudent)

		let submitButton = document.querySelector(".add-capstone-button");
		submitButton.addEventListener("click", (e) => {
			console.log("submitted")
		});
	});
}



export function addStudentElectiveButton() {
	let electiveButtons = document.querySelectorAll(".elective-btn");
	electiveButtons.forEach((electiveButton) => {
		let i = electiveButton.parentElement.parentElement.querySelector(".id").textContent;
		let electiveName = "";

		electiveButton.addEventListener("click", (e) => {
			showAddElectivePopUp();
			if (students[i].elective) {
				electiveName = students[i].elective;
				document.querySelector("#new-elective").value = electiveName;
			} else {
				electiveName = document.querySelector("#new-elective")[document.querySelector("#new-elective").selectedIndex].value;
			}
		});
		document.querySelector("#new-elective").addEventListener("change", (e) => {
			electiveName = document.querySelector("#new-elective").value;
		});
		electivePopUp = document.querySelector(".add-elective-pop-up");
		let exitButton = electivePopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", removeAddElectivePopUp);

		let submitButton = document.querySelector(".add-elective-button");
		submitButton.addEventListener("click", (e) => {
			students[i].addElective(electiveName);
			removeAddElectivePopUp();
		});
	});
}


export function addStudentTardyButton() {
	let tardyButtons = document.querySelectorAll(".tardy-btn");
	tardyButtons.forEach((tardyButton) => {
		let i = tardyButton.parentElement.parentElement.querySelector(".id").textContent;
		let tardyName = document.querySelector("#new-tardy").value;

		tardyButton.addEventListener("click", showAddTardyPopUp);
		document.querySelector("#new-tardy").addEventListener("change", (e) => {
			tardyName = document.querySelector("#new-tardy").value;
		});
		tardyPopUp = document.querySelector(".add-tardy-pop-up");
		let exitButton = tardyPopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", removeAddTardyPopUp);

		let submitButton = document.querySelector(".add-tardy-button");
		submitButton.addEventListener("click", (e) => {
			students[i].addTardy(tardyName);
			tardyButton.parentElement.parentElement.querySelector(".tardies").textContent = students[i].tardies.length;
			removeAddTardyPopUp();
		});
	});
}


export function addStudentAbsenseButton() {
	let absenseButtons = document.querySelectorAll(".absense-btn");
	absenseButtons.forEach((absenseButton) => {
		let i = absenseButton.parentElement.parentElement.querySelector(".id").textContent;
		let absenseName = document.querySelector("#new-absense").value;
		absenseButton.addEventListener("click", showAddAbsensePopUp);
		document.querySelector("#new-absense").addEventListener("change", (e) => {
			absenseName = document.querySelector("#new-absense").value;
		});
		absensePopUp = document.querySelector(".add-absense-pop-up");
		let exitButton = absensePopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", removeAddAbsensePopUp);

		let submitButton = document.querySelector(".add-absense-button");
		submitButton.addEventListener("click", (e) => {
			students[i].addAbsense(absenseName);
			absenseButton.parentElement.parentElement.querySelector(".absenses").textContent = students[i].absenses.length;
			removeAddAbsensePopUp();
		});
	});
}

export function addStudentNoteButton() {
	let noteButtons = document.querySelectorAll(".note-btn");
	noteButtons.forEach((noteButton) => {
		let i = noteButton.parentElement.parentElement.querySelector(".id").textContent;
		let noteTitle = document.querySelector("#new-note-name").value;
		let note = document.querySelector("#new-note").value;
		let student;

		noteButton.addEventListener("click", (e) => {
			if (Array.from(e.target.classList).includes("bi")) {
				student = e.target.parentElement.parentElement.parentElement.id;
			} else {
				student = e.target.parentElement.parentElement.id;
			}
			showAddNotePopUp();
		});
		document.querySelector("#new-note-name").addEventListener("change", (e) => {
			noteTitle = document.querySelector("#new-note-name").value;
		});
		document.querySelector("#new-note").addEventListener("change", (e) => {
			note = document.querySelector("#new-note").value;
		});
		notePopUp = document.querySelector(".add-note-pop-up");
		let exitButton = notePopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", removeAddNotePopUp);

		let submitButton = document.querySelector(".add-note-button");
		submitButton.addEventListener("click", (e) => {
			students[i].addNote(noteTitle, note);
			removeAddNotePopUp();
			document.querySelector(`#${student}`).querySelector(".notes").innerHTML += `${note} <br>`;
		});
	});
}

export function takeNewParticipantInput(students){
	let newFirstName = document.querySelector("#new-first-name").value;
	let newLastName = document.querySelector("#new-last-name").value;
	let newCohort = document.querySelector("#new-cohort").value;
	let newCity = document.querySelector("#new-city").value;
	let userName = `${newFirstName.toLowerCase()}${newLastName.toLowerCase()}`;
	if (!isUserNameUnique(userName, students)) {
		userNameN++;
		userName += userNameN;
	}
	let newStudent = new Student(userName, newFirstName, newLastName);
	newStudent.addCity(newCity);
	newStudent.addCohort(newCohort);
	return newStudent;
}

// submitButton.addEventListener("click", (e) => {
// 	let newStudent = takeNewParticipantInput()
// 	renderNewStudent();
// 	newStudent.addCity(newCity);
// 	newStudent.addCohort(newCohort);

// 	removeNewParticipantPopUp();
// 	addStudentCapstoneButton();
// 	addStudentMentorButton()
// 	addStudentElectiveButton();
// 	addStudentTardyButton();
// 	addStudentAbsenseButton();
// 	addStudentNoteButton();
// });

// let absensesDropDown = document.querySelector("#absenses");

export function toggleNumberOfAbsenses(){
	let selectedAbsenses = e.target[e.target.selectedIndex].value;
	students.forEach((student) => {
		if (student.getAbsenses() == selectedAbsenses) {
			document.querySelector(`#student${student.id}`).style.display = "table-row";
		} else {
			document.querySelector(`#student${student.id}`).style.display = "none";
		}
	});

}
// absensesDropDown.addEventListener("change", (e) => {
// });

// let tardiesDropDown = document.querySelector("#tardies");

export function toggleNumberOfTardies(){
	let selectedTardies = e.target[e.target.selectedIndex].value;
	students.forEach((student) => {
		if (student.getTardies() == selectedTardies) {
			document.querySelector(`#student${student.id}`).style.display = "table-row";
		} else {
			document.querySelector(`#student${student.id}`).style.display = "none";
		}
	});

}
// tardiesDropDown.addEventListener("change", (e) => {
// });



