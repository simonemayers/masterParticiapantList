let students = [];
let capstoneProjects = [];
let absenses = [];
let tardies = [];

class Student{
    constructor(userName, firstName, lastName, absenses, tardies, capstoneProject, notes){
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.absenses = [];
        this.tardies = [];
        this.capstoneProject = capstoneProject;
        students.push(this)
        this.id = students.length-1;
        this.notes = [];
    }
    getFullName(){
        return `${this.firstName} ${this.lastName}`
    }
    addAbsense(reason){
        let newAbsense = new Absense(reason, this);
        this.absenses.push(newAbsense);
        newAbsense.id = this.absenses.length;
        absenses.push(newAbsense);
        return this.absenses;
    }
    getAbsenses(){
        return this.absenses.length
    }
    addTardy(reason){
        let newTardy = new Tardy(reason, this);
        this.tardies.push(newTardy);
        newTardy.id = this.tardies.length;
        tardies.push(newTardy);
        return this.tardies;
    }
    getTardies(){
        return this.tardies.length;
    }
    addCapstone(title, isGroup){
        this.capstoneProject = new Capstone(title, isGroup, this);
    }
    changeCapstoneTitle(title){
        this.capstoneProject.title = title;
    }
    changeCapstoneGroup(isGroup){
        this.capstoneProject.isGroup = isGroup;
    }
    getCapstone(){
        return this.capstoneProject;
    }
    addNote(title, description){
        let newNote = new Note(title, description, this)
        this.notes.push(newNote)
    }
    getNotes(){
        let notesString = ""
        this.notes.forEach(note => {
            notesString += note.description + '<br>'
        })
        return notesString
    }
    addMentor(name){
        this.mentor = name;
    }
    getMentor(){
        return this.mentor
    }
    addElective(elective){
        this.elective = elective;
    }
    getElective(){
        return this.elective
    }
    addCity(city){
        this.city = city;
    }
    getCity(){
        return this.city
    }
    addCohort(cohort){
        this.cohort = cohort;
    }
    getCohort(){
        return this.cohort
    }
}

class Absense{
    constructor(reason, student){
        this.reason = reason;
        this.student = student.userName;
        this.id = student.getAbsenses();
    }
}

class Tardy{
    constructor(reason, student){
        this.reason = reason;
        this.student = student.userName;
        this.id = student.getTardies();
    }
}

class Capstone{
    constructor(title, isGroup, student){
        this.title = title;
        this.isGroup = isGroup;
        this.student = student
        capstoneProjects.push(this)
        this.id = capstoneProjects.length
    }
    changeTitle(title){
        this.title = title;
    }
    changeGroup(isGroup){
        this.isGroup = isGroup;
    }
}

class Note{
    constructor(title, description, student){
        this.title = title;
        this.description = description;
        this.student = student.userName;
    }
}

let list = document.querySelector('.participant-list tbody')
function addStudentRow(){
    let newRow = document.createElement('tr');
    list.appendChild(newRow);
    return newRow;
}

function addStudentId(student){
    let idTd = document.createElement('td');
    idTd.textContent = `${student.id}`;
    idTd.classList.add("id");
    return idTd;
}

function addStudentName(student){
    let nameTd = document.createElement('td')
    nameTd.textContent = student.getFullName()
    nameTd.classList.add("name")
    return nameTd;
}

function addStudentAbsenses(student){
    let absensesTd = document.createElement('td')
    absensesTd.textContent = student.getAbsenses()
    absensesTd.classList.add("absenses")
    return absensesTd;
}

function addStudentTardies(student){
    let tardiesTd = document.createElement('td')
    tardiesTd.textContent = student.getTardies()
    tardiesTd.classList.add("tardies")
    return tardiesTd;
}
function addStudentNotes(student){
    let notesTd = document.createElement('td')
    notesTd.innerHTML = student.getNotes()
    notesTd.classList.add("notes")
    return notesTd;
}
function showAddMentorPopUp(){
    document.querySelector(".add-mentor-pop-up").style.display = "block"
}
function removeAddMentorPopUp(){
    document.querySelector(".add-mentor-pop-up").style.display = "none"
    document.querySelector("#new-mentor-name").value = ""
}

function addStudentActions(student){
    let actionTd = document.createElement('td')
    actionTd.classList.add("actions")
    return actionTd;
}

function createStudentMentorButton() {
	let button = document.createElement("button");
	button.classList.add("btn");
	button.classList.add("mentor-btn");
	button.innerHTML = '<i class="bi bi-person-plus-fill"></i>';
    return button;
}

function addStudentMentorButton(){
    let mentorButton = createStudentMentorButton();
    let i, currentStudent, mentorName

    mentorButton.addEventListener("click", (e) => {
        i = parseInt(e.target.closest("tr").children[0].textContent);
        currentStudent = students.find((student) => student.id === i);
        mentorName = currentStudent.getMentor();
        showAddMentorPopUp()

        console.log(currentStudent)

        if(mentorName){
            document.querySelector("#new-mentor-name").value = mentorName
            console.log("has mentor")
        } else{
            console.log("does not have mentor")
        }
    })

    document.querySelector("#new-mentor-name").addEventListener("change", (e) => {
        mentorName = document.querySelector("#new-mentor-name").value
    })

    mentorPopUp = document.querySelector(".add-mentor-pop-up")
    let exitButton = mentorPopUp.querySelector(".exit-pop-up-button")
    exitButton.addEventListener("click", removeAddMentorPopUp)

    let submitButton = document.querySelector(".add-mentor-button")
    submitButton.addEventListener("click", (e) =>{
        currentStudent.addMentor(mentorName)
        removeAddMentorPopUp()
    })
    return mentorButton
}

function showNewParticipantPopUp(){
    document.querySelector(".new-participant-pop-up").style.display = "block"
}
function removeNewParticipantPopUp(){
    document.querySelector(".new-participant-pop-up").style.display = "none"
    document.querySelector("#new-first-name").value = ""
    document.querySelector("#new-last-name").value = ""
    document.querySelector("#new-cohort").selectedIndex = 0
    document.querySelector("#new-city").selectedIndex = 0
}

function createNewStudent(){
    let student = students[students.length-1]
    let newRow = addStudentRow()
    newRow.classList.add("student-row")
    let idTd = addStudentId(student)
    let nameTd = addStudentName(student)
    let absensesTd = addStudentAbsenses(student)
    let tardiesTd = addStudentTardies(student)
    let notesTd = addStudentNotes(student)
    let actionTd = addStudentActions(student)
    let mentorButton = addStudentMentorButton()
    newRow.id = `student${idTd.textContent}`;
    newRow.appendChild(idTd)
    newRow.appendChild(nameTd)
    newRow.appendChild(absensesTd)
    newRow.appendChild(tardiesTd)
    newRow.appendChild(notesTd)
    newRow.appendChild(actionTd)
    actionTd.appendChild(mentorButton)
}

var show = true;
function showCheckboxes() {
    var checkboxes =
        document.getElementById("checkBoxes");

    if (show) {
        checkboxes.style.display = "flex";
        show = false;
    } else {
        checkboxes.style.display = "none";
        show = true;
    }
}

function isUserNameUnique(user){
    let userNames = []
    let answer;
    if(students.length !=0){
        students.forEach(student => {
            if(userNames.includes(user)){
                answer = false
            }
            else{
                answer = true;
            }
            userNames.push(student.userName)
        })
    }
    return answer
}

let newParticipantButton = document.querySelector("#add-new-participant")
let exitButton = document.querySelector(".exit-pop-up-button")
let submitButton = document.querySelector(".new-participant-button")
let userNameN = 1;

newParticipantButton.addEventListener("click", showNewParticipantPopUp)
exitButton.addEventListener("click", removeNewParticipantPopUp)


function showAddCapstonePopUp(){
    document.querySelector(".add-capstone-pop-up").style.display = "block"
}
function removeAddCapstonePopUp(){
    document.querySelector(".add-capstone-pop-up").style.display = "none"
    document.querySelector("#new-capstone-name").value = ""
    document.querySelector("#new-structure").selectedIndex = 0
}
function addStudentCapstoneButton(){
    let capstoneButtons = document.querySelectorAll(".capstone-btn")
    capstoneButtons.forEach(capstoneButton => {
        let i= capstoneButton.parentElement.parentElement.querySelector(".id").textContent;
        let capstoneName =""
        let isGroup = true
        if(students[i].capstoneProject){
            capstoneName = students[i].capstoneProject.title
            isGroup = students[i].capstoneProject.isGroup
        }
        capstoneButton.addEventListener("click", (e) => {
            showAddCapstonePopUp()
            document.querySelector("#new-capstone-name").value = capstoneName
            if(isGroup){
                document.querySelector("#new-structure").selectedIndex = 0
            } else{
                document.querySelector("#new-structure").selectedIndex = 1
            }
        })
        document.querySelector("#new-capstone-name").addEventListener("change", (e) => {
            capstoneName = document.querySelector("#new-capstone-name").value
        })
        document.querySelector("#new-structure").addEventListener("change", (e) => {
            isGroup = (document.querySelector("#new-structure")[document.querySelector("#new-structure").selectedIndex].value == 'true')
        })
        capstonePopUp = document.querySelector(".add-capstone-pop-up")
        let exitButton = capstonePopUp.querySelector(".exit-pop-up-button")
        exitButton.addEventListener("click", removeAddCapstonePopUp)
        let submitButton = document.querySelector(".add-capstone-button")

        submitButton.addEventListener("click", (e) =>{
            students[i].addCapstone(capstoneName, isGroup)
            removeAddCapstonePopUp()
        })
    })
}

function showAddElectivePopUp(){
    document.querySelector(".add-elective-pop-up").style.display = "block"
}
function removeAddElectivePopUp(){
    document.querySelector(".add-elective-pop-up").style.display = "none"
    document.querySelector("#new-elective").selectedIndex = 0
}

function addStudentElectiveButton(){
    let electiveButtons = document.querySelectorAll(".elective-btn")
    electiveButtons.forEach(electiveButton => {
        let i= electiveButton.parentElement.parentElement.querySelector(".id").textContent;
        let electiveName =""

        electiveButton.addEventListener("click", (e) => {
            showAddElectivePopUp()
            if(students[i].elective){
                electiveName = students[i].elective;
                document.querySelector("#new-elective").value = electiveName
            } else{
                electiveName = document.querySelector("#new-elective")[document.querySelector("#new-elective").selectedIndex].value
            }
        })
        document.querySelector("#new-elective").addEventListener("change", (e) => {
            electiveName = document.querySelector("#new-elective").value
        })
        electivePopUp = document.querySelector(".add-elective-pop-up")
        let exitButton = electivePopUp.querySelector(".exit-pop-up-button")
        exitButton.addEventListener("click", removeAddElectivePopUp)

        let submitButton = document.querySelector(".add-elective-button")
        submitButton.addEventListener("click", (e) =>{
            students[i].addElective(electiveName)
            removeAddElectivePopUp()
        })
    })
}

function showAddTardyPopUp(){
    document.querySelector(".add-tardy-pop-up").style.display = "block"
}
function removeAddTardyPopUp(){
    document.querySelector(".add-tardy-pop-up").style.display = "none"
    document.querySelector("#new-tardy").selectedIndex = 0
}
function addStudentTardyButton(){
    let tardyButtons = document.querySelectorAll(".tardy-btn")
    tardyButtons.forEach(tardyButton => {
        let i= tardyButton.parentElement.parentElement.querySelector(".id").textContent;
        let tardyName =document.querySelector("#new-tardy").value

        tardyButton.addEventListener("click", showAddTardyPopUp)
        document.querySelector("#new-tardy").addEventListener("change", (e) => {
            tardyName = document.querySelector("#new-tardy").value
        })
        tardyPopUp = document.querySelector(".add-tardy-pop-up")
        let exitButton = tardyPopUp.querySelector(".exit-pop-up-button")
        exitButton.addEventListener("click", removeAddTardyPopUp)

        let submitButton = document.querySelector(".add-tardy-button")
        submitButton.addEventListener("click", (e) =>{
            students[i].addTardy(tardyName)
            tardyButton.parentElement.parentElement.querySelector(".tardies").textContent = students[i].tardies.length
            removeAddTardyPopUp()
        })
    })
}

function showAddAbsensePopUp(){
    document.querySelector(".add-absense-pop-up").style.display = "block"
}
function removeAddAbsensePopUp(){
    document.querySelector(".add-absense-pop-up").style.display = "none"
    document.querySelector("#new-absense").selectedIndex = 0
}
function addStudentAbsenseButton(){
    let absenseButtons = document.querySelectorAll(".absense-btn")
    absenseButtons.forEach(absenseButton => {
        let i= absenseButton.parentElement.parentElement.querySelector(".id").textContent;
        let absenseName =document.querySelector("#new-absense").value
        absenseButton.addEventListener("click", showAddAbsensePopUp)
        document.querySelector("#new-absense").addEventListener("change", (e) => {
            absenseName = document.querySelector("#new-absense").value
        })
        absensePopUp = document.querySelector(".add-absense-pop-up")
        let exitButton = absensePopUp.querySelector(".exit-pop-up-button")
        exitButton.addEventListener("click", removeAddAbsensePopUp)

        let submitButton = document.querySelector(".add-absense-button")
        submitButton.addEventListener("click", (e) =>{
            students[i].addAbsense(absenseName)
            absenseButton.parentElement.parentElement.querySelector(".absenses").textContent = students[i].absenses.length
            removeAddAbsensePopUp()
        })
    })
}

function showAddNotePopUp(){
    document.querySelector(".add-note-pop-up").style.display = "block"
}
function removeAddNotePopUp(){
    document.querySelector(".add-note-pop-up").style.display = "none"
    document.querySelector("#new-note-name").value = ""
    document.querySelector("#new-note").value = ""
}
function addStudentNoteButton(){
    let noteButtons = document.querySelectorAll(".note-btn")
    noteButtons.forEach(noteButton => {
        let i= noteButton.parentElement.parentElement.querySelector(".id").textContent;
        let noteTitle =document.querySelector("#new-note-name").value
        let note = document.querySelector("#new-note").value
        let student;

        noteButton.addEventListener("click", (e) => {
            if(Array.from(e.target.classList).includes("bi")){
                student = e.target.parentElement.parentElement.parentElement.id
            }else{
                student = e.target.parentElement.parentElement.id
            }
            showAddNotePopUp()
        })
        document.querySelector("#new-note-name").addEventListener("change", (e) => {
            noteTitle =document.querySelector("#new-note-name").value
        })
        document.querySelector("#new-note").addEventListener("change", (e) => {
            note =document.querySelector("#new-note").value
        })
        notePopUp = document.querySelector(".add-note-pop-up")
        let exitButton = notePopUp.querySelector(".exit-pop-up-button")
        exitButton.addEventListener("click", removeAddNotePopUp)

        let submitButton = document.querySelector(".add-note-button")
        submitButton.addEventListener("click", (e) =>{
            students[i].addNote(noteTitle, note)
            removeAddNotePopUp()
            document.querySelector(`#${student}`).querySelector(".notes").innerHTML += `${note} <br>`
        })
    })
}



submitButton.addEventListener("click", (e)=> {
    let newFirstName = document.querySelector("#new-first-name").value
    let newLastName = document.querySelector("#new-last-name").value
    let newCohort = document.querySelector("#new-cohort").value
    let newCity = document.querySelector("#new-city").value
    let userName = `${newFirstName.toLowerCase()}${newLastName.toLowerCase()}`
    let newStudent = new Student(userName, newFirstName, newLastName)
    if(!isUserNameUnique(userName)){
        userNameN++
        userName += userNameN
    }
    createNewStudent()
    newStudent.addCity(newCity)
    newStudent.addCohort(newCohort)
    removeNewParticipantPopUp()

    addStudentCapstoneButton()
    // addStudentMentorButton()
    addStudentElectiveButton()
    addStudentTardyButton()
    addStudentAbsenseButton()
    addStudentNoteButton()
})


let absensesDropDown = document.querySelector("#absenses")
absensesDropDown.addEventListener("change", (e)=> {
    let selectedAbsenses = e.target[e.target.selectedIndex].value
    students.forEach(student => {
        if(student.getAbsenses() == selectedAbsenses){
            document.querySelector(`#student${student.id}`).style.display = "table-row"
        }
        else{
            document.querySelector(`#student${student.id}`).style.display = "none"
        }
    })
})

let tardiesDropDown = document.querySelector("#tardies")
tardiesDropDown.addEventListener("change", (e)=> {
    let selectedTardies = e.target[e.target.selectedIndex].value
    students.forEach(student => {
        if(student.getTardies() == selectedTardies){
            document.querySelector(`#student${student.id}`).style.display = "table-row"
        }
        else{
            document.querySelector(`#student${student.id}`).style.display = "none"
        }
    })
})




