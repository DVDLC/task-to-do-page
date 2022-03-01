import { TodoList, Todo } from "./classes";
import { createTodoHtml } from "./js/components";

import "./css/styles.css";


export const taskList = new TodoList()

taskList.todos.forEach( createTodoHtml );
 