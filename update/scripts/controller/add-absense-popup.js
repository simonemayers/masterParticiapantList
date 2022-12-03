export function showAddAbsensePopUp() {
	document.querySelector(".add-absense-pop-up").style.display = "block";
}
export function hideAddAbsensePopUp() {
	document.querySelector(".add-absense-pop-up").style.display = "none";
	document.querySelector("#new-absense").selectedIndex = 0;
}
