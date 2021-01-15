import { stringToHTML } from '../helpers/stringToHTML'
import { taskForm } from './taskForm'

export const taskItem = data => {
  const task = data
  const element = stringToHTML(` <li><h3>${task.title}</h3></li>`)
  element.appendChild(taskForm({ add: false, hide: true, id: data.id }))
  element.querySelector('h3').onclick = () => {
    console.log(`Task Title ${data.id.slice(0, 10)}`)
    document
      .querySelector(`#addTaskFormContainer${data.id}`)
      .classList.remove('hide')
  }
  return element
}
