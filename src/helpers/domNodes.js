export const addNewList = {
  form: document.querySelector('#addNewList'),
  input: document.querySelector('#listTitle'),
}

export const addTodoForm = {
  toggler: document.querySelector('#addTodoFormToggler'),
  container: document.querySelector('#addTodoFormContainer'),
  form: document.querySelector('#addTodoForm'),
  cancel: document.querySelector('#cancelAddTodo'),
  title: document.querySelector('#title'),
  description: document.querySelector('#description'),
  urgency: document.querySelector('#urgency'),
  date: document.querySelector('#date'),
  listSelection: document.querySelector('#list'),
}

export const sidebar = {
  sidebar: document.querySelector('#sidebar'),
  container: document.querySelector('#sidebarContainer'),
  todoLists: document.querySelector('#todoListTitles'),
}
export const dashboard = document.querySelector('#dashboard')

export const header = {
  toggler: document.querySelector('#menuToggler'),
  home: document.querySelector('#home'),
}

export const todo = {
  delete: document.querySelectorAll('[data-action=delete]'),
}
