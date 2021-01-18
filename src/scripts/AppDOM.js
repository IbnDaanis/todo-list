import { AppData } from './AppData'
import { AppForms } from './AppForms'
import { taskItem } from '../components/taskItem'
import { stringToHTML } from '../helpers/stringToHTML'
import { emptyDashboard } from '../components/emptyDashboard'
import { sidebar, dashboard, addTaskForm } from '../helpers/domNodes'

export const AppDOM = (() => {
  const hide = (element, closed) => {
    element.classList.add(closed ? closed : 'hide')
  }
  const unhide = (element, closed) => {
    element.classList.remove(closed ? closed : 'hide')
  }
  const toggleHide = (element, closed) => {
    element.classList.toggle(closed ? closed : 'hide')
  }

  const addProjectToSidebar = (deleting = false) => {
    AppDOM.hide(addTaskForm.toggler)
    AppDOM.hide(addTaskForm.container)
    sidebar.projectTitles.innerHTML = ''
    console.log('AppData.projects: ', AppData.projects)
    AppData.projects.forEach(project => {
      let html = `<span id=title${project.id}>${project.title}</span><button id=delete${project.id} title="Delete project"><span>X</span></button>`
      const projectEl = stringToHTML(`${html}`, 'li')
      projectEl.onclick = () => {
        AppDOM.addProjectToDashboard(project)
      }
      projectEl.querySelector(`#delete${project.id}`).onclick = () => {
        if (projectEl.classList.contains('active')) {
          AppData.removeProject(project)
          addProjectToSidebar(true)
        }
      }
      sidebar.projectTitles.appendChild(projectEl)
    })
    if (deleting) {
      if (!AppData.projects.length) {
        console.log('Else', emptyDashboard.innerHTML)
        dashboard.project.innerHTML = ''
        dashboard.project.appendChild(emptyDashboard)
      } else {
        console.log(AppData.projects.length)
        AppDOM.addProjectToDashboard(AppData.projects[0])
      }
    }
  }

  const addProjectsToTaskForm = currentProject => {
    let projectSelection = ``
    AppData.projects.forEach(project => {
      projectSelection += `<option value="${project.title}"
      ${currentProject.title === project.title && 'selected="selected"'}
      >${project.title}</option>`
    })
    addTaskForm.projects.innerHTML = projectSelection
  }

  const activeProject = current => {
    if (!current) {
      projectTitles
        .querySelectorAll('li')
        .forEach(project => project.classList.remove('active'))
      return
    }
    projectTitles.querySelectorAll('li').forEach(project => {
      if (project.firstChild.id.slice(5) === current.id) {
        project.classList.add('active')
      } else {
        project.classList.remove('active')
      }
    })
  }
  const addProjectToDashboard = current => {
    if (document.body.offsetWidth < 800) {
      AppDOM.hide(sidebar.sidebar, 'closed')
      AppDOM.hide(dashboard.dashboard, 'closed')
    }
    dashboard.project.innerHTML = ''
    const projectEl = stringToHTML(`<h1>${current.title}</h1>`, 'div')
    projectEl.classList.add(`${current.id}`)
    projectEl.classList.add('project-items')
    unhide(addTaskForm.toggler)
    projectEl.appendChild(addTaskToDashboard(current))
    dashboard.project.appendChild(projectEl)
    addProjectsToTaskForm(current)
    activeProject(current)
  }

  const addAllProjectsToDashboard = () => {
    dashboard.project.innerHTML = '<h1>All Projects<h1>'
    AppData.projects.forEach(project => {
      const projectEl = stringToHTML(`<h2>${project.title}</h2>`, 'div')
      projectEl.classList.add('all-project-items')
      if (project.tasks.length > 0) {
        projectEl.appendChild(addTaskToDashboard(project))
        projectEl
          .querySelectorAll('button')
          .forEach(btn => btn.classList.add('hide'))
        const taskForm = projectEl.querySelector('.add-task-form')
        taskForm.classList.add('no-cursor')
      } else {
        projectEl.appendChild(
          stringToHTML(`<h3>No tasks for this project</h3>`, 'div')
        )
      }
      dashboard.project.appendChild(projectEl)
    })
  }

  const addTaskToDashboard = current => {
    const currentTask = stringToHTML(``, 'ul')
    currentTask.classList.add('task-list')
    current.tasks.forEach(task => {
      const currentTaskItem = taskItem(task, AppDOM, current, AppData.projects)
      currentTask.appendChild(currentTaskItem)
      currentTaskItem.querySelector('h3').onclick = () => {
        toggleHide(currentTaskItem.querySelector('.add-task-form'))
      }
      AppForms.createTaskForm(currentTaskItem, 'edit', task, current)
    })
    return currentTask
  }

  const scrollToBottom = (more = 0) => {
    dashboard.dashboard.scrollTop = dashboard.dashboard.scrollHeight + more
  }

  return {
    hide,
    unhide,
    toggleHide,
    activeProject,
    scrollToBottom,
    addProjectToSidebar,
    addProjectToDashboard,
    addAllProjectsToDashboard,
  }
})()
