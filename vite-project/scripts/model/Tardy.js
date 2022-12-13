export class Tardy {
	constructor(reason, student) {
		this.reason = reason;
		this.student = student.userName;
		this.id = student.getTardies();
	}
}