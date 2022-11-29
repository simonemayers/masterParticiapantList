// Imports of the classes and functions
import { showAddMentorPopUp, removeAddMentorPopUp } from "./add-mentor.js";


function createStudentMentorButton() {
	let button = document.createElement("button");
	button.classList.add("btn");
	button.classList.add("mentor-btn");
	button.innerHTML = '<i class="bi bi-person-plus-fill"></i>';
    return button;
}


function addStudentMentorButton(student) {
	
	// Added to separate concerns, returns a button element
    // and references the button as variable.
	let mentorButton = createStudentMentorButton();
	let mentorName;
    // You should make this more descriptive, when using else where, its easy
    // to forget what the else is for.
	let i;

	// i = parseInt(e.target.parentElement.parentElement.parentElement.querySelector(".id").textContent);
	// i = parseInt(e.target.closest("tr").children[0].textContent);

	const currentStudent = students.find((student) => student.id === i);


	mentorButton.addEventListener("click", (e) => {
		showAddMentorPopUp();

        console.log(student);
		console.log(students[student]);

        // Found the main issue, you are always referencing the newest student, not the student that you need to be referencing.
        // You can use state to help deal with this. There are two main ways to deal with state in your application without a framework.
        // You can have everything exist in the class and use OOP, or you can have everything as variables and deal with 
        // state in one place. I would recommend the latter, but it is up to you. Thats' why ppl recommend using a framework.
  
		if (students[i].getMentor()) {
			mentorName = students[i].getMentor();
			document.querySelector("#new-mentor-name").value = mentorName;
			console.log("has mentor");
		} else {
			console.log("does not have mentor");
		}

	});

	document.querySelector("#new-mentor-name").addEventListener("change", (e) => {
		mentorName = document.querySelector("#new-mentor-name").value;
	});

	mentorPopUp = document.querySelector(".add-mentor-pop-up");
	let exitButton = mentorPopUp.querySelector(".exit-pop-up-button");
	exitButton.addEventListener("click", removeAddMentorPopUp);

	let submitButton = document.querySelector(".add-mentor-button");
	submitButton.addEventListener("click", (e) => {
		students[i].addMentor(mentorName);
		removeAddMentorPopUp();
	});
	return button;
} 



var show = true;
function showCheckboxes() {
	var checkboxes = document.getElementById("checkBoxes");

	if (show) {
		checkboxes.style.display = "flex";
		show = false;
	} else {
		checkboxes.style.display = "none";
		show = true;
	}
}

function isUserNameUnique(user) {
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

let newParticipantButton = document.querySelector("#add-new-participant");
let exitButton = document.querySelector(".exit-pop-up-button");
let submitButton = document.querySelector(".new-participant-button");
let userNameN = 1;

newParticipantButton.addEventListener("click", showNewParticipantPopUp);
exitButton.addEventListener("click", removeNewParticipantPopUp);


function addStudentCapstoneButton() {
	let capstoneButtons = document.querySelectorAll(".capstone-btn");
	capstoneButtons.forEach((capstoneButton) => {
		let i = capstoneButton.parentElement.parentElement.querySelector(".id").textContent;
		let capstoneName = "";
		let isGroup = true;
		if (students[i].capstoneProject) {
			capstoneName = students[i].capstoneProject.title;
			isGroup = students[i].capstoneProject.isGroup;
		}
		capstoneButton.addEventListener("click", (e) => {
			showAddCapstonePopUp();
			document.querySelector("#new-capstone-name").value = capstoneName;
			if (isGroup) {
				document.querySelector("#new-structure").selectedIndex = 0;
			} else {
				document.querySelector("#new-structure").selectedIndex = 1;
			}
		});
		document.querySelector("#new-capstone-name").addEventListener("change", (e) => {
			capstoneName = document.querySelector("#new-capstone-name").value;
		});
		document.querySelector("#new-structure").addEventListener("change", (e) => {
			isGroup = document.querySelector("#new-structure")[document.querySelector("#new-structure").selectedIndex].value == "true";
		});
		capstonePopUp = document.querySelector(".add-capstone-pop-up");
		let exitButton = capstonePopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", removeAddCapstonePopUp);
		let submitButton = document.querySelector(".add-capstone-button");

		submitButton.addEventListener("click", (e) => {
			students[i].addCapstone(capstoneName, isGroup);
			removeAddCapstonePopUp();
		});
	});
}



function addStudentElectiveButton() {
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


function addStudentTardyButton() {
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


function addStudentAbsenseButton() {
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

function addStudentNoteButton() {
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

submitButton.addEventListener("click", (e) => {
	let newFirstName = document.querySelector("#new-first-name").value;
	let newLastName = document.querySelector("#new-last-name").value;
	let newCohort = document.querySelector("#new-cohort").value;
	let newCity = document.querySelector("#new-city").value;
	let userName = `${newFirstName.toLowerCase()}${newLastName.toLowerCase()}`;
	let newStudent = new Student(userName, newFirstName, newLastName);
	if (!isUserNameUnique(userName)) {
		userNameN++;
		userName += userNameN;
	}
	createNewStudent();
	newStudent.addCity(newCity);
	newStudent.addCohort(newCohort);
	removeNewParticipantPopUp();

	addStudentCapstoneButton();
	// addStudentMentorButton()
	addStudentElectiveButton();
	addStudentTardyButton();
	addStudentAbsenseButton();
	addStudentNoteButton();
});

let absensesDropDown = document.querySelector("#absenses");
absensesDropDown.addEventListener("change", (e) => {
	let selectedAbsenses = e.target[e.target.selectedIndex].value;
	students.forEach((student) => {
		if (student.getAbsenses() == selectedAbsenses) {
			document.querySelector(`#student${student.id}`).style.display = "table-row";
		} else {
			document.querySelector(`#student${student.id}`).style.display = "none";
		}
	});
});

let tardiesDropDown = document.querySelector("#tardies");
tardiesDropDown.addEventListener("change", (e) => {
	let selectedTardies = e.target[e.target.selectedIndex].value;
	students.forEach((student) => {
		if (student.getTardies() == selectedTardies) {
			document.querySelector(`#student${student.id}`).style.display = "table-row";
		} else {
			document.querySelector(`#student${student.id}`).style.display = "none";
		}
	});
});
