import { v4 as uuidv4 } from 'uuid'
import { addTodoForm } from './components/addTodoForm'
import { stringToHTML } from './helpers/stringToHTML'

class UI {
  static createTodoListInMenu = list => {
    const container = document.querySelector('.todo-list-titles')
    const menuTitle = document.createElement('li')
    menuTitle.classList.add(list.id, 'todo-title')
    menuTitle.innerHTML = list.title
    container.appendChild(menuTitle)
    menuTitle.onclick = () => {
      document.querySelectorAll(`.todo-title`).forEach(li => {
        li.classList.remove('current')
      })
      menuTitle.classList.toggle('current')
      this.createTodoListContainer(list)
    }
  }
  static createTodoListContainer = list => {
    const container = document.querySelector('.todo-container-screen')
    let html = `
      <h1>${list.title}</h1>`

    container.innerHTML = html

    list.list.forEach(todo => {
      const element = stringToHTML(`<p>${todo.title}</p>`, 'div')
      container.appendChild(element)
    })

    const addTodoButton = stringToHTML(
      `<div class='plus'>
        <svg width="13" height="13"><path d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z" fill="currentColor" fill-rule="evenodd"></path></svg>
      </div>
      <p>Add task</p>`,
      'div'
    )
    addTodoButton.classList.add('add-todo-button')
    addTodoButton.onclick = () => {
      this.createAddTodoForm()
      document.querySelector('.add-todo-button').classList.add('hide')
    }
    container.appendChild(addTodoButton)
  }
  static createAddTodoForm = () => {
    const container = document.querySelector('.todo-container-screen')
    container.appendChild(addTodoForm)
    document.querySelector('.add-todo-form').classList.remove('hide')
    document.querySelector('#addTodoForm').addEventListener('submit', e => {
      e.preventDefault()
      const title = document.querySelector('#title')
      const description = document.querySelector('#description')
      const urgency = document.querySelector('#urgency')
      const date = document.querySelector('#date')
      firstList.add(
        new Todo(title.value, description.value, urgency.value, date.value)
      )
      this.createTodoListContainer(firstList)
      // console.log(title.value, description.value, urgency.value, date.value)
    })
    document.querySelector('#cancel').addEventListener('click', () => {
      document.querySelector('.add-todo-form').classList.add('hide')
      document.querySelector('.add-todo-button').classList.remove('hide')
    })
  }
}

class TodoList {
  constructor(list, title) {
    this.list = list
    this.title = title
    this.id = uuidv4()
    this.isDelete = false
  }
  create() {
    UI.createTodoListInMenu(this)
  }
  add(todo) {
    this.list.push(todo)
  }
  view() {
    UI.createTodoListInMenu(this)
  }
  delete(id) {
    this.list = this.list.filter(todo => id !== todo.id)
  }
}

class Todo {
  constructor(title, description, priority, dueDate) {
    this.title = title
    this.description = description
    this.priority = priority
    this.id = uuidv4()
    this.dueDate = dueDate || new Date().toLocaleDateString('en-GB')
  }

  editTodo(title, description, priority) {
    title && (this.title = title)
    description && (this.description = description)
    priority && (this.priority = priority)
  }
}

const firstList = new TodoList([], 'First')
firstList.create()
firstList.add(new Todo('First 1', 'Description', 'Urgent'))
firstList.add(new Todo('First 2', 'Write it', 'Ease'))

const secondList = new TodoList([], 'Second Batch')
secondList.create()
secondList.add(new Todo('Second 1', 'Description', 'Urgent'))
secondList.add(new Todo('Second 2', 'Description', 'Urgent'))

console.log('Second List: ', secondList.list)
console.log('First List: ', firstList.list)

document.querySelector('.menu_icon').addEventListener('click', () => {
  document.querySelector('.sidebar').classList.toggle('closed')
  document.querySelector('.todo-container').classList.toggle('closed')
})
