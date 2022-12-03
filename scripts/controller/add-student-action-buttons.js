export function renderStudentMentorButton(student) {
	let button = document.createElement("button");
	button.classList.add("btn");
	button.classList.add("mentor-btn");
	button.classList.add(`mentor-btn-${student.id}`)
	button.innerHTML = '<i class="bi bi-person-plus-fill"></i>';
    return button;
}

export function renderStudentCapstoneButton(student){
	let button = document.createElement("button")
	button.classList.add("btn")
	button.classList.add("capstone-btn")
	button.classList.add(`capstone-btn-${student.id}`)
	button.innerHTML = '<i class="bi bi-mortarboard-fill"></i>'
	return button
}
