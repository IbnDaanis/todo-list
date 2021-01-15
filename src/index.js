import './styles/styles.scss'
import { v4 as uuidv4 } from 'uuid'
import { stringToHTML } from './helpers/stringToHTML'
import { taskForm } from './components/taskForm'
import { taskItem } from './components/taskItem'
import { format } from 'date-fns'

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
    // console.log('App: ', AppData.projects)
    AppData.projects.forEach(project => {
      let html = `<div>${project.title}</div>`
      const projectEl = stringToHTML(`${html}`, 'li')
      projectEl.onclick = () => {
        AppDOM.addProjectToDashboard(project)
        // console.log('Sidebar: ', project)
      }
      sidebar.projectTitles.appendChild(projectEl)
    })
  }

  const activeProject = current => {
    projectTitles.querySelectorAll('li').forEach(project => {
      if (project.textContent === current.title) {
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

const Data = () => {
  let projects = []
  const storeProject = project => {
    projects.push(project)
    console.log('Projects: + ', projects)
  }
  const removeProject = project => {
    projects = projects.filter(item => item.id !== project.id)
    console.log('Projects: - ', projects)
  }
  return {
    storeProject,
    removeProject,
    projects,
  }
}

const AppData = Data()

class Project {
  constructor(title) {
    this.tasks = []
    this.title = title
    this.id = uuidv4()
    this.isDelete = false
    this.isActive = false
  }
  create() {
    console.log('This:', this)
    AppData.storeProject(this)
  }
  addTask(task) {
    this.tasks.push(task)
  }
  removeTask(task) {
    this.tasks = this.tasks.filter(item => item.id !== task.id)
    console.log('Tasks: - ', this.tasks)
  }
}

class Task {
  constructor(title, description, priority, dueDate) {
    this.title = title
    this.description = description
    this.priority = priority
    this.id = uuidv4()
    this.completed = false
    this.dueDate = dueDate || format(new Date(), 'yyyy-MM-dd')
  }

  edit(title, description, priority, dueDate) {
    title && (this.title = title)
    description && (this.description = description)
    priority && (this.priority = priority)
    dueDate && (this.dueDate = dueDate)
  }
  toggleComplete() {
    this.completed = !this.completed
  }
}

const firstList = new Project('First')
firstList.create()
firstList.addTask(new Task('First 1', 'Description', 'Important'))
firstList.addTask(new Task('First 2', 'Write it', 'None'))

const secondList = new Project('Second')
secondList.create()
secondList.addTask(new Task('Second 1', 'Description', 'Urgent'))
secondList.addTask(new Task('Second 2', 'Description', 'Important'))

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
