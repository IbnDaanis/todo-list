import { v4 as uuidv4 } from 'uuid'
import { stringToHTML } from './helpers/stringToHTML'

class UI {
  static createTodoListInMenu = list => {
    console.log('createTodoListInMenu: ', list)
    const container = document.querySelector('.todo-list-titles')
    const menuTitle = document.createElement('li')
    menuTitle.classList.add(list.id, 'todo-title')
    menuTitle.innerHTML = list.title
    container.appendChild(menuTitle)
    menuTitle.onclick = () => {
      list.isActive = false
      this.createTodoListContainer(list)
    }
  }
  static createTodoListContainer = list => {
    const listPicker = document.querySelector('#list')
    let el = ''
    console.log(todoLists)
    todoLists.forEach(list => {
      el += `<option value='${list.title}'>${list.title}</option>`
    })
    listPicker.innerHTML = el
    document
      .querySelectorAll(`.todo-title`)
      .forEach(todo => todo.classList.remove('current'))
    list.isActive = true
    if (list.isActive) {
      ;[...document.querySelectorAll(`.todo-title`)][list.index].classList.add(
        'current'
      )
    }
    document.querySelector('.add-todo-form').classList.add('hide')
    document.querySelector('.add-todo-button').classList.remove('hide')
    console.log('createTodoListContainer: ', list)
    const container = document.querySelector('.todo-list-tasks')
    container.innerHTML = ''
    let html = `<h1>${list.title}</h1>`
    container.innerHTML += html
    console.log('List: ', list.list)
    list.list.forEach(todo => {
      const element = stringToHTML(`<p>${todo.title}</p>`, 'div')
      container.appendChild(element)
    })
    document.querySelector('#list').value = list.title
    document.querySelector('.add-todo-button').onclick = () => {
      document.querySelector('.add-todo-button').classList.add('hide')
      document.querySelector('.add-todo-form').classList.remove('hide')
    }
  }

  static handleSubmit = e => {
    e.preventDefault()
    const { title, description, urgency, date, listSelection } = addTodoForm
    const currentList = todoLists.find(
      list => list.title === listSelection.value
    )
    currentList.add(
      new Todo(title.value, description.value, urgency.value, date.value)
    )
    title.value = ''
    description.value = ''
    date.value = ''
    urgency.getElementsByTagName('option')[0].selected = 'selected'
    this.createTodoListContainer(currentList)
  }
  static removeAddTodoForm = name => {
    document
      .querySelector('#addTodoForm')
      .removeEventListener('submit', name, true)
  }
}

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
    UI.createTodoListInMenu(this)
    index++
    todoLists.push(this)
    console.log('This:', this)
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

const secondList = new TodoList([], 'Second')
secondList.create()
secondList.add(new Todo('Second 1', 'Description', 'Urgent'))
secondList.add(new Todo('Second 2', 'Description', 'Urgent'))

import {
  header,
  sidebar,
  dashboard,
  addNewList,
  addTodoForm,
} from './scripts/domNodes'

header.toggler.addEventListener('click', () => {
  sidebar.classList.toggle('closed')
  dashboard.classList.toggle('closed')
})

addNewList.form.addEventListener('submit', e => {
  e.preventDefault()
  const newList = new TodoList([], addNewList.input.value)
  newList.create()
  UI.createTodoListContainer(newList)
  addNewList.input.value = ''
})

addTodoForm.form.addEventListener('submit', e => {
  UI.handleSubmit(e)
})
addTodoForm.cancel.addEventListener('click', () => {
  addTodoForm.container.classList.add('hide')
  addTodoForm.toggler.classList.remove('hide')
})
