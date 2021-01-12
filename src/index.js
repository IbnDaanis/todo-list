class TodoList {
  constructor(list) {
    this.list = list
  }
  add(todo) {
    this.list.push(todo)
  }
}

class Todo {
  constructor(title, description, priority) {
    this.title = title
    this.description = description
    this.priority = priority
  }
}

const firstList = new TodoList([])

const firstTodo = new Todo('Title', 'Description', 'Urgent')
const secondTodo = new Todo('Code', 'Write it', 'Ease')
console.log(firstTodo)
firstList.add(firstTodo)
firstList.add(secondTodo)
console.log(firstList.list)
