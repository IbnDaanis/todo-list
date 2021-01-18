import { AppDOM } from './AppDOM'
import { AppData } from './AppData'
import { Project } from './Project'
import { Task } from './Task'
import { format } from 'date-fns'
import { addProjectForm } from '../helpers/domNodes'
export const AppForms = (() => {
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
  const createTaskForm = (form, type, task, currProject) => {
    form.onsubmit = e => {
      e.preventDefault()
      console.log('CREATE', { type, task, currProject })
      if (type === 'add') {
        console.log('EDIT')
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
