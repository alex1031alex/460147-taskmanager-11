import { getRandomInteger } from './random.js';

const MIN_TASK_QTY = 0;
const MAX_TASK_QTY = 20;

const filterNames = [
  `all`,
  `overdue`,
  `today`,
  `favorits`,
  `repeating`,
  `archive`
];

const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: getRandomInteger(MIN_TASK_QTY, MAX_TASK_QTY),
    }
  });
};

export { generateFilters };
