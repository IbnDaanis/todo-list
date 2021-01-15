import { v4 as uuidv4 } from 'uuid'
import { AppData } from './AppData'
export class Project {
  constructor(title, tasks, id, isDeleted, isActive) {
    this.title = title
    this.tasks = tasks || []
    this.id = id || uuidv4()
    this.isDeleted = isDeleted || false
    this.isActive = isActive || false
  }
  create() {
    console.log('This:', this)
    AppData.storeProject(this)
  }
  addTask(task) {
    this.tasks.push(task)
    AppData.save()
  }
  removeTask(task) {
    this.tasks = this.tasks.filter(item => item.id !== task.id)
    console.log('Tasks: - ', this.tasks)
    AppData.save()
  }
}
