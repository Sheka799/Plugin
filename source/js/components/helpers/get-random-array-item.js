import getRandomInteger from "./get-random-integer";

function getRandomArrayItem(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

export default getRandomArrayItem;
