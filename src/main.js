import BoardComponent from './components/board.js';
import FilterComponent from './components/filter.js';
import LoadMoreButtonComponent from './components/load-more-button.js';
import NoTasksComponent from './components/no-tasks.js';
import TaskEditComponent from './components/task-edit.js';
import TaskComponent from './components/task.js';
import TasksComponent from './components/tasks.js';
import SiteMenuComponent from './components/site-menu.js';
import SortComponent from './components/sort.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render, replace, remove, RenderPosition} from './utils/render.js';

// Установим количество задач для отрисовки
const TASK_COUNT = 22;
const SHOWING_TASK_ON_START = 8;
const SHOWING_TASK_BY_BUTTON = 8;
// Определим функцию для отрисовки задачи
const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };
  // Создадим обработчик нажатия клавиши ESC
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  // Создадим компонент задачи, найдём кнопку, навесим обработчик
  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  // Создадим компонент редактируемой задачи, найдём форму, навесим обработчик на событие submit
  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  // Отрисуем задачу
  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};
// Создадим функцию отрисовки доски
const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasksComponent(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardComponent.getElement(), new SortComponent(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TasksComponent(), RenderPosition.BEFOREEND);
  // Найдём элемент списка задач
  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
  // Отрисуем начальное количество задач в список
  let showingTasksCount = SHOWING_TASK_ON_START;
  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });
  // Отрисуем кнопку load-more
  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);
  // Навесим обработчик на кнопку
  loadMoreButtonComponent.setClickHandler(() => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASK_BY_BUTTON;
    // По нажатию кнопки отрисовываем новое количество задач
    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));
    // Проверяем не пора ли скрыть кнопку
    if (showingTasksCount >= tasks.length) {
      remove(loadMoreButtonComponent);
    }
  });
};
// Найдём и сохраним основные элементы страницы
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
// Получим моковые данные
const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();
// Отрисуем меню и фильтры
render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);
// Создаём компонент доски, отрисовываем саму доску. Затем в неё сортировку и задачи.
const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
renderBoard(boardComponent, tasks);
