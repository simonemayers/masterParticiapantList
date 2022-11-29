export function addStudentRow() {
	let newRow = document.createElement("tr");
	list.appendChild(newRow);
	return newRow;
}

export function addStudentId(student) {
	let idTd = document.createElement("td");
	idTd.textContent = `${student.id}`;
	idTd.classList.add("id");
	return idTd;
}

export function addStudentName(student) {
	let nameTd = document.createElement("td");
	nameTd.textContent = student.getFullName();
	nameTd.classList.add("name");
	return nameTd;
}

export function addStudentAbsenses(student) {
	let absensesTd = document.createElement("td");
	absensesTd.textContent = student.getAbsenses();
	absensesTd.classList.add("absenses");
	return absensesTd;
}

export function addStudentTardies(student) {
	let tardiesTd = document.createElement("td");
	tardiesTd.textContent = student.getTardies();
	tardiesTd.classList.add("tardies");
	return tardiesTd;
}

export function addStudentNotes(student) {
	let notesTd = document.createElement("td");
	notesTd.innerHTML = student.getNotes();
	notesTd.classList.add("notes");
	return notesTd;
}

function addStudentActions(student) {
	let actionTd = document.createElement("td");
	actionTd.classList.add("actions");
	return actionTd;
}

export function createNewStudent(student) {
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