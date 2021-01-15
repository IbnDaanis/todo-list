import { Task } from './Task'
import { Project } from './Project'
export const AppData = (() => {
  let projects = []

  const JSONtoClasses = (() => {
    const local = JSON.parse(localStorage.getItem('AppData'))
    local &&
      local.forEach(project => {
        const tasks = []
        project.tasks.forEach(task => {
          const newTask = new Task(
            task.title,
            task.description,
            task.priority,
            task.dueDate,
            task.isComplete,
            task.id
          )
          tasks.push(newTask)
        })
        const newProject = new Project(
          project.title,
          tasks,
          project.id,
          project.isDeleted,
          project.isActive
        )
        projects.push(newProject)
      })
  })()

  const save = () => {
    localStorage.setItem('AppData', JSON.stringify(projects))
    console.log('SAVE ', JSON.parse(localStorage.getItem('AppData')))
  }
  const storeProject = project => {
    projects.push(project)
    console.log('Projects: + ', projects)
    save()
  }
  const removeProject = project => {
    const index = projects.findIndex(item => item.title === project.title)
    projects.splice(index, 1)
    console.log('DELETE TASK: ', projects)
    save()
  }
  return {
    JSONtoClasses,
    storeProject,
    removeProject,
    projects,
    save,
  }
})()
