import './styles/styles.scss'
import { v4 as uuidv4 } from 'uuid'
import { stringToHTML } from './helpers/stringToHTML'

import {
  header,
  sidebar,
  dashboard,
  addProjectForm,
  addTaskForm,
} from './helpers/domNodes'

const DOM = () => {
  const hide = (element, closed) => {
    console.log('Element Hidden: ', element)
    element.classList.add(closed ? closed : 'hide')
  }
  const unhide = (element, closed) => {
    console.log('Element Unhidden: ', element)
    element.classList.remove(closed ? closed : 'hide')
  }
  const toggleHide = (element, closed) => {
    console.log('Element Unhidden: ', element)
    element.classList.toggle(closed ? closed : 'hide')
  }
  const addProjectToDOM = () => {
    sidebar.projectTitles.innerHTML = ''
    console.log('App: ', AppData.projects)
    AppData.projects.forEach(project => {
      let html = ''
      html += `<div>${project.title}</div>`
      const projectEl = stringToHTML(`${html}`, 'li')
      sidebar.projectTitles.appendChild(projectEl)
    })
  }
  return {
    hide,
    unhide,
    toggleHide,
    addProjectToDOM,
  }
}

const AppDOM = DOM()

const Forms = () => {
  const createProjectForm = () => {
    addProjectForm.form.onsubmit = e => {
      e.preventDefault()
      const newProject = new Project(addProjectForm.input.value)
      newProject.create()
      AppDOM.addProjectToDOM()
      addProjectForm.input.value = ''
      console.log('Form createProjectForm')
    }
  }
  const createTaskForm = () => {
    addTaskForm.form.onsubmit = e => {
      e.preventDefault()
      console.log('Form createTaskForm')
    }
  }

  return {
    createProjectForm,
    createTaskForm,
  }
}

const AppForms = Forms()
AppForms.createProjectForm()
AppForms.createTaskForm()

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
    this.dueDate = dueDate || new Date().toLocaleDateString('en-GB')
  }

  edit(title, description, priority) {
    title && (this.title = title)
    description && (this.description = description)
    priority && (this.priority = priority)
  }
}

const firstList = new Project('First')
firstList.create()
firstList.addTask(new Task('First 1', 'Description', 'Urgent'))
firstList.addTask(new Task('First 2', 'Write it', 'Ease'))

const secondList = new Project('Second')
secondList.create()
secondList.addTask(new Task('Second 1', 'Description', 'Urgent'))
secondList.addTask(new Task('Second 2', 'Description', 'Urgent'))

// setTimeout(() => {
//   AppData.removeProject(secondList)
// }, 2000)

// setTimeout(() => {
//   firstList.removeTask(AppData.projects[0].tasks[0])
// }, 3000)

header.toggler.onclick = () => {
  AppDOM.toggleHide(sidebar.sidebar, 'closed')
  AppDOM.toggleHide(dashboard, 'closed')
}

AppDOM.addProjectToDOM()
