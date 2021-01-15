import { stringToHTML } from '../helpers/stringToHTML'
import { taskForm } from './taskForm'

export const taskItem = (data, DOM, currentProject, projects) => {
  const task = data
  const element = stringToHTML(
    ` <div><h3>${task.title}</h3><button id="toggleCompleted">Toggle</button></div>`,
    'li'
  )
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
  element.querySelector('#toggleCompleted').onclick = () => {
    task.toggleComplete()
    element.classList.toggle('completed')
  }
  return element
}
