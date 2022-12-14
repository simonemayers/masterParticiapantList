import { renderAddAbsensePopUp, deleteAddAbsensePopUp } from "../controller/add-absense-popup";
import { findCurrentStudent } from "./view";
import { toggleAll } from "./view";

export function addStudentAbsense(student, students) {
	let absenseButton = document.querySelector(`.absense-btn-${student.id}`);
	absenseButton.addEventListener("click", (e) => {
		renderAddAbsensePopUp()
		let currentStudent = findCurrentStudent(e, students)

		let absensePopUp = document.querySelector(".add-absense-pop-up");
		let exitButton = absensePopUp.querySelector(".exit-pop-up-button");
		exitButton.addEventListener("click", deleteAddAbsensePopUp)

		let submitButton = document.querySelector(".add-absense-button");
		submitButton.addEventListener("click", (e) => {
			currentStudent.addAbsense(document.querySelector("#new-absense").value)
			document.querySelector(`#student${currentStudent.id}`).querySelector(".absenses").textContent = currentStudent.getAbsenses()
			deleteAddAbsensePopUp()
			toggleAll(students)
		})
	})
}
