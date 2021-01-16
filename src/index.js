import './styles/styles.scss'
import { stringToHTML } from './helpers/stringToHTML'
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
    // console.log('Element Hidden: ', element)
    element.classList.add(closed ? closed : 'hide')
  }
  const unhide = (element, closed) => {
    // console.log('Element Unhidden: ', element)
    element.classList.remove(closed ? closed : 'hide')
  }
  const toggleHide = (element, closed) => {
    // console.log('Element Unhidden: ', element)
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
      if (deleting) {
        AppData.projects[0]
          ? AppDOM.addProjectToDashboard(AppData.projects[0])
          : (dashboard.dashboard.innerHTML = '')
      }
    })
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
    dashboard.project.innerHTML = ''
    const projectEl = stringToHTML(`<h1>${current.title}</h1>`, 'div')
    projectEl.classList.add(`${current.id}`)
    dashboard.project.appendChild(projectEl)
    dashboard.project.appendChild(addTaskToDashboard(current))
    addProjectsToTaskForm(current)
    activeProject(current)
  }

  const addAllProjectsToDashboard = () => {
    dashboard.project.innerHTML = ''
    AppData.projects.forEach(project => {
      const projectEl = stringToHTML(`<h2>${project.title}</h2>`, 'div')
      projectEl.style.padding = `1rem 0`
      if (project.tasks.length > 0) {
        projectEl.appendChild(addTaskToDashboard(project))
        projectEl
          .querySelectorAll('button')
          .forEach(btn => btn.classList.add('hide'))
        projectEl.querySelector('h3').onclick = e => {
          toggleHide(projectEl.querySelector('.add-task-form'))
        }
      } else {
        projectEl.appendChild(
          stringToHTML(`<h3>No tasks for this project</h3>`, 'div')
        )
      }

      dashboard.project.appendChild(projectEl)
    })
  }

  const addTaskToDashboard = current => {
    // console.log('addTaskToDashboard', current)
    const currentTask = stringToHTML(`<ul></ul>`)
    current.tasks.forEach(task => {
      const currentTaskItem = taskItem(task, AppDOM, current, AppData.projects)
      currentTask.appendChild(currentTaskItem)
      AppForms.createTaskForm(currentTaskItem, task, current, 'edit')
    })
    return currentTask
  }

  return {
    hide,
    unhide,
    toggleHide,
    activeProject,
    addProjectToSidebar,
    addProjectToDashboard,
    addAllProjectsToDashboard,
  }
})()

const AppForms = (() => {
  const createProjectForm = () => {
    addProjectForm.form.onsubmit = e => {
      e.preventDefault()
      // console.log('PROJECT FORM: ', AppData.projects)
      const newProject = new Project(addProjectForm.input.value)
      newProject.create()
      AppDOM.addProjectToSidebar()
      AppDOM.addProjectToDashboard(newProject)
      addProjectForm.input.value = ''
      // console.log('Form createProjectForm')
    }
  }
  const createTaskForm = (form, type, task, currProject) => {
    form.onsubmit = e => {
      e.preventDefault()
      const formInput = {
        title: form.querySelector('#title'),
        description: form.querySelector('#description'),
        priority: form.querySelector('#priority'),
        date: form.querySelector('#date'),
        projects: form.querySelector('#projects'),
      }
      const { title, description, priority, date, projects } = formInput

      if (type === 'add') {
        console.log('add')
        const selectedProject = AppData.projects.filter(
          currItem => currItem.title === projects.value
        )
        // console.log(selectedProject)
        selectedProject[0].addTask(
          new Task(title.value, description.value, priority.value, date.value)
        )
        title.value = ''
        description.value = ''
        priority.firstChild.nextSibling.selected = true
        date.value = format(new Date(), 'yyyy-MM-dd')
        AppDOM.addProjectToDashboard(selectedProject[0])
      } else if (type === 'edit') {
        task.edit(title.value, description.value, priority.value, date.value)
        AppDOM.addProjectToDashboard(currProject)
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
  AppDOM.hide(addTaskForm.toggler)
}

addTaskForm.cancel.onclick = () => {
  AppDOM.unhide(addTaskForm.toggler)
  AppDOM.hide(addTaskForm.container)
}

addTaskForm.date.value = format(new Date(), 'yyyy-MM-dd')

AppDOM.addProjectToSidebar()

AppData.projects[0] && AppDOM.addAllProjectsToDashboard()
