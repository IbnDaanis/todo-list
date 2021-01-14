import { stringToHTML } from '../helpers/stringToHTML'

export const todoItem = todo => {
  return stringToHTML(
    `
  <p>${todo.title}</p>
  <button data-action=delete data-id='${todo.id}'>X</button>
  <button data-action=edit data-id='${todo.id}'>Edit</button>
`,
    'div'
  )
}
