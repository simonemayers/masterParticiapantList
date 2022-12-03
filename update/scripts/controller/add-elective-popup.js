export function showAddElectivePopUp() {
	document.querySelector(".add-elective-pop-up").style.display = "block";
}
export function hideAddElectivePopUp() {
	document.querySelector(".add-elective-pop-up").style.display = "none";
	document.querySelector("#new-elective").selectedIndex = 0;
}
