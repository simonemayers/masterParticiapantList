import { renderStudentCapstoneButton, renderStudentMentorButton } from "./add-student-action-buttons.js"


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

function renderStudentNotes(student) {
	let notesTd = document.createElement("td");
	notesTd.innerHTML = student.getNotes();
	notesTd.classList.add("notes");
	return notesTd;
}

function renderStudentActions(student) {
	let actionTd = document.createElement("td");
	actionTd.classList.add("actions");
	return actionTd;
}


export function renderNewStudent(student) {
	// let student = students[students.length - 1];
	let newRow = renderStudentRow();
	newRow.classList.add("student-row");
	let idTd = renderStudentId(student);
	let nameTd = renderStudentName(student);
	let absensesTd = renderStudentAbsenses(student);
	let tardiesTd = renderStudentTardies(student);
	let notesTd = renderStudentNotes(student);
	let actionTd = renderStudentActions(student);
	let mentorButton = renderStudentMentorButton(student);
	let capstoneButton = renderStudentCapstoneButton(student)

	newRow.id = `student${idTd.textContent}`;
	newRow.appendChild(idTd);
	newRow.appendChild(nameTd);
	newRow.appendChild(absensesTd);
	newRow.appendChild(tardiesTd);
	newRow.appendChild(notesTd);
	newRow.appendChild(actionTd);
	actionTd.appendChild(mentorButton);
	actionTd.appendChild(capstoneButton)
}
