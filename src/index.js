import { v4 as uuidv4 } from 'uuid'

class TodoList {
  constructor(list) {
    this.list = list
  }
  add(todo) {
    this.list.push(todo)
  }
  delete(id) {
    this.list = this.list.filter(todo => id !== todo.id)
  }
}

class Todo {
  constructor(title, description, priority) {
    this.title = title
    this.description = description
    this.priority = priority
    this.id = uuidv4()
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
setTimeout(() => {
  firstTodo.editTodo('', 'My first todo', '')
  console.log(firstList.list)
}, 2000)

setTimeout(() => {
  firstList.delete(secondTodo.id)
  console.log(firstList.list)
}, 4000)
