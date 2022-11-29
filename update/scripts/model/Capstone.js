export class Capstone {
	constructor(title, isGroup, student) {
		this.title = title;
		this.isGroup = isGroup;
		this.student = student;
		capstoneProjects.push(this);
		this.id = capstoneProjects.length;
	}
	changeTitle(title) {
		this.title = title;
	}
	changeGroup(isGroup) {
		this.isGroup = isGroup;
	}
}