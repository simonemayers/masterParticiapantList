// Imports of the classes and functions
import { Student } from "../model/Student.js"


export function findCurrentStudent(e, students){
	return students[parseInt(e.target.closest("tr").children[0].textContent)]
}

export function getAllFilters(){
	let probationCheckbox = document.querySelector("#probation");
	let electiveCheckbox = document.querySelector("#elective");
	let notesCheckbox = document.querySelector("#notes");
	let mentorCheckbox = document.querySelector("#mentor");
	let metCheckbox = document.querySelector("#met");
	let absenseOption = document.querySelector("#absenses");
	let tardyOption = document.querySelector("#tardies");
	let cityOption = document.querySelector("#cities");
	let cohortOption = document.querySelector("#cohorts");
	let electiveOption = document.querySelector("#electives");
	return [probationCheckbox, electiveCheckbox, notesCheckbox, mentorCheckbox, metCheckbox, absenseOption, tardyOption, cityOption, cohortOption, electiveOption]
}

function getAllFilterValues(){
	let filters = getAllFilters()
	let [probationCheckbox, electiveCheckbox, notesCheckbox, mentorCheckbox, metCheckbox, absenseOption, tardyOption, cityOption, cohortOption, electiveOption] = filters
	let probationCheckboxValue = probationCheckbox.checked;
	let electiveCheckboxValue = electiveCheckbox.checked;
	let notesCheckboxValue = notesCheckbox.checked;
	let mentorCheckboxValue = mentorCheckbox.checked;
	let metCheckboxValue = metCheckbox.checked;
	let absenseValue = parseInt(absenseOption[absenseOption.selectedIndex].value)
	let tardyValue = parseInt(tardyOption[tardyOption.selectedIndex].value)
	let cityValue = cityOption[cityOption.selectedIndex].value
	let cohortValue = cohortOption[cohortOption.selectedIndex].value
	let electiveValue = electiveOption[electiveOption.selectedIndex].value
	return [probationCheckboxValue, electiveCheckboxValue, notesCheckboxValue, mentorCheckboxValue, metCheckboxValue, absenseValue, tardyValue, cityValue, cohortValue, electiveValue]
}


function isUserNameUnique(user, students) {
	let userNames = [];
	let answer;
	if (students.length != 0) {
		students.forEach((student) => {
			userNames.push(student.userName)
			if (userNames.includes(user)) {
				answer = false;
			} else {
				answer = true;
			}
		});
	} else {
		answer = true
	}
	return answer;
}
let userNameN = 1;


export function takeNewParticipantInput(students){
	let newFirstName = document.querySelector("#new-first-name").value;
	let newLastName = document.querySelector("#new-last-name").value;
	let newCohort = document.querySelector("#new-cohort").value;
	let newCity = document.querySelector("#new-city").value;
	let userName = `${newFirstName.toLowerCase()}${newLastName.toLowerCase()}`;
	if (!isUserNameUnique(userName, students)) {
		userNameN++;
		userName += userNameN;
	}
	let newStudent = new Student(userName, newFirstName, newLastName);
	newStudent.addCity(newCity);
	newStudent.addCohort(newCohort);
	return newStudent;
}


function getVisibleDOMStudents(){
	return Array.from(document.querySelector("tbody").childNodes).filter(s => s.style.display === "table-row" || s.style.display === "")
}

function getProbationMatches(matches, value){
	return matches.filter(s => Boolean(s.getIsOnProbation()) === value)
}
function getHasElectiveMatches(matches, value){
	return matches.filter(s => Boolean(s.getElective()) === value)
}
function getNotesMatches(matches, value){
	return matches.filter(s => Boolean(s.getNotes()) === value)
}
function getMentorMatches(matches, value){
	return matches.filter(s => Boolean(s.getMentor()) === value)
}
function getMetMatches(matches, value){
	return matches.filter(s => Boolean(s.getHasMetWithStaff()) === value)
}
function getAbsenseMatches(matches, value){
	if(value === 0){
		matches = matches.filter(s => s.getAbsenses() === 0)
	} else if(value>0){
		for(let i=1; i<=10; i++){
			if(value === i){
				matches = matches.filter(s => s.getAbsenses() >= i)
			}
		}
	}
	return matches
}
function getTardyMatches(matches, value){
	if(value === 0){
		matches = matches.filter(s => s.getTardies() === 0)
	} else if(value>0){
		for(let i=1; i<=10; i++){
			if(value === i){
				matches = matches.filter(s => s.getTardies() >= i)
			}
		}
	}
	return matches
}
function getCityMatches(matches, value){
	if(value === "charlotte"){
		matches = matches.filter(s => s.getCity() === "charlotte")
	} else if(value === "raleigh"){
		matches = matches.filter(s => s.getCity() === "raleigh")
	} else if(value === "wilmington"){
		matches = matches.filter(s => s.getCity() === "wilmington")
	} else if(value === "detroit"){
		matches = matches.filter(s => s.getCity() === "detroit")
	} else if(value === "minneapolis"){
		matches = matches.filter(s => s.getCity() === "minneapolis")
	} else if(value === "dallas"){
		matches = matches.filter(s => s.getCity() === "dallas")
	} else if(value === "atlanta"){
		matches = matches.filter(s => s.getCity() === "atlanta")
	}
	return matches
}
function getCohortMatches(matches, value){
	if(value === "c5"){
		matches = matches.filter(s => s.getCohort() === "c5")
	} else if(value === "c4"){
		matches = matches.filter(s => s.getCohort() === "c4")
	}
	return matches;
}
function getElectiveMatches(matches, value){
	if(value === "js"){
		matches = matches.filter(s => s.getElective() === "javascript")
	} else if(value === "da"){
		matches = matches.filter(s => s.getElective() === "analytics")
	} else if(value === "cs"){
		matches = matches.filter(s => s.getElective() === "cyber")
	} else if(value === "pm"){
		matches = matches.filter(s => s.getElective() === "manager")
	}
	return matches;
}
function getAllMatches(filters, matches){
	let filterValues = getAllFilterValues()
	let [probationCheckboxValue, electiveCheckboxValue, notesCheckboxValue, mentorCheckboxValue, metCheckboxValue, absenseValue, tardyValue, cityValue, cohortValue, electiveValue] = filterValues
	filters.map(c => {
		switch(c){
			case "probation":
				matches = getProbationMatches(matches, probationCheckboxValue)
				break;
			case "elective":
				matches = getHasElectiveMatches(matches, electiveCheckboxValue)
				break;
			case "notes":
				matches = getNotesMatches(matches, notesCheckboxValue)
				break;
			case "mentor":
				matches = getMentorMatches(matches, mentorCheckboxValue)
				break;
			case "met":
				matches = getMetMatches(matches, metCheckboxValue)
				break;
			case "absenses":
				matches = getAbsenseMatches(matches, absenseValue)
				break;
			case "tardies":
				matches = getTardyMatches(matches, tardyValue)
				break;
			case "cities":
				matches = getCityMatches(matches, cityValue)
				break;
			case "cohorts":
				matches = getCohortMatches(matches, cohortValue)
				break;
			case "electives":
				matches = getElectiveMatches(matches, electiveValue)
				break;
			default:
				break;
		}
	})
	return matches
}

export function toggleAll(students){
	let visibleDOMStudents = getVisibleDOMStudents()
	let filters = getAllFilters()
	let [probationCheckbox, electiveCheckbox, notesCheckbox, mentorCheckbox, metCheckbox, absenseOption, tardyOption, cityOption, cohortOption, electiveOption] = filters
	let checkBoxes = [probationCheckbox, electiveCheckbox, notesCheckbox, mentorCheckbox, metCheckbox]
	let options = [absenseOption, tardyOption, cityOption, cohortOption, electiveOption]
	let whatIsChecked = checkBoxes.filter(c => c.checked ===true).map(i => i.id);
	let whatIsSelected = options.filter(o => o[o.selectedIndex].value != -1).map(i => i.id)
	let selectedFilters = [...whatIsChecked, ...whatIsSelected]
	let allDOMStudents = Array.from(document.querySelector("tbody").childNodes)
	let comboFiltered = students;

	comboFiltered = getAllMatches(selectedFilters, comboFiltered)

	allDOMStudents.map(s => {
		s.style.display = "table-row"
	})

	visibleDOMStudents = getVisibleDOMStudents()
	comboFiltered = comboFiltered.map(s => s.id)

	visibleDOMStudents.map(s => {
		let id = parseInt(s.id.slice(-1))
		if(!comboFiltered.includes(id)){
			s.style.display = "none"
		}
	})
	comboFiltered = []
}


