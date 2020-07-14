import LoadMoreButtonComponent from '../components/load-more-button.js';
import NoTasksComponent from '../components/no-tasks.js';
import SortComponent from '../components/sort.js';
import TaskComponent from '../components/task.js';
import TaskEditComponent from '../components/task-edit.js';
import TasksComponent from '../components/tasks.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';


const SHOWING_TASK_ON_START = 8;
const SHOWING_TASK_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  // Создадим компоненты задачи и формы редактирования
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);
  // Навесим обработчик на кнопку редактирования
  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  // При помощи специального метода навесим обработчик на событие submit
  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  // Отрисуем задачу
  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

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

export default class BoardController {
  constructor(container) {

    this._container = container;
  }

  render(tasks) {
    renderBoard(this._container, tasks);
  }
}
