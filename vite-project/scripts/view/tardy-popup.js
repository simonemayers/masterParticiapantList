import { disableAllButtons } from "../controller/disbleButtons"
import { enableAllButtons } from "../controller/enableButtons"

export function renderAddTardyPopUp(){
	let bodyContainer = document.querySelector(".body-container")
	let popup = document.createElement("div")
	popup.classList.add("add-tardy-pop-up")
	let exitButton = document.createElement("button")
	exitButton.classList.add("exit-pop-up-button")
	exitButton.classList.add("btn")
	exitButton.textContent = "x"
	let header = document.createElement("h3")
	header.classList.add("pop-up-title")
	header.textContent = "Add Tardy"
	let form = document.createElement("form")
	form.classList.add("form")
	let inputGroup = document.createElement("div")
	inputGroup.classList.add("input-group")
	let label = document.createElement("label")
	label.htmlFor = "new-tardy"
	label.classList.add("input-group-text")
	label.textContent = "Type"
	let select = document.createElement("select")
	select.id = "new-tardy"
	select.classList.add("form-select")
	let excusedOption = document.createElement("option")
	excusedOption.value = "excused"
	excusedOption.textContent = "Excused"
	let unexcusedOption = document.createElement("option")
	unexcusedOption.value = "unexcused"
	unexcusedOption.textContent = "Unexcused"
	let submitButton = document.createElement("button")
	submitButton.classList.add("btn")
	submitButton.classList.add("btn-success")
	submitButton.classList.add("add-tardy-button")
	submitButton.type = "button"
	submitButton.textContent = "Submit"

	bodyContainer.appendChild(popup)
	popup.appendChild(exitButton)
	popup.appendChild(header)
	popup.appendChild(form)
	form.appendChild(inputGroup)
	inputGroup.appendChild(label)
	inputGroup.appendChild(select)
	select.appendChild(excusedOption)
	select.appendChild(unexcusedOption)
	form.appendChild(submitButton)
	disableAllButtons()
}

export function deleteAddTardyPopUp(){
	let tardyPopUp = document.querySelector(".add-tardy-pop-up")
	tardyPopUp.parentElement.removeChild(tardyPopUp)
	enableAllButtons()
}
