// Imports of the classes and functions
import { renderAddMentorPopUp, deleteAddMentorPopUp } from "../controller/add-mentor-popup.js";

import { renderAddCapstonePopUp, deleteAddCapstonePopUp } from "../controller/add-capstone-popup.js";

import { renderAddElectivePopUp, deleteAddElectivePopUp } from "../controller/add-elective-popup.js";

import { renderAddTardyPopUp, deleteAddTardyPopUp } from "../controller/add-tardy-popup.js";

import { renderAddAbsensePopUp, deleteAddAbsensePopUp } from "../controller/add-absense-popup.js";

import { renderAddNotePopUp, deleteAddNotePopUp } from "../controller/add-note-popup.js";

import { renderAddProbationPopUp, deleteAddProbationPopUp } from "../controller/add-probation-popup.js";

import { renderAddMeetingPopUp, deleteAddMeetingPopUp } from "../controller/add-meeting-popup.js";

import { Student } from "../model/Student.js"




function findCurrentStudent(e, students){
	return students[parseInt(e.target.closest("tr").children[0].textContent)]
}



function resetCheckboxes(){
	let probationCheckbox = document.querySelector("#probation");
	let electiveCheckbox = document.querySelector("#elective");
	let notesCheckbox = document.querySelector("#notes");
	let mentorCheckbox = document.querySelector("#mentor");
	let meetingCheckbox = document.querySelector("#met");
	probationCheckbox? probationCheckbox.checked = false : probationCheckbox.checked = true;
	electiveCheckbox? electiveCheckbox.checked = false : electiveCheckbox.checked = true;
	notesCheckbox? notesCheckbox.checked = false : notesCheckbox.checked = true;
	mentorCheckbox? mentorCheckbox.checked = false : mentorCheckbox.checked = true;
	meetingCheckbox? meetingCheckbox.checked = false : meetingCheckbox.checked = true;
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
		resetCheckboxes()
	}
}

function isUserNameUnique(user, students) {
	let userNames = [];
	let answer;
	if (students.length != 0) {
		students.forEach((student) => {
			userNames.push(student.userName)
			if (userNames.includes(user)) {
				answer = false;
			} else {
				answer = true;
			}
		});
	} else {
		answer = true
	}
	return answer;
}
let userNameN = 1;





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




function getVisibleDOMStudents(){
	return Array.from(document.querySelector("tbody").childNodes).filter(s => s.style.display === "table-row" || s.style.display === "")
}

export function getCurrentFilterSelections(){
	let probationCheckbox = document.querySelector("#probation");
	let electiveCheckbox = document.querySelector("#elective");
	let notesCheckbox = document.querySelector("#notes");
	let mentorCheckbox = document.querySelector("#mentor");
	let metCheckbox = document.querySelector("#met");
	let absenseOption = document.querySelector("#absenses");
	let tardyOption = document.querySelector("#tardies");
	let cityOption = document.querySelector("#cities");
	let cohortOption = document.querySelector("#cohorts");
	let electiveOption = document.querySelector("#electives");
	return [probationCheckbox, electiveCheckbox, notesCheckbox, mentorCheckbox, metCheckbox, absenseOption, tardyOption, cityOption, cohortOption, electiveOption]
}

export function toggleAll(students){
	let visibleDOMStudents = getVisibleDOMStudents()
	let filters = getCurrentFilterSelections()
	let [probationCheckbox, electiveCheckbox, notesCheckbox, mentorCheckbox, metCheckbox, absenseOption, tardyOption, cityOption, cohortOption, electiveOption] = filters
	let probationCheckboxValue = probationCheckbox.checked;
	let electiveCheckboxValue = electiveCheckbox.checked;
	let notesCheckboxValue = notesCheckbox.checked;
	let mentorCheckboxValue = mentorCheckbox.checked;
	let metCheckboxValue = metCheckbox.checked;
	let absenseValue = parseInt(absenseOption[absenseOption.selectedIndex].value)
	let tardyValue = parseInt(tardyOption[tardyOption.selectedIndex].value)
	let cityValue = cityOption[cityOption.selectedIndex].value
	let cohortValue = cohortOption[cohortOption.selectedIndex].value
	let electiveValue = electiveOption[electiveOption.selectedIndex].value

	let checkBoxes = [probationCheckbox, electiveCheckbox, notesCheckbox, mentorCheckbox, metCheckbox]
	let options = [absenseOption, tardyOption, cityOption, cohortOption, electiveOption]
	let whatIsChecked = checkBoxes.filter(c => c.checked ===true).map(i => i.id);
	let whatIsSelected = options.filter(o => o[o.selectedIndex].value != -1).map(i => i.id)
	let selectedFilters = [...whatIsChecked, ...whatIsSelected]

	let allDOMStudents = Array.from(document.querySelector("tbody").childNodes)
	let comboFiltered = students;

	selectedFilters.map(c => {
			if(c === "probation"){
				comboFiltered = comboFiltered.filter(s => Boolean(s.getIsOnProbation()) === probationCheckboxValue)
			}
			if(c === "elective"){
				comboFiltered = comboFiltered.filter(s => Boolean(s.getElective()) === electiveCheckboxValue)
			}
			if(c === "notes"){
				comboFiltered = comboFiltered.filter(s => Boolean(s.getNotes()) === notesCheckboxValue)
			}
			if(c === "mentor"){
				comboFiltered = comboFiltered.filter(s => Boolean(s.getMentor()) === mentorCheckboxValue)
			}
			if(c === "met"){
				comboFiltered = comboFiltered.filter(s => Boolean(s.getHasMetWithStaff()) === metCheckboxValue)
			}

			if(c === "absenses"){
				if(absenseValue === 0){
					comboFiltered = comboFiltered.filter(s => s.getAbsenses() === 0)
				} else if(absenseValue>0){
					for(let i=1; i<=10; i++){
						if(absenseValue === i){
							comboFiltered = comboFiltered.filter(s => s.getAbsenses() >= i)
						}
					}
				}
			}
			if(c === "tardies"){
				if(tardyValue === 0){
					comboFiltered = comboFiltered.filter(s => s.getTardies() === 0)
				} else if(tardyValue>0){
					for(let i=1; i<=10; i++){
						if(tardyValue === i){
							comboFiltered = comboFiltered.filter(s => s.getTardies()>=i)
						}
					}
				}
			}
			if(c === "cities"){
				if(cityValue === "charlotte"){
					comboFiltered = comboFiltered.filter(s => s.getCity() === "charlotte")
				} else if(cityValue === "raleigh"){
					comboFiltered = comboFiltered.filter(s => s.getCity() === "raleigh")
				} else if(cityValue === "wilmington"){
					comboFiltered = comboFiltered.filter(s => s.getCity() === "wilmington")
				} else if(cityValue === "detroit"){
					comboFiltered = comboFiltered.filter(s => s.getCity() === "detroit")
				} else if(cityValue === "minneapolis"){
					comboFiltered = comboFiltered.filter(s => s.getCity() === "minneapolis")
				} else if(cityValue === "dallas"){
					comboFiltered = comboFiltered.filter(s => s.getCity() === "dallas")
				} else if(cityValue === "atlanta"){
					comboFiltered = comboFiltered.filter(s => s.getCity() === "atlanta")
				}
			}
			if(c === "cohorts"){
				if(cohortValue === "c5"){
					comboFiltered = comboFiltered.filter(s => s.getCohort() === "c5")
				} else if(cohortValue === "c4"){
					comboFiltered = comboFiltered.filter(s => s.getCohort() === "c4")
				}
			}
			if(c === "electives"){
				if(electiveValue === "js"){
					comboFiltered = comboFiltered.filter(s => s.getElective() === "javascript")
				} else if(electiveValue === "da"){
					comboFiltered = comboFiltered.filter(s => s.getElective() === "analytics")
				} else if(electiveValue === "cs"){
					comboFiltered = comboFiltered.filter(s => s.getElective() === "cyber")
				} else if(electiveValue === "pm"){
					comboFiltered = comboFiltered.filter(s => s.getElective() === "manager")
				}
			}
	})

	allDOMStudents.map(s => {
		s.style.display = "table-row"
	})

	visibleDOMStudents = getVisibleDOMStudents()
	comboFiltered = comboFiltered.map(s => s.id)

	visibleDOMStudents.map(s => {
		let id = parseInt(s.id.slice(-1))
		if(!comboFiltered.includes(id)){
			s.style.display = "none"
		}
	})
	comboFiltered = []

}



export function addStudentAbsenseButton(student, students) {
	let absenseButton = document.querySelector(`.absense-btn-${student.id}`);
	absenseButton.addEventListener("click", (e) => {
		renderAddAbsensePopUp()
		let currentStudent = findCurrentStudent(e, students)

		let absensePopUp = document.querySelector(".add-absense-pop-up");
		let exitButton = absensePopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", deleteAddAbsensePopUp)

		let submitButton = document.querySelector(".add-absense-button");
		submitButton.addEventListener("click", (e) => {
			currentStudent.addAbsense(document.querySelector("#new-absense").value)
			document.querySelector(`#student${currentStudent.id}`).querySelector(".absenses").textContent = currentStudent.getAbsenses()
			deleteAddAbsensePopUp()
			toggleAll(students)
		})
	})
}

export function addStudentTardyButton(student, students) {
	let tardyButton = document.querySelector(`.tardy-btn-${student.id}`);
	tardyButton.addEventListener("click", (e) => {
		renderAddTardyPopUp()
		let currentStudent = findCurrentStudent(e, students)

		let tardyPopUp = document.querySelector(".add-tardy-pop-up");
		let exitButton = tardyPopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", deleteAddTardyPopUp)

		let submitButton = document.querySelector(".add-tardy-button");
		submitButton.addEventListener("click", (e) => {
			currentStudent.addTardy(document.querySelector("#new-tardy").value)
			document.querySelector(`#student${currentStudent.id}`).querySelector(".tardies").textContent = currentStudent.getTardies()
			deleteAddTardyPopUp()
			toggleAll(students)
		})
	})
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
			toggleAll(students)
		}, { once: true })
	})
	return mentorButton;
}


function handleCapstoneButtonClick(currentStudent){
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

		let capstonePopUp = document.querySelector(".add-capstone-pop-up");
		let exitButton = capstonePopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", deleteAddCapstonePopUp)

		let submitButton = document.querySelector(".add-capstone-button");
		submitButton.addEventListener("click", (e) => {
			let title =document.querySelector("#new-capstone-name").value
			let isGroup = document.querySelector("#new-structure").value
			currentStudent.addCapstone(title, isGroup)
			deleteAddCapstonePopUp()
			toggleAll(students)
		});
	});
}

function handleElectiveButtonClick(currentStudent){
	renderAddElectivePopUp()

	if (currentStudent.getElective()) {
		document.querySelector("#new-elective").value = currentStudent.getElective();
		document.querySelector("#new-elective").placeholder = "";
	} else {
		document.querySelector("#new-elective").value = "Not assigned";
	}
};
export function addStudentElectiveButton(student, students, visibleDOMStudents) {
	let electiveButton = document.querySelector(`.elective-btn-${student.id}`);
	electiveButton.addEventListener("click", (e) => {
		let currentStudent = findCurrentStudent(e, students)
		handleElectiveButtonClick(currentStudent)

		let electivePopUp = document.querySelector(".add-elective-pop-up");
		let exitButton = electivePopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", deleteAddElectivePopUp)

		let submitButton = document.querySelector(".add-elective-button");
		submitButton.addEventListener("click", (e) => {
			currentStudent.addElective(document.querySelector("#new-elective").value)
			deleteAddElectivePopUp()
			toggleAll(students)
		})
	})
}

export function addStudentNoteButton(student, students) {
	let noteButton = document.querySelector(`.note-btn-${student.id}`);
	noteButton.addEventListener("click", (e) => {
		renderAddNotePopUp()
		let currentStudent = findCurrentStudent(e, students)

		let notePopUp = document.querySelector(".add-note-pop-up");
		let exitButton = notePopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", deleteAddNotePopUp)

		let submitButton = document.querySelector(".add-note-button");
		submitButton.addEventListener("click", (e) => {
			let title = document.querySelector("#new-note-name").value
			let description = document.querySelector("#new-note").value
			currentStudent.addNote(title, description)
			document.querySelector(`#student${currentStudent.id}`).querySelector(".notes").innerHTML = currentStudent.getNotes()
			deleteAddNotePopUp()
			toggleAll(students)
		})
	})
}


function handleMeetingButtonClick(currentStudent){
	renderAddMeetingPopUp()
	document.querySelector("#new-meeting").value = currentStudent.getHasMetWithStaff();
};
export function addStudentMeetingButton(student, students) {
	let meetingButton = document.querySelector(`.meeting-btn-${student.id}`);
	meetingButton.addEventListener("click", (e) => {
		let currentStudent = findCurrentStudent(e, students)
		handleMeetingButtonClick(currentStudent)

		let meetingPopUp = document.querySelector(".add-meeting-pop-up");
		let exitButton = meetingPopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", deleteAddMeetingPopUp)

		let submitButton = document.querySelector(".add-meeting-button");
		submitButton.addEventListener("click", (e) => {
			let selected = document.querySelector("#new-meeting").value
			let hasMetWithStaff;
			if(selected === "true"){
				hasMetWithStaff = true
			} else if(selected === "false"){
				hasMetWithStaff = false
			}
			currentStudent.setHasMetWithStaff(hasMetWithStaff)
			deleteAddMeetingPopUp()
			toggleAll(students)
		})
	})
}

function handleProbationButtonClick(currentStudent){
	renderAddProbationPopUp()
	document.querySelector("#new-probation").value = currentStudent.getIsOnProbation();
};
export function addStudentProbationButton(student, students) {
	let probationButton = document.querySelector(`.probation-btn-${student.id}`);
	probationButton.addEventListener("click", (e) => {
		let currentStudent = findCurrentStudent(e, students)
		handleProbationButtonClick(currentStudent)

		let probationPopUp = document.querySelector(".add-probation-pop-up");
		let exitButton = probationPopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", deleteAddProbationPopUp)

		let submitButton = document.querySelector(".add-probation-button");
		submitButton.addEventListener("click", (e) => {
			let selected = document.querySelector("#new-probation").value
			let isOnProbation;
			if(selected === "true"){
				isOnProbation = true
			} else if(selected === "false"){
				isOnProbation = false
			}
			currentStudent.setIsOnProbation(isOnProbation)
			deleteAddProbationPopUp()
			toggleAll(students)
		})
	})
}
