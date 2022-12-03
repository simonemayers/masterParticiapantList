export class Note {
	constructor(title, description, student) {
		this.title = title;
		this.description = description;
		this.student = student.userName;
	}
}