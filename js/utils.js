const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

//Функция для поиска одинаковых значений в массиве
function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}

export {getRandomInteger, getRandomArrayElement, isEscapeKey, hasDuplicates};
