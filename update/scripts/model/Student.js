export class Student {
	constructor(userName, firstName, lastName, absenses, tardies, capstoneProject, notes) {
		this.userName = userName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.absenses = [];
		this.tardies = [];
		this.capstoneProject = capstoneProject;
		students.push(this);
		this.id = students.length - 1;
		this.notes = [];
	}
	getFullName() {
		return `${this.firstName} ${this.lastName}`;
	}
	addAbsense(reason) {
		let newAbsense = new Absense(reason, this);
		this.absenses.push(newAbsense);
		newAbsense.id = this.absenses.length;
		absenses.push(newAbsense);
		return this.absenses;
	}
	getAbsenses() {
		return this.absenses.length;
	}
	addTardy(reason) {
		let newTardy = new Tardy(reason, this);
		this.tardies.push(newTardy);
		newTardy.id = this.tardies.length;
		tardies.push(newTardy);
		return this.tardies;
	}
	getTardies() {
		return this.tardies.length;
	}
	addCapstone(title, isGroup) {
		this.capstoneProject = new Capstone(title, isGroup, this);
	}
	changeCapstoneTitle(title) {
		this.capstoneProject.title = title;
	}
	changeCapstoneGroup(isGroup) {
		this.capstoneProject.isGroup = isGroup;
	}
	getCapstone() {
		return this.capstoneProject;
	}
	addNote(title, description) {
		let newNote = new Note(title, description, this);
		this.notes.push(newNote);
	}
	getNotes() {
		let notesString = "";
		this.notes.forEach((note) => {
			notesString += note.description + "<br>";
		});
		return notesString;
	}
	addMentor(name) {
		this.mentor = name;
	}
	getMentor() {
		return this.mentor;
	}
	addElective(elective) {
		this.elective = elective;
	}
	getElective() {
		return this.elective;
	}
	addCity(city) {
		this.city = city;
	}
	getCity() {
		return this.city;
	}
	addCohort(cohort) {
		this.cohort = cohort;
	}
	getCohort() {
		return this.cohort;
	}
}
