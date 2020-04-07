import { getRandomInteger } from './random.js';

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
      count: getRandomInteger(0, 20),
    }
  });
};

export { generateFilters };
