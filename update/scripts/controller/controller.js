// Broke up the 

export function showAddCapstonePopUp() {
	document.querySelector(".add-capstone-pop-up").style.display = "block";
}

export function removeAddCapstonePopUp() {
	document.querySelector(".add-capstone-pop-up").style.display = "none";
	document.querySelector("#new-capstone-name").value = "";
	document.querySelector("#new-structure").selectedIndex = 0;
}

export function showAddElectivePopUp() {
	document.querySelector(".add-elective-pop-up").style.display = "block";
}
export function removeAddElectivePopUp() {
	document.querySelector(".add-elective-pop-up").style.display = "none";
	document.querySelector("#new-elective").selectedIndex = 0;
}

export function showAddTardyPopUp() {
	document.querySelector(".add-tardy-pop-up").style.display = "block";
}

export function removeAddTardyPopUp() {
	document.querySelector(".add-tardy-pop-up").style.display = "none";
	document.querySelector("#new-tardy").selectedIndex = 0;
}

export function showAddAbsensePopUp() {
	document.querySelector(".add-absense-pop-up").style.display = "block";
}
export function removeAddAbsensePopUp() {
	document.querySelector(".add-absense-pop-up").style.display = "none";
	document.querySelector("#new-absense").selectedIndex = 0;
}

export function showAddNotePopUp() {
	document.querySelector(".add-note-pop-up").style.display = "block";
}
export function removeAddNotePopUp() {
	document.querySelector(".add-note-pop-up").style.display = "none";
	document.querySelector("#new-note-name").value = "";
	document.querySelector("#new-note").value = "";
}