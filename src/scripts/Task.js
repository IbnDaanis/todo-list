import { v4 as uuidv4 } from 'uuid'
import { AppData } from './AppData'
import { format } from 'date-fns'

export class Task {
  constructor(title, description, priority, dueDate, isComplete, id) {
    this.title = title
    this.description = description
    this.priority = priority
    this.dueDate = dueDate || format(new Date(), 'yyyy-MM-dd')
    this.isComplete = isComplete || false
    this.id = id || uuidv4()
  }

  edit(title, description, priority, dueDate) {
    title && (this.title = title)
    description && (this.description = description)
    priority && (this.priority = priority)
    dueDate && (this.dueDate = dueDate)
    AppData.save()
  }
  toggleComplete() {
    this.isComplete = !this.isComplete
    AppData.save()
    console.log(AppData.projects)
  }
}
