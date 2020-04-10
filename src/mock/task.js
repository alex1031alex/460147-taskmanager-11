import { getRandomInteger } from './random.js';
import { COLORS } from './../const.js';

const defaultRepeatDays = {
  "mo": false,
  "tu": false,
  "we": false,
  "th": false,
  "fr": false,
  "sa": false,
  "su": false,
};

const setRepeatDays = (days) => {
  const repeatDays = defaultRepeatDays;
  for (let key in defaultRepeatDays) {
    if (Math.random() > 0.5) {
      repeatDays[key] = !repeatDays[key];
    }
  }

  return repeatDays;
};

const descriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const getRandomArrayItem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomInteger(0, 1) < 1 ? -1 : 1;
  const diffValue = sign * getRandomInteger(1, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateTask = () => {
  const dueDate = getRandomInteger(1, 0) < 1 ? null : getRandomDate();

  return {
    description: getRandomArrayItem(descriptionItems),
    dueDate,
    repeatDays: Object.assign({}, defaultRepeatDays,
      setRepeatDays(defaultRepeatDays)),
    color: getRandomArrayItem(COLORS),
    isArchive: getRandomInteger(0, 1) < 1,
    isFavorite: getRandomInteger(0, 1) < 1,
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export { generateTask, generateTasks };
