'use strict';

import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createEditTaskTemplate} from './components/edit-task.js';
import {createTaskTemplate} from './components/task.js';
import {creatLoadMoreButtonTemplate} from './components/load-more-button.js';


const TASK_COUNT = 3;
const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createMenuTemplate());
render(mainElement, createFilterTemplate());
render(mainElement, createBoardTemplate());

const boardElement = mainElement.querySelector(`.board`);
const taskListElement = mainElement.querySelector(`.board__tasks`);

render(taskListElement, createEditTaskTemplate());

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate());
}

render(boardElement, creatLoadMoreButtonTemplate());
