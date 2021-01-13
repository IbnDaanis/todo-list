import { stringToHTML } from '../helpers/stringToHTML'

export const addTodoForm = stringToHTML(
  `       <div class="add-todo-form">
            <form id="addTodoForm">
              <div class="container">
                <div class="title">
                  <label for="title">Title: </label>
                  <textarea
                    name="title"
                    id="title"
                    placeholder="Enter the title"
                  ></textarea>
                </div>
                <div class="description">
                  <label for="description">Description: </label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Enter the description"
                  ></textarea>
                </div>
                <div class="sub-options">
                  <div class="urgency">
                    <label for="urgency">Urgency: </label>
                    <select name="urgency" id="urgency">
                      <option value="none">None</option>
                      <option value="important">Important</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div class="date">
                    <label for="date">Pick a date: </label>
                    <input type="date" name="date" id="date" />
                  </div>
                </div>
              </div>
              <button class="add-todo-button" type="submit">Add Task</button>
              <button class="cancel" id="cancel">Cancel</button>
            </form>
          </div>
`,
  'div'
)
