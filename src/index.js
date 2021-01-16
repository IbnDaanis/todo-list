import './styles/styles.scss'
import { stringToHTML } from './helpers/stringToHTML'
import { dateToday } from './helpers/dateToday'
import { taskItem } from './components/taskItem'
import { format } from 'date-fns'
import { AppData } from './AppData'
import { Project } from './Project'
import { Task } from './Task'

import {
  header,
  sidebar,
  dashboard,
  addProjectForm,
  addTaskForm,
} from './helpers/domNodes'

const AppDOM = (() => {
  const hide = (element, closed) => {
    element.classList.add(closed ? closed : 'hide')
  }
  const unhide = (element, closed) => {
    element.classList.remove(closed ? closed : 'hide')
  }
  const toggleHide = (element, closed) => {
    element.classList.toggle(closed ? closed : 'hide')
  }

  const addProjectToSidebar = (deleting = false) => {
    sidebar.projectTitles.innerHTML = ''
    console.log('AppData.projects: ', AppData.projects)
    AppData.projects.forEach(project => {
      let html = `<span id=title${project.id}>${project.title}</span><button id=delete${project.id}>X</button>`
      const projectEl = stringToHTML(`${html}`, 'li')

      projectEl.onclick = e => {
        if (e.target.id === `title${project.id}`) {
          console.log('AppDOM: ', project.id)
          AppDOM.addProjectToDashboard(project)
        } else if (e.target.id === `delete${project.id}`) {
          console.log('DELETE: ', project.id)
          AppData.removeProject(project)
          addProjectToSidebar(true)
        }
      }
      sidebar.projectTitles.appendChild(projectEl)
    })
    if (deleting) {
      if (!AppData.projects.length) {
        console.log('Else')
        dashboard.project.innerHTML = `<h1 class='empty'>Add a project in the menu on the left!</h1>`
        AppDOM.hide(addTaskForm.toggler)
      } else {
        console.log(AppData.projects.length)
        AppDOM.addProjectToDashboard(AppData.projects[0])
      }
    }
  }

  const addProjectsToTaskForm = currentProject => {
    let projectSelection = ``
    AppData.projects.forEach(project => {
      projectSelection += `<option value="${project.title}"
      ${currentProject.title === project.title && 'selected="selected"'}
      >${project.title}</option>`
    })

    addTaskForm.projects.innerHTML = projectSelection
  }

  const activeProject = current => {
    if (!current) {
      projectTitles
        .querySelectorAll('li')
        .forEach(project => project.classList.remove('active'))
      return
    }
    projectTitles.querySelectorAll('li').forEach(project => {
      if (project.firstChild.id.slice(5) === current.id) {
        project.classList.add('active')
      } else {
        project.classList.remove('active')
      }
    })
  }
  const addProjectToDashboard = current => {
    if (document.body.offsetWidth < 800) {
      AppDOM.hide(sidebar.sidebar, 'closed')
      AppDOM.hide(dashboard.dashboard, 'closed')
    }
    dashboard.project.innerHTML = ''
    const projectEl = stringToHTML(`<h1>${current.title}</h1>`, 'div')
    projectEl.classList.add(`${current.id}`)
    projectEl.classList.add('project-items')
    unhide(addTaskForm.toggler)
    projectEl.appendChild(addTaskToDashboard(current))
    dashboard.project.appendChild(projectEl)
    addProjectsToTaskForm(current)
    activeProject(current)
  }

  const addAllProjectsToDashboard = () => {
    dashboard.project.innerHTML = '<h1>All Projects<h1>'
    AppData.projects.forEach(project => {
      const projectEl = stringToHTML(`<h2>${project.title}</h2>`, 'div')
      projectEl.classList.add('all-project-items')
      if (project.tasks.length > 0) {
        projectEl.appendChild(addTaskToDashboard(project))
        projectEl
          .querySelectorAll('button')
          .forEach(btn => btn.classList.add('hide'))
      } else {
        projectEl.appendChild(
          stringToHTML(`<h3>No tasks for this project</h3>`, 'div')
        )
      }
      dashboard.project.appendChild(projectEl)
    })
  }

  const addTaskToDashboard = current => {
    const currentTask = stringToHTML(``, 'ul')
    currentTask.classList.add('task-list')
    current.tasks.forEach(task => {
      const currentTaskItem = taskItem(task, AppDOM, current, AppData.projects)
      currentTask.appendChild(currentTaskItem)
      currentTaskItem.querySelector('h3').onclick = () => {
        toggleHide(currentTaskItem.querySelector('.add-task-form'))
      }
      AppForms.createTaskForm(currentTaskItem, task, current, 'edit')
    })
    return currentTask
  }

  const scrollToBottom = (more = 0) => {
    dashboard.dashboard.scrollTop = dashboard.dashboard.scrollHeight + more
  }

  return {
    hide,
    unhide,
    toggleHide,
    activeProject,
    scrollToBottom,
    addProjectToSidebar,
    addProjectToDashboard,
    addAllProjectsToDashboard,
  }
})()

const AppForms = (() => {
  const createProjectForm = () => {
    addProjectForm.form.onsubmit = e => {
      e.preventDefault()
      const newProject = new Project(addProjectForm.input.value)
      newProject.create()
      AppDOM.addProjectToSidebar()
      AppDOM.addProjectToDashboard(newProject)
      addProjectForm.input.value = ''
    }
  }
  const createTaskForm = (form, task, currProject, type) => {
    form.onsubmit = e => {
      e.preventDefault()
      console.log('CREATE')
      if (type === 'add') {
        const formInput = {
          title: form.querySelector(`#title`),
          description: form.querySelector(`#description`),
          priority: form.querySelector(`#priority`),
          date: form.querySelector(`#date`),
          projects: form.querySelector(`#projects`),
        }
        const { title, description, priority, date, projects } = formInput
        console.log('add')
        const selectedProject = AppData.projects.filter(
          currItem => currItem.title === projects.value
        )
        selectedProject[0].addTask(
          new Task(title.value, description.value, priority.value, date.value)
        )
        title.value = ''
        description.value = ''
        priority.firstChild.nextSibling.selected = true
        date.value = format(new Date(), 'yyyy-MM-dd')
        AppDOM.addProjectToDashboard(selectedProject[0])
        AppDOM.scrollToBottom()
      } else if (type === 'edit') {
        console.log('EDIT')
        const formInput = {
          title: form.querySelector(`#title${task.id}`),
          description: form.querySelector(`#description${task.id}`),
          priority: form.querySelector(`#priority${task.id}`),
          date: form.querySelector(`#date${task.id}`),
          projects: form.querySelector(`#projects${task.id}`),
        }
        const { title, description, priority, date } = formInput
        task.edit(title.value, description.value, priority.value, date.value)
        AppDOM.addProjectToDashboard(currProject)
        title.value = ''
        description.value = ''
        priority.firstChild.nextSibling.selected = true
        date.value = format(new Date(), 'yyyy-MM-dd')
      }
    }
  }

  return {
    createProjectForm,
    createTaskForm,
  }
})()
AppForms.createProjectForm()

AppForms.createTaskForm(addTaskForm.form, 'add')

// const firstList = new Project('First')
// firstList.create()
// firstList.addTask(new Task('First 1', 'Description', 'Important'))
// firstList.addTask(new Task('First 2', 'Write it', 'None'))

// const secondList = new Project('Second')
// secondList.create()
// secondList.addTask(new Task('Second 1', 'Description', 'Urgent'))
// secondList.addTask(new Task('Second 2', 'Description', 'Important'))

// setTimeout(() => {
//   AppData.removeProject(secondList)
// }, 2000)

// setTimeout(() => {
//   firstList.removeTask(AppData.projects[0].tasks[0])
// }, 3000)

// console.log(document.body.offsetWidth)

if (document.body.offsetWidth < 800) {
  AppDOM.hide(sidebar.sidebar, 'closed')
  AppDOM.hide(dashboard.dashboard, 'closed')
}

header.toggler.onclick = () => {
  AppDOM.toggleHide(sidebar.sidebar, 'closed')
  AppDOM.toggleHide(dashboard.dashboard, 'closed')
}

header.home.onclick = () => {
  AppDOM.addAllProjectsToDashboard()
  AppDOM.activeProject()
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

AppDOM.addProjectToSidebar()

AppData.projects[0]
  ? AppDOM.addAllProjectsToDashboard()
  : (dashboard.project.innerHTML = `<h1 class='empty'>Add a project in the menu on the left!</h1>`)
