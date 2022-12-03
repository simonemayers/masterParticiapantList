export function showAddNotePopUp() {
	document.querySelector(".add-note-pop-up").style.display = "block";
}
export function hideAddNotePopUp() {
	document.querySelector(".add-note-pop-up").style.display = "none";
	document.querySelector("#new-note-name").value = "";
	document.querySelector("#new-note").value = "";
}
