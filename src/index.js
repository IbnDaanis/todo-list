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

class Project {
  constructor(title, tasks, id, isDeleted, isActive) {
    this.title = title
    this.tasks = tasks || []
    this.id = id || uuidv4()
    this.isDeleted = isDeleted || false
    this.isActive = isActive || false
  }
  create() {
    console.log('This:', this)
    AppData.storeProject(this)
  }
  addTask(task) {
    this.tasks.push(task)
    AppData.save()
  }
  removeTask(task) {
    this.tasks = this.tasks.filter(item => item.id !== task.id)
    console.log('Tasks: - ', this.tasks)
    AppData.save()
  }
}

class Task {
  constructor(title, description, priority, dueDate, isComplete, id) {
    this.title = title
    this.description = description
    this.priority = priority
    this.dueDate = dueDate || format(new Date(), 'yyyy-MM-dd')
    this.isComplete = isComplete || false
    this.id = id || uuidv4()
  }

  edit(title, description, priority, dueDate) {
    title && (this.title = title)
    description && (this.description = description)
    priority && (this.priority = priority)
    dueDate && (this.dueDate = dueDate)
    AppData.save()
  }
  toggleComplete() {
    this.isComplete = !this.isComplete
    AppData.save()
    console.log(AppData.projects)
  }
}

const AppData = (() => {
  let projects = JSONtoClasses() || []

  function JSONtoClasses() {
    const local = JSON.parse(localStorage.getItem('AppData'))
    console.log('Classes ', JSON.parse(localStorage.getItem('AppData')))
    const projects = []
    local.forEach(project => {
      const tasks = []
      project.tasks.forEach(task => {
        const newTask = new Task(
          task.title,
          task.description,
          task.priority,
          task.dueDate,
          task.isComplete,
          task.id
        )
        tasks.push(newTask)
      })
      const newProject = new Project(
        project.title,
        tasks,
        project.id,
        project.isDeleted,
        project.isActive
      )
      projects.push(newProject)
    })

    return projects
  }

  const save = () => {
    localStorage.setItem('AppData', JSON.stringify(projects))
    console.log('SAVE ', JSON.parse(localStorage.getItem('AppData')))
  }
  const storeProject = project => {
    projects.push(project)
    console.log('Projects: + ', projects)
    save()
  }
  const removeProject = project => {
    save()
    projects = projects.filter(item => item.id !== project.id)
    console.log('Projects: - ', projects)
  }
  return {
    JSONtoClasses,
    storeProject,
    removeProject,
    projects,
    save,
  }
})()
AppData.JSONtoClasses()

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

console.log(AppData.projects)
AppDOM.addProjectToSidebar()
