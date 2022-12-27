import { renderIdentifierGroup } from "./identifiers"
import { renderNameGroup } from "./fullName"
import { renderProbationGroup } from "./probation"
import { renderMetGroup } from "./met"
import { renderMentorGroup } from "./mentor"
import { renderCapstoneGroup } from "./capstone"
import { renderElectiveGroup } from "./elective"


export function renderDetailsFooter(){
    let footer = document.createElement("div")
    footer.classList.add("side-panel-footer")
    let exitButton = document.createElement("button")
    exitButton.classList.add("btn")
    exitButton.classList.add("btn-danger")
    exitButton.classList.add("btn-lg")
    exitButton.textContent = "Cancel"
    let saveButton = document.createElement("button")
    saveButton.classList.add("btn")
    saveButton.classList.add("btn-success")
    saveButton.classList.add("btn-lg")
    saveButton.textContent = "Save"
    footer.appendChild(exitButton)
    footer.appendChild(saveButton)
    return footer;
}
export function renderDetailsPanel(){
    let detailsPanel = document.createElement("div")
    detailsPanel.classList.add("student-details-panel")
    let identifierGroup = renderIdentifierGroup()
    detailsPanel.appendChild(identifierGroup)
    let nameGroup = renderNameGroup()
    detailsPanel.appendChild(nameGroup)
    let probationGroup = renderProbationGroup()
    detailsPanel.appendChild(probationGroup)
    let metGroup = renderMetGroup()
    detailsPanel.appendChild(metGroup)
    let mentorGroup = renderMentorGroup()
    detailsPanel.appendChild(mentorGroup)
    let capstoneGroup = renderCapstoneGroup()
    detailsPanel.appendChild(capstoneGroup)
    let electiveGroup = renderElectiveGroup()
    detailsPanel.appendChild(electiveGroup)
    return detailsPanel;
}
