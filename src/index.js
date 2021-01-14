import './styles/styles.scss'
import { v4 as uuidv4 } from 'uuid'
import { stringToHTML } from './helpers/stringToHTML'

import {
  header,
  sidebar,
  dashboard,
  addNewList,
  addTodoForm,
} from './helpers/domNodes'

const todoLists = []
let index = 0

class TodoList {
  constructor(list, title) {
    this.list = list
    this.title = title
    this.id = uuidv4()
    this.isDelete = false
    this.isActive = false
    this.index = index
  }
  create() {
    index++
    todoLists.push(this)
    console.log('This:', this)
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

  edit(title, description, priority) {
    title && (this.title = title)
    description && (this.description = description)
    priority && (this.priority = priority)
  }
}

const firstList = new TodoList([], 'First')
firstList.create()
firstList.add(new Todo('First 1', 'Description', 'Urgent'))
firstList.add(new Todo('First 2', 'Write it', 'Ease'))

const secondList = new TodoList([], 'Second')
secondList.create()
secondList.add(new Todo('Second 1', 'Description', 'Urgent'))
secondList.add(new Todo('Second 2', 'Description', 'Urgent'))
