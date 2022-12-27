import { renderStudentCapstoneButton, renderStudentMentorButton, renderStudentElectiveButton, renderStudentTardyButton, renderStudentAbsenseButton, renderStudentNoteButton, renderStudentProbationButton, renderStudentMeetingButton } from "./student-action-buttons.js"
import { renderSidePanel } from "./side-panel/student-panel.js";


import { removeSidePanel } from "../controller/side-panel/remove-side-panel.js";
import { Student } from "../model/Student.js";


function renderStudentRow() {
	let list = document.querySelector(".participant-list tbody");
	let newRow = document.createElement("tr");
	list.appendChild(newRow);
	return newRow;
}

function renderStudentId(student) {
	let idTd = document.createElement("td");
	idTd.textContent = `${student.id}`;
	idTd.classList.add("id");
	return idTd;
}

function renderStudentName(student) {
	let nameTd = document.createElement("td");
	nameTd.textContent = student.getFullName();
	nameTd.classList.add("name");
	return nameTd;
}

function renderStudentAbsenses(student) {
	let absensesTd = document.createElement("td");
	absensesTd.textContent = student.getAbsenses();
	absensesTd.classList.add("absenses");
	return absensesTd;
}

function renderStudentTardies(student) {
	let tardiesTd = document.createElement("td");
	tardiesTd.textContent = student.getTardies();
	tardiesTd.classList.add("tardies");
	return tardiesTd;
}

// function renderStudentNotes(student) {
// 	let notesTd = document.createElement("td");
// 	notesTd.innerHTML = student.getNotes();
// 	notesTd.classList.add("notes");
// 	return notesTd;
// }

function renderStudentActions(student) {
	let actionTd = document.createElement("td");
	actionTd.classList.add("actions");
	return actionTd;
}



export function renderNewStudent(student) {
	let newRow = renderStudentRow();
	newRow.classList.add("student-row");
	let idTd = renderStudentId(student);
	let nameTd = renderStudentName(student);
	let absensesTd = renderStudentAbsenses(student);
	let tardiesTd = renderStudentTardies(student);
	// let notesTd = renderStudentNotes(student);
	let actionTd = renderStudentActions(student);

	let mentorButton = renderStudentMentorButton(student);
	let capstoneButton = renderStudentCapstoneButton(student)
	let electiveButton = renderStudentElectiveButton(student)
	let tardyButton = renderStudentTardyButton(student)
	let absenseButton = renderStudentAbsenseButton(student)
	let noteButton = renderStudentNoteButton(student)
	let probationButton = renderStudentProbationButton(student)
	let meetingButton = renderStudentMeetingButton(student)


	newRow.id = `student${idTd.textContent}`;
	newRow.appendChild(idTd);
	newRow.appendChild(nameTd);
	newRow.appendChild(absensesTd);
	newRow.appendChild(tardiesTd);
	// newRow.appendChild(notesTd);
	newRow.appendChild(actionTd);
	actionTd.appendChild(mentorButton);
	actionTd.appendChild(capstoneButton)
	actionTd.appendChild(electiveButton)
	actionTd.appendChild(tardyButton)
	actionTd.appendChild(absenseButton)
	actionTd.appendChild(noteButton)
	actionTd.appendChild(meetingButton)
	actionTd.appendChild(probationButton)

	function enableInput(e, input){
		e.target.parentElement.parentElement.querySelector(`${input}`).disabled = false
	}

	function showUsernameOnForm(sidePanel){
		sidePanel.querySelector("#username").value = student.getUserName()
	}
	function showStudentIdOnForm(sidePanel){
		sidePanel.querySelector("#student-id").value = student.getId()
	}
	function showFirstNameOnForm(sidePanel){
		sidePanel.querySelector(".first-name-input").value = student.getFirstName()
	}
	function showLastNameOnForm(sidePanel){
		sidePanel.querySelector(".last-name-input").value = student.getLastName()
	}
	function showProbationStatusOnForm(sidePanel){
		sidePanel.querySelector("#probation").value = student.getIsOnProbation()
	}
	function showMetStatusOnForm(sidePanel){
		sidePanel.querySelector("#met").value = student.getHasMetWithStaff()
	}

	newRow.addEventListener("click", (e) => {
		let sidePanel = renderSidePanel()
		showUsernameOnForm(sidePanel)
		showStudentIdOnForm(sidePanel)
		showFirstNameOnForm(sidePanel)
		showLastNameOnForm(sidePanel)
		showProbationStatusOnForm(sidePanel)
		showMetStatusOnForm(sidePanel)

		if(student.getMentor()){
			sidePanel.querySelector("#mentor").value = student.getMentor()
			sidePanel.querySelector("#mentor").disabled = true;
			document.querySelector(".mentor-group button").textContent = "Edit"
		} else if(!student.getMentor()){
			document.querySelector(".edit-mentor-group").style.display = "none"
		}
		if(student.getCapstone()){
			sidePanel.querySelector("#title").value = student.getCapstone().getTitle()
			sidePanel.querySelector("#type").value = student.getCapstone().getIsGroup()
			sidePanel.querySelector("#title").disabled = true;
			sidePanel.querySelector("#type").disabled = true;
			document.querySelector(".capstone-group button").textContent = "Edit"
		} else if(!student.getCapstone()){
			document.querySelector(".edit-capstone-group").style.display = "none"
		}
		if(student.getElective()){
			sidePanel.querySelector("#elective").value = student.getElective()
			sidePanel.querySelector("#elective").disabled = true;
			document.querySelector(".elective-group button").textContent = "Edit"
		} else if(!student.getElective()){
			document.querySelector(".edit-elective-group").style.display = "none"
		}

		sidePanel.addEventListener("click", (e) => {
			let button = e.target.classList[0]
			let groupName = e.target.parentElement.parentElement.className
			let group = e.target.parentElement.parentElement
			if(button.includes("edit-btn")){
				if(groupName === "name-group"){
					enableInput(e, ".first-name-input")
					enableInput(e, ".last-name-input")
				} else if(groupName === "probation-group"){
					enableInput(e, "#probation")
				} else if(groupName === "met-group"){
					enableInput(e, "#met")
				}
			} else if(button.includes("add-btn")){
				if(groupName === "mentor-group"){
					document.querySelector(".mentor-group button").textContent = "Cancel"
					document.querySelector(".mentor-group button").className = ""
					document.querySelector(".mentor-group button").classList.add("cancel-btn")
					document.querySelector(".mentor-group button").classList.add("btn")
					document.querySelector(".edit-mentor-group").style.display = "block"
					sidePanel.querySelector("#mentor").disabled = false;
				} else if(groupName === "capstone-group"){
					document.querySelector(".capstone-group button").textContent = "Cancel"
					document.querySelector(".capstone-group button").className = ""
					document.querySelector(".capstone-group button").classList.add("cancel-btn")
					document.querySelector(".capstone-group button").classList.add("btn")
					document.querySelector(".edit-capstone-group").style.display = "flex"
					sidePanel.querySelector("#title").disabled = false;
					sidePanel.querySelector("#type").disabled = false;
				} else if(groupName === "elective-group"){
					console.log("elective")
					document.querySelector(".elective-group button").textContent = "Cancel"
					document.querySelector(".edit-elective-group").style.display = "block"
					document.querySelector(".elective-group button").className = ""
					document.querySelector(".elective-group button").classList.add("cancel-btn")
					document.querySelector(".elective-group button").classList.add("btn")
					sidePanel.querySelector("#elective").disabled = false;
				}
			} else if(button === "cancel-btn"){
				if(groupName === "mentor-group"){
					if(student.getMentor()){
						sidePanel.querySelector("#mentor").disabled = true
						document.querySelector(".mentor-group button").textContent = "Edit"
						document.querySelector(".mentor-group button").className = ""
						document.querySelector(".mentor-group button").classList.add("add-btn")
						document.querySelector(".mentor-group button").classList.add("btn")
					} else {
						document.querySelector(".edit-mentor-group").style.display = "none"
						document.querySelector(".mentor-group button").textContent = "Add"
						document.querySelector(".mentor-group button").className = ""
						document.querySelector(".mentor-group button").classList.add("add-btn")
						document.querySelector(".mentor-group button").classList.add("btn")
					}
				} else if(groupName === "capstone-group"){
					if(student.getCapstone()){
						sidePanel.querySelector("#title").disabled = true;
						sidePanel.querySelector("#type").disabled = true;
						document.querySelector(".capstone-group button").textContent = "Edit"
						document.querySelector(".capstone-group button").className = ""
						document.querySelector(".capstone-group button").classList.add("add-btn")
						document.querySelector(".capstone-group button").classList.add("btn")
					} else{
						document.querySelector(".edit-capstone-group").style.display = "none"
						document.querySelector(".capstone-group button").textContent = "Add"
						document.querySelector(".capstone-group button").className = ""
						document.querySelector(".capstone-group button").classList.add("add-btn")
						document.querySelector(".capstone-group button").classList.add("btn")
					}
				} else if(groupName === "elective-group"){
					if(student.getElective()){
						sidePanel.querySelector("#elective").disabled = true;
						document.querySelector(".elective-group button").className = ""
						document.querySelector(".elective-group button").classList.add("add-btn")
						document.querySelector(".elective-group button").classList.add("btn")
						document.querySelector(".elective-group button").textContent = "Edit"
					} else{
						document.querySelector(".edit-elective-group").style.display = "none"
						document.querySelector(".elective-group button").className = ""
						document.querySelector(".elective-group button").classList.add("add-btn")
						document.querySelector(".elective-group button").classList.add("btn")
						document.querySelector(".elective-group button").textContent = "Add"
					}
				}
			}
			else if(Array.from(e.target.classList).includes("btn-success")){
				let firstName = sidePanel.querySelector(".first-name-input").value
				let lastName = sidePanel.querySelector(".last-name-input").value
				let probationStatus = sidePanel.querySelector("#probation").value
				let hasMetWithStaff = sidePanel.querySelector("#met").value
				let mentorName = sidePanel.querySelector("#mentor").value
				let capstoneTitle = sidePanel.querySelector("#title").value
				let capstoneStructure = sidePanel.querySelector("#type")[sidePanel.querySelector("#type").selectedIndex].value
				let elective = sidePanel.querySelector("#elective")[sidePanel.querySelector("#elective").selectedIndex].value

				student.setFirstName(firstName)
				student.setLastName(lastName)
				student.setIsOnProbation(probationStatus)
				student.setHasMetWithStaff(hasMetWithStaff)
				if(mentorName !== ""){
					student.addMentor(mentorName)
				}
				if(Array.from(document.querySelector(".capstone-group button").classList).includes("cancel-btn")){
					student.addCapstone(capstoneTitle, capstoneStructure)
				}
				if(Array.from(document.querySelector(".elective-group button").classList).includes("cancel-btn")){
					student.addElective(elective)
				}
				removeSidePanel()
			} else if(Array.from(e.target.classList).includes("btn-danger")){
				removeSidePanel()
			}
		})
	})
}
