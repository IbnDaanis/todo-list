import { stringToHTML } from '../helpers/stringToHTML'
import { dateToday } from '../helpers/dateToday'

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
          <label for="title${id}">Title: </label>
          <input
            name="title"
            id="title${id}"
            placeholder="Enter the title"
            value="${task.title}"
            required
          />
        </div>
        <div class="description">
          <label for="description${id}">Description: </label>
          <input
            name="description"
            id="description${id}"
            placeholder="Enter the description"
            value="${task.description}"
          />
        </div>
        <div class="sub-options">
          <div class="priority">
            <label for="priority${id}">Priority: </label>
            <select name="priority" id="priority${id}" class="priority-select" selected="${
    task.priority
  }">
            ${prioritySelection}
            </select>
          </div>
          <div class="date">
            <label for="date${id}">Due date: </label>
            <input type="date" name="date" min=${dateToday} id="date${id}" value="${
    task.dueDate
  }"/>
          </div>
          <div class="project-selection">
            <label for="project${id}">Project: </label>
            <select name="project" id="project${id}">${projectSelection}</select>
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
