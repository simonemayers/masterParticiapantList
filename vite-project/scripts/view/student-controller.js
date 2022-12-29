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



export function renderNewStudent(student) {
	let newRow = renderStudentRow();
	newRow.classList.add("student-row");
	let idTd = renderStudentId(student);
	let nameTd = renderStudentName(student);
	let absensesTd = renderStudentAbsenses(student);
	let tardiesTd = renderStudentTardies(student);
	newRow.id = `student${idTd.textContent}`;
	newRow.appendChild(idTd);
	newRow.appendChild(nameTd);
	newRow.appendChild(absensesTd);
	newRow.appendChild(tardiesTd);

	function enableInput(e, input){
		e.target.parentElement.parentElement.querySelector(`${input}`).disabled = false
	}

	function showUsernameOnForm(sidePanel){
		sidePanel.querySelector("#username").value = student.getUserName()
	}
	function showStudentIdOnForm(sidePanel){
		sidePanel.querySelector("#student-id").value = student.getId()
	}
	function showCityOnForm(sidePanel){
		sidePanel.querySelector("#city-info").value = student.getCity()[0].toUpperCase() + student.getCity().slice(1)
	}
	function showCohortOnForm(sidePanel){
		sidePanel.querySelector("#cohort-info").value = student.getCohort()
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
		document.querySelector("#add-new-participant").disabled = true;
		if((document.querySelector(".side-panel"))){
			document.querySelector(".body-container").removeChild(document.querySelector(".side-panel"))
		}
		let sidePanel = renderSidePanel()
		let detailsPanel = renderDetailsPanel()
		sidePanel.appendChild(detailsPanel)
		showUsernameOnForm(sidePanel)
		showStudentIdOnForm(sidePanel)
		showCityOnForm(sidePanel)
		showCohortOnForm(sidePanel)
		showFirstNameOnForm(sidePanel)
		showLastNameOnForm(sidePanel)
		showProbationStatusOnForm(sidePanel)
		showMetStatusOnForm(sidePanel)

		let notesButton = document.querySelector(".notes-panel")
		let notesPanel = renderNotesPanel()
		let notesPreview = renderNotesPreview()
		let addNoteButton = renderAddNoteButton()
		let noteDetailsContainer = renderNoteDetailsContainer()
		let detailsPanelButton = document.querySelector(".details-panel.btn")
		let notesPanelButton = document.querySelector(".notes-panel.btn")
		let editingNote;

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
			// document.querySelector("#add-new-participant").disabled = true;
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
				document.querySelector("#add-new-participant").disabled = false;
			}
		})

		notesButton.addEventListener("click", (e) => {
			detailsPanelButton.disabled = false;
			notesButton.disabled = true;
			sidePanel.appendChild(notesPanel)
			notesPanel.appendChild(notesPreview)
			detailsPanel.style.display = "none"
			detailsPanelButton.className = ""
			detailsPanelButton.classList.add("details-panel")
			detailsPanelButton.classList.add("btn")
			notesPanelButton.classList.add("active-panel")
			notesPreview.appendChild(addNoteButton)
			for(let i=student.getNotes().length-1; i>=0; i--){
				let noteContainer = renderNoteContainer()
				notesPreview.appendChild(noteContainer)
				noteContainer.querySelector(".note-title").textContent = student.getNotes()[i].getNoteTitle()
			}

			notesPanel.addEventListener("click", (e) => {
				if(Array.from(e.target.classList).includes(`${addNoteButton.classList[0]}`)){
					notesPanel.appendChild(noteDetailsContainer)
					addNoteButton.style.display = "none"
					notesPreview.style.display = "none"
					noteDetailsContainer.className = "note-details-container"
					sidePanel.querySelector("#note-details-title").value = ""
					sidePanel.querySelector("#note-details-content").value = ""
				}
				if(Array.from(e.target.classList).includes("bi-caret-right-fill")){
					e.target.parentElement.classList.add("edit-mode")
					console.log(e.target.parentElement)
					let noteTitle = e.target.previousSibling.querySelector(".note-title").textContent
					let selectedNote = student.getNotes().filter(n=> n.getNoteTitle() == noteTitle)[0]
					notesPanel.appendChild(noteDetailsContainer)
					addNoteButton.style.display = "none"
					notesPreview.style.display = "none"
					sidePanel.querySelector("#note-details-title").value = selectedNote.getNoteTitle()
					sidePanel.querySelector("#note-details-content").value = selectedNote.getNoteDescription()
					editingNote = selectedNote
				}
				if(Array.from(e.target.classList).includes("btn-success")){
					let noteTitle = sidePanel.querySelector("#note-details-title").value
					let noteContent = sidePanel.querySelector("#note-details-content").value
					// addNoteButton.style.display = "block"
					if(!document.querySelector(".note-container.edit-mode")){
						student.addNote(noteTitle, noteContent)
						sidePanel.querySelector("#note-details-title").value = ""
						sidePanel.querySelector("#note-details-content").value = ""
						let newNoteContainer = renderNoteContainer()
						// notesPreview.appendChild(newNoteContainer)
						notesPreview.prepend(newNoteContainer)
						let notes = Array.from(document.querySelectorAll(".note-title"))
						// notes[notes.length -1].textContent = noteTitle
						notes[0].textContent = noteTitle
					} else if(document.querySelector(".note-container.edit-mode")){
						let match = document.querySelector(".note-container.edit-mode")
						match.querySelector(".note-title").textContent = noteTitle
						editingNote.setNoteTitle(noteTitle)
						editingNote.setNoteDescription(noteContent)
						match.className = "note-container"
					}
					notesPanel.removeChild(noteDetailsContainer)
					notesPreview.removeChild(addNoteButton)
					notesPreview.prepend(addNoteButton)
					addNoteButton.style.display = "block"
					notesPreview.style.display = "block"
				}
				if(Array.from(e.target.classList).includes("btn-danger")){
					notesPanel.removeChild(noteDetailsContainer)
					addNoteButton.style.display = "block"
					notesPreview.style.display = "block"
					Array.from(document.querySelectorAll(".note-container")).map(n => n.className = "note-container")
				}
			})
		})
		detailsPanelButton.addEventListener("click", (e) => {
			detailsPanelButton.disabled = true;
			notesButton.disabled = false;
			sidePanel.removeChild(notesPanel)
			detailsPanel.style.display = "block"
			notesPanelButton.className = ""
			notesPanelButton.classList.add("notes-panel")
			notesPanelButton.classList.add("btn")
			detailsPanelButton.classList.add("active-panel")
			for(let i=0; i<=notesPreview.childElementCount; i++){
				notesPreview.lastChild.remove()
			}

		})


	})
}
