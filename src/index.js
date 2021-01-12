import { v4 as uuidv4 } from 'uuid'

class UI {
  static addTodoToContainer = () => {
    const container = document.querySelector('.main-container')
    container.innerHTML = ''
    firstList.list.forEach(todo => {
      const html = `
      <div class="card border-gray-200 border-solid p-4 m-4 bg-gray-400 w-64 h-64">
          <h1>${todo.title}</h1>
          <p>${todo.description}</p>
      </div>
      `
      container.innerHTML += html
    })
  }
}

class TodoList {
  constructor(list) {
    this.list = list
  }
  add(todo) {
    this.list.push(todo)
    UI.addTodoToContainer()
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

const firstList = new TodoList([])

const firstTodo = new Todo('Title', 'Description', 'Urgent')
const secondTodo = new Todo('Code', 'Write it', 'Ease')
console.log(firstTodo)
firstList.add(firstTodo)
firstList.add(secondTodo)
console.log(firstList.list)

const main = document.querySelector('.main-container')

setTimeout(() => {
  firstList.add(new Todo('Third', 'The One', 'Urgent'))
}, 2000)
