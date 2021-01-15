import { stringToHTML } from '../helpers/stringToHTML'
import { taskForm } from './taskForm'

export const taskItem = (data, DOM) => {
  const task = data
  const element = stringToHTML(` <div><h3>${task.title}</h3></div>`, 'li')
  element.appendChild(taskForm({ add: false, hide: true, id: data.id }))
  element.querySelector('h3').onclick = () => {
    // console.log(`Task Title ${data.id.slice(0, 10)}`)

    DOM.unhide(element.querySelector(`#addTaskFormContainer${data.id}`), 'hide')
  }
  element.querySelector('.cancel').onclick = e => {
    DOM.hide(element.querySelector(`#addTaskFormContainer${data.id}`), 'hide')
    console.log('CANCEL!')
  }
  return element
}
