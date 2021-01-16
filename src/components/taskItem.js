import { stringToHTML } from '../helpers/stringToHTML'
import { taskForm } from './taskForm'

export const taskItem = (data, DOM, currentProject, projects) => {
  // console.log({ data, currentProject })
  const task = data
  const element = stringToHTML(
    ` <div class='task-item'><h3>${task.title}</h3><button id="toggleCompleted${task.id}" class='toggle-completed'>Complete</button><button id="deleteTask${task.id}" class='delete-task'>Delete</button></div>`,
    'li'
  )
  data.isComplete && element.classList.add('completed')
  element.appendChild(
    taskForm({
      add: false,
      hide: true,
      task,
      id: data.id,
      currentProject,
      projects,
    })
  )
  element.querySelector('h3').onclick = () => {
    DOM.unhide(element.querySelector(`#addTaskFormContainer${data.id}`), 'hide')
  }
  element.querySelector('.cancel').onclick = e => {
    DOM.hide(element.querySelector(`#addTaskFormContainer${data.id}`), 'hide')
  }
  element.querySelector(`#toggleCompleted${task.id}`).onclick = () => {
    task.toggleComplete()
    element.classList.toggle('completed')
  }
  element.querySelector(`#deleteTask${task.id}`).onclick = () => {
    currentProject.removeTask(task)
    DOM.addProjectToDashboard(currentProject)
  }
  return element
}
