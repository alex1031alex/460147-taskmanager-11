const filterNames = [`all`, `overdue`, `today`, `favorits`, `repeating`, `archive`];

const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: 20,
    }
  });
};

export { generateFilters };
