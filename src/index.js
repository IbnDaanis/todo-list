import { v4 as uuidv4 } from 'uuid'

class UI {
  static addTodoToContainer = list => {
    const container = document.querySelector('.main-container')
    if (!document.querySelector(`.${list.slice(0, 4)}`)) {
      const newDiv = document.createElement('div')
      newDiv.classList.add(list.slice(0, 4))
      container.appendChild(newDiv)
    }
    const currContainer = document.querySelector(`.${list.slice(0, 4)}`)
    currContainer.innerHTML = `<h1 class="p-4 m-1 text-3xl font-semibold">${list}</h1>`
    firstList.list.forEach(todo => {
      const html = `
      <div class="card border-gray-200 border-solid border-2 p-4 m-2 rounded">
          <h1>${todo.title}</h1>
          <p>${todo.description}</p>
      </div>
      `
      currContainer.innerHTML += html
    })
  }
}

class TodoList {
  constructor(list, title) {
    this.list = list
    this.title = title
  }
  add(todo) {
    this.list.push(todo)
    UI.addTodoToContainer(this.title)
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

const firstTodo = new Todo('Title', 'Description', 'Urgent')
const secondTodo = new Todo('Code', 'Write it', 'Ease')
console.log(firstTodo)
firstList.add(firstTodo)
firstList.add(secondTodo)
console.log(firstList.list)

const secondList = new TodoList([], 'Second Batch')
secondList.add(firstTodo)
secondList.add(secondTodo)
console.log(secondList.list)
