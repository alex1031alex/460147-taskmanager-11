import { getRandomInteger } from './random.js';
import { FILTER_NAMES } from './../const.js';

const MIN_TASK_QTY = 0;
const MAX_TASK_QTY = 20;

const generateFilters = () => {
  return FILTER_NAMES.map((it) => {
    return {
      name: it,
      count: getRandomInteger(MIN_TASK_QTY, MAX_TASK_QTY),
    }
  });
};

export { generateFilters };
