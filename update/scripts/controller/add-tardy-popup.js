export function showAddTardyPopUp() {
	document.querySelector(".add-tardy-pop-up").style.display = "block";
}

export function hideAddTardyPopUp() {
	document.querySelector(".add-tardy-pop-up").style.display = "none";
	document.querySelector("#new-tardy").selectedIndex = 0;
}
