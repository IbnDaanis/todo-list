import { v4 as uuidv4 } from 'uuid'

class UI {
  static createTodoList = list => {
    const container = document.querySelector('.todo-list-titles')
    const newDiv = document.createElement('li')
    newDiv.classList.add(list.id, 'todo-title')
    newDiv.innerHTML = list.title
    container.appendChild(newDiv)
    newDiv.onclick = () => {
      document.querySelectorAll(`.todo-title`).forEach(li => {
        li.classList.remove('current')
      })
      newDiv.classList.toggle('current')
    }
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
    UI.createTodoList(this)
  }
  add(todo) {
    this.list.push(todo)
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
firstList.add(new Todo('Title', 'Description', 'Urgent'))
firstList.add(new Todo('Code', 'Write it', 'Ease'))

const secondList = new TodoList([], 'Second Batch')
secondList.create()
secondList.add(new Todo('Second 1', 'Description', 'Urgent'))
secondList.add(new Todo('Second 2', 'Description', 'Urgent'))

console.log('Second List: ', secondList.list)
console.log('First List: ', firstList.list)
