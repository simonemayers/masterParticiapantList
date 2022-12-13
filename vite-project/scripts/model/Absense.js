export class Absense {
	constructor(reason, student) {
		this.reason = reason;
		this.student = student.userName;
		this.id = student.getAbsenses();
	}
}