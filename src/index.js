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

  const addProjectToSidebar = () => {
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
          addProjectToSidebar()
        }
      }
      sidebar.projectTitles.appendChild(projectEl)
    })
  }

  const activeProject = current => {
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
    activeProject(current)
  }

  const addTaskToDashboard = current => {
    console.log('addTaskToDashboard', current)
    const currentTask = stringToHTML(`<ul></ul>`)
    current.tasks.forEach(task => {
      const currentTaskItem = taskItem(task, AppDOM, current, AppData.projects)
      currentTask.appendChild(currentTaskItem)
      console.log(currentTaskItem)
      AppForms.createTaskForm(currentTaskItem, task, current, 'edit')
    })
    return currentTask
  }

  return {
    hide,
    unhide,
    toggleHide,
    addProjectToSidebar,
    addProjectToDashboard,
  }
})()

const AppForms = (() => {
  const createProjectForm = () => {
    addProjectForm.form.onsubmit = e => {
      e.preventDefault()
      console.log('PROJECT FORM: ', AppData.projects)
      const newProject = new Project(addProjectForm.input.value)
      newProject.create()
      AppDOM.addProjectToSidebar()
      AppDOM.addProjectToDashboard(newProject)
      addProjectForm.input.value = ''
      console.log('Form createProjectForm')
    }
  }
  const createTaskForm = (form, task, project, type) => {
    form.onsubmit = e => {
      e.preventDefault()
      console.log('Form createTaskForm', task)

      const formInput = {
        title: form.querySelector('#title'),
        description: form.querySelector('#description'),
        priority: form.querySelector('#priority'),
        date: form.querySelector('#date'),
        project: form.querySelector('#project'),
      }
      const { title, description, priority, date } = formInput

      if (type === 'add') {
        console.log('add')
      } else if (type === 'edit') {
        task.edit(title.value, description.value, priority.value, date.value)
      }

      AppDOM.addProjectToDashboard(project)
    }
  }

  return {
    createProjectForm,
    createTaskForm,
  }
})()

AppForms.createProjectForm()

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

AppDOM.addProjectToSidebar()

// projects.splice(projects.indexOf(), 1)
