import { stringToHTML } from '../helpers/stringToHTML'

export const taskForm = data => {
  const { add, hide, task, id, currentProject, projects } = data
  // console.log({ projects })
  let projectSelection = ``
  projects.forEach(project => {
    projectSelection += `<option value="${project.title}" ${
      currentProject.title === project.title && 'selected="selected"'
    }>${project.title}</option>`
  })

  let prioritySelection = ``
  ;['None', 'Important', 'Urgent'].forEach(priority => {
    prioritySelection += `<option value="${priority}" ${
      task.priority === priority && `selected="selected"`
    }>${priority}</option>`
  })

  const form = stringToHTML(` <div
    class="add-task-form ${hide && 'hide'}"
    id="addTaskFormContainer${id}"
  >
    <form id="addTaskForm" autocomplete="off" data-id="${id}">
      <div class="container">
        <div class="title">
          <label for="title">Title: </label>
          <input
            name="title"
            id="title"
            placeholder="Enter the title"
            value="${task.title}"
            required
          />
        </div>
        <div class="description">
          <label for="description">Description: </label>
          <input
            name="description"
            id="description"
            placeholder="Enter the description"
            value="${task.description}"
          />
        </div>
        <div class="sub-options">
          <div class="priority">
            <label for="priority">Priority: </label>
            <select name="priority" id="priority" class="priority-select" selected="${
              task.priority
            }">
            ${prioritySelection}
            </select>
          </div>
          <div class="date">
            <label for="date">Pick a date: </label>
            <input type="date" name="date" id="date" value="${task.dueDate}"/>
          </div>
          <div class="project-selection">
            <label for="project">Project: </label>
            <select name="project" id="project">${projectSelection}</select>
          </div>
        </div>
      </div>
      <button class="add-task-button" type="submit" ${
        !add && `style='background: #0d4398'`
      }>
        ${add ? 'Add Task' : 'Edit Task'}
      </button>
      <button type="button" class="cancel" id="cancelAddTask${id}">Cancel</button>
    </form>
  </div>`)

  return form
}
