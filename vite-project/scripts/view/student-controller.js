import { renderStudentTardyButton, renderStudentAbsenseButton } from "./student-action-buttons.js"
import { renderSidePanel } from "./side-panel/student-panel.js";


import { removeSidePanel } from "../controller/side-panel/remove-side-panel.js";
import { Student } from "../model/Student.js";
import { renderDetailsPanel } from "./side-panel/details/student-details-panel.js";
import { renderAddNoteButton, renderNoteContainer, renderNoteDetailsContainer, renderNotesPanel, renderNotesPreview } from "./side-panel/notes/student-notes-panel.js";


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

// function renderStudentActions(student) {
// 	let actionTd = document.createElement("td");
// 	actionTd.classList.add("actions");
// 	return actionTd;
// }



export function renderNewStudent(student) {
	let newRow = renderStudentRow();
	newRow.classList.add("student-row");
	let idTd = renderStudentId(student);
	let nameTd = renderStudentName(student);
	let absensesTd = renderStudentAbsenses(student);
	let tardiesTd = renderStudentTardies(student);
	// let notesTd = renderStudentNotes(student);
	// let actionTd = renderStudentActions(student);
	// let mentorButton = renderStudentMentorButton(student);
	// let capstoneButton = renderStudentCapstoneButton(student)
	// let electiveButton = renderStudentElectiveButton(student)
	// let tardyButton = renderStudentTardyButton(student)
	// let absenseButton = renderStudentAbsenseButton(student)
	// let noteButton = renderStudentNoteButton(student)
	// let probationButton = renderStudentProbationButton(student)
	// let meetingButton = renderStudentMeetingButton(student)

	newRow.id = `student${idTd.textContent}`;
	newRow.appendChild(idTd);
	newRow.appendChild(nameTd);
	newRow.appendChild(absensesTd);
	newRow.appendChild(tardiesTd);
	// newRow.appendChild(notesTd);
	// newRow.appendChild(actionTd);
	// actionTd.appendChild(mentorButton);
	// actionTd.appendChild(capstoneButton)
	// actionTd.appendChild(electiveButton)
	// actionTd.appendChild(tardyButton)
	// actionTd.appendChild(absenseButton)
	// actionTd.appendChild(noteButton)
	// actionTd.appendChild(meetingButton)
	// actionTd.appendChild(probationButton)
	// return newRow

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

		let detailsPanel = renderDetailsPanel()
		sidePanel.appendChild(detailsPanel)
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

		detailsPanel.addEventListener("click", (e) => {
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
				if(!document.querySelector("#first-name").disabled){
					student.setFirstName(firstName)
					student.setLastName(lastName)
					let match = Array.from(document.querySelectorAll(".participant-list tr")).filter(s => parseInt(s.id.slice(-1)) == student.getId())
					match[0].querySelector(".name").textContent = student.getFullName()
				}
				// if(Array.from(document.querySelector(".notes-panel.btn").classList).includes("active-panel")){
				// 	student.addNote(noteTitle, noteContent)
				// }
				removeSidePanel()
			} else if(Array.from(e.target.classList).includes("btn-danger")){
				removeSidePanel()
			}
		})

		//new stuff
		let notesButton = document.querySelector(".notes-panel")
		let notesPanel = renderNotesPanel()
		let notesPreview = renderNotesPreview()
		let addNoteButton = renderAddNoteButton()
		let noteDetailsContainer = renderNoteDetailsContainer()
		let detailsPanelButton = document.querySelector(".details-panel.btn")
		let notesPanelButton = document.querySelector(".notes-panel.btn")

		notesButton.addEventListener("click", (e) => {
			sidePanel.appendChild(notesPanel)
			notesPanel.appendChild(notesPreview)
			detailsPanel.style.display = "none"
			detailsPanelButton.className = ""
			detailsPanelButton.classList.add("details-panel")
			detailsPanelButton.classList.add("btn")
			notesPanelButton.classList.add("active-panel")
			if(student.getNotes().length){
				let noteContainer = renderNoteContainer()
				notesPreview.appendChild(noteContainer)
			}
			notesPreview.appendChild(addNoteButton)

			notesPanel.addEventListener("click", (e) => {
				let editingNote;
				if(Array.from(e.target.classList).includes(`${addNoteButton.classList[0]}`)){
					notesPanel.appendChild(noteDetailsContainer)
					// addNoteButton.style.display = "none"
					notesPreview.removeChild(addNoteButton)
					Array.from(document.querySelectorAll(".note-container")).map(note => {
						note.style.display = "none"
					})
					noteDetailsContainer.className = "note-details-container"
					sidePanel.querySelector("#note-details-title").value = ""
					sidePanel.querySelector("#note-details-content").value = ""
				}
				if(Array.from(e.target.classList).includes("bi-caret-right-fill")){
					let noteTitle = e.target.previousSibling.querySelector(".note-title").textContent
					let selectedNote = student.getNotes().filter(n=> n.getNoteTitle() == noteTitle)[0]
					notesPanel.appendChild(noteDetailsContainer)
					noteDetailsContainer.classList.add("edit-mode")

					notesPreview.removeChild(addNoteButton)
					Array.from(document.querySelectorAll(".note-container")).map(note => {
						note.style.display = "none"
					})
					sidePanel.querySelector("#note-details-title").value = selectedNote.getNoteTitle()
					sidePanel.querySelector("#note-details-content").value = selectedNote.getNoteDescription()
					editingNote = selectedNote

				}
				if(Array.from(e.target.classList).includes("btn-success")){
					let noteTitle = sidePanel.querySelector("#note-details-title").value
					let noteContent = sidePanel.querySelector("#note-details-content").value
					console.log(editingNote)

					if(Array.from(noteDetailsContainer.classList).includes("edit-mode")){
						console.log("edit mode")
						console.log(editingNote)
						editingNote.setNoteTitle(noteTitle)
						editingNote.setNoteDescription(noteContent)
					} else{
						student.addNote(noteTitle, noteContent)
						sidePanel.querySelector("#note-details-title").value = ""
						sidePanel.querySelector("#note-details-content").value = ""
						let newNoteContainer = renderNoteContainer()
						notesPreview.appendChild(newNoteContainer)
						let notes = Array.from(document.querySelectorAll(".note-title"))
						notes[notes.length -1].textContent = noteTitle

					}

					notesPanel.removeChild(noteDetailsContainer)
					notesPreview.appendChild(addNoteButton)
					Array.from(document.querySelectorAll(".note-container")).map(note => {
						note.style.display = "flex"
					})
				}

				console.log(editingNote)



			})









		})


	})
}
