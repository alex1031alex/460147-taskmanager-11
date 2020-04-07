const getRandomInteger = (min, max) => {
  Math.floor(min + Math.random() * (max + 1 - min))
};

export { getRandomInteger };