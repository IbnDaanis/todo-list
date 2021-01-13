import { v4 as uuidv4 } from 'uuid'

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

    list.list.forEach(todo => (html += `<p>${todo.title}</p>`))
    html += ``

    container.innerHTML = html
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
