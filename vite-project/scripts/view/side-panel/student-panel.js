import { renderDetailsPanel } from "./details/student-details-panel"
import { renderDetailsFooter } from "./details/student-details-panel"

function renderSidePanelBox(){
    let bodyContainer = document.querySelector(".body-container")
    let sidePanel = document.createElement("div")
    sidePanel.classList.add("side-panel")
    bodyContainer.appendChild(sidePanel)
    return sidePanel
}
function renderSidePanelContainer(){
    let sidePanel = renderSidePanelBox()
    let sidePanelContainer = document.createElement("div")
    sidePanelContainer.classList.add("side-panel-container")
    sidePanel.appendChild(sidePanelContainer)
    return sidePanelContainer
}

function renderPanelButtons(){
    let panels = document.createElement("div")
    panels.classList.add("panels")
    let detailsButton = document.createElement("button")
    detailsButton.classList.add("details-panel")
    detailsButton.classList.add("btn")
    detailsButton.classList.add("active-panel")
    detailsButton.textContent = "Details"
    let notesButton = document.createElement("button")
    notesButton.classList.add("notes-panel")
    notesButton.classList.add("btn")
    notesButton.textContent = "Notes"
    panels.appendChild(detailsButton)
    panels.appendChild(notesButton)
    return panels
}

// add a conditional here to choose between details and notes
export function renderSidePanel(){
    let detailsPanel = renderDetailsPanel()
    let panels = renderPanelButtons()
    let sidePanelContainer = renderSidePanelContainer()
    sidePanelContainer.appendChild(panels)
    sidePanelContainer.appendChild(detailsPanel)
    let footer = renderDetailsFooter()
    sidePanelContainer.appendChild(footer)
    let sidePanel = sidePanelContainer.parentElement
    return sidePanel
}
