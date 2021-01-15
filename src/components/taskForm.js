import { stringToHTML } from '../helpers/stringToHTML'

export const taskForm = data => {
  const { add, hide, id, currentProject, projects } = data
  console.log({ projects })
  let projectSelection = ``
  projects.forEach(project => {
    projectSelection += `<option value="${project.title}" ${
      currentProject.title === project.title && 'selected="selected"'
    }>${project.title}</option>`
  })

  const form = stringToHTML(` <div
    class="add-task-form ${hide && 'hide'}"
    id="addTaskFormContainer${id && id}"
  >
    <form id="addTaskForm" autocomplete="off">
      <div class="container">
        <div class="title">
          <label for="title">Title: </label>
          <input
            name="title"
            id="title"
            placeholder="Enter the title"
            required
          />
        </div>
        <div class="description">
          <label for="description">Description: </label>
          <input
            name="description"
            id="description"
            placeholder="Enter the description"
          />
        </div>
        <div class="sub-options">
          <div class="priority">
            <label for="priority">Priority: </label>
            <select name="priority" id="priority" class="priority-select">
              <option value="none">None</option>
              <option value="important">Important</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div class="date">
            <label for="date">Pick a date: </label>
            <input type="date" name="date" id="date" />
          </div>
          <div class="project-selection">
            <label for="project">Project: </label>
            <select name="project" id="project">${projectSelection}</select>
          </div>
        </div>
      </div>
      <button class="add-task-button" type="submit">
        ${add ? 'Add Task' : 'Edit Task'}
      </button>
      <button type="button" class="cancel" id="cancelAddTask${id}">Cancel</button>
    </form>
  </div>`)

  return form
}
