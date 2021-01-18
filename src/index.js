import { dateToday } from './helpers/dateToday'
import { AppData } from './scripts/AppData'
import { AppDOM } from './scripts/AppDOM'
import { AppForms } from './scripts/AppForms'
import { Project } from './scripts/Project'
import { Task } from './scripts/Task'
import { emptyDashboard } from './components/emptyDashboard'
import { header, sidebar, dashboard, addTaskForm } from './helpers/domNodes'
import './styles/styles.scss'

AppForms.createProjectForm()

AppForms.createTaskForm(addTaskForm.form, 'add')

if (document.body.offsetWidth > 900) {
  AppDOM.unhide(sidebar.sidebar, 'closed')
  AppDOM.unhide(dashboard.dashboard, 'closed')
}

header.toggler.onclick = () => {
  AppDOM.toggleHide(sidebar.sidebar, 'closed')
  AppDOM.toggleHide(dashboard.dashboard, 'closed')
}

header.home.onclick = () => {
  AppDOM.addAllProjectsToDashboard()
  AppDOM.activeProject()
  AppDOM.hide(addTaskForm.toggler)
  AppDOM.hide(addTaskForm.container)
}

addTaskForm.toggler.onclick = () => {
  AppDOM.unhide(addTaskForm.container)
  AppDOM.scrollToBottom()
  AppDOM.hide(addTaskForm.toggler)
}

addTaskForm.cancel.onclick = () => {
  AppDOM.unhide(addTaskForm.toggler)
  AppDOM.hide(addTaskForm.container)
}

addTaskForm.date.value = dateToday
addTaskForm.date.min = dateToday

if (!localStorage.getItem('AppData')) {
  const firstList = new Project('Web Development')
  firstList.create()
  firstList.addTask(new Task('Clone repo', 'Clone project repo', 'Important'))
  firstList.addTask(
    new Task('Commit changes', 'Commit changes for project', 'None')
  )
  const secondList = new Project('House Chores')
  secondList.create()
  secondList.addTask(
    new Task('Take out trash', 'Clean out the trash', 'Urgent')
  )
  secondList.addTask(
    new Task('Vacuum the living room', 'Living room is not clean', 'Important')
  )
}

AppDOM.addProjectToSidebar()

AppData.projects[0]
  ? AppDOM.addAllProjectsToDashboard()
  : dashboard.project.appendChild(emptyDashboard)
