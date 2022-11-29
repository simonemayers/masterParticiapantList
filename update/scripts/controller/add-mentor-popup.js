export function showAddMentorPopUp() {
	document.querySelector(".add-mentor-pop-up").style.display = "block";
}

export function removeAddMentorPopUp() {
	document.querySelector(".add-mentor-pop-up").style.display = "none";
	document.querySelector("#new-mentor-name").value = "";
}
