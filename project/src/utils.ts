const RANDOM_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';

const sentencesArr = RANDOM_TEXT.split('. ');

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1): number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateDescription = (): string => {
  const MAX_DESCRIPTION_LENGTH = 5;

  const startIndex = getRandomInteger(0, sentencesArr.length - 1);
  let endIndex = startIndex < sentencesArr.length - 1 ? (
    getRandomInteger(startIndex + 1, sentencesArr.length - 1)) :
    undefined;
  if (endIndex) {
    endIndex = endIndex - startIndex <= MAX_DESCRIPTION_LENGTH ? endIndex : startIndex + MAX_DESCRIPTION_LENGTH;
  }
  const descriptionArr = sentencesArr.slice(startIndex, endIndex);
  return `${descriptionArr.join('. ')}.`;
};

export function getUniqueItems<T>(items: T[]): T[] {
  return [...new Set(items)];
}
