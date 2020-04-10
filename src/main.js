import { createMenuTemplate } from './components/menu.js';
import { createFilterTemplate } from './components/filter.js';
import { createBoardTemplate } from './components/board.js';
import { createEditTaskTemplate } from './components/edit-task.js';
import { createTaskTemplate } from './components/task.js';
import { creatLoadMoreButtonTemplate } from './components/load-more-button.js';
import { generateTasks } from './mock/task.js';
import { generateFilters } from './mock/filter.js';

const TASK_COUNT = 22;
const INITIAL_TASK_COUNT = 8;
const TASK_COUNT_BY_BUTTON = 8;

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(headerElement, createMenuTemplate());
render(mainElement, createFilterTemplate(filters));
render(mainElement, createBoardTemplate());

const boardElement = mainElement.querySelector(`.board`);
const taskListElement = mainElement.querySelector(`.board__tasks`);

render(taskListElement, createEditTaskTemplate(tasks[0]));

let showingTasksCount = INITIAL_TASK_COUNT;

tasks
  .slice(1, showingTasksCount)
  .forEach((task) => {
    render(taskListElement, createTaskTemplate(task));
  });

render(boardElement, creatLoadMoreButtonTemplate());

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount += TASK_COUNT_BY_BUTTON;

  tasks
    .slice(prevTasksCount, showingTasksCount)
    .forEach((task) => {
      render(taskListElement, createTaskTemplate(task));
    });

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});