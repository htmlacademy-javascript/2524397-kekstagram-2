import {getRandomInteger, getRandomArrayElement} from './utils.js';

const PHOTO_POSTS_QUANTITY = 25;

const PHOTO_DESCRIPTION = ['Получилось хорошо', 'Вот какая красота', 'Можно было лучше', 'Фотография не очень'];
const USERS_NAMES = ['Антон','Борис','Владимир','Григорий','Дмитрий','Елесей','Жанна','Зинаида','Ирина'];
const USERS_COMMENTS = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const getCommentMessage = () => {
  const messageQuantity = getRandomInteger(1, 2);
  if (messageQuantity === 2) {
    return getRandomArrayElement(USERS_COMMENTS) + getRandomArrayElement(USERS_COMMENTS);
  }
  return getRandomArrayElement(USERS_COMMENTS);
};

const counter = () => {
  let counterValue = 0;
  return function () {
    return ++counterValue;
  };
};

const getPhotoId = counter();
const getCommentId = counter();
const getUrlId = counter();

const createPhotoDescription = () => ({
  photoId: getPhotoId(),
  url: `photos/${getUrlId()}.jpg`,
  description:  getRandomArrayElement(PHOTO_DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, () => ({
    commentId: getCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getCommentMessage(),
    name: getRandomArrayElement(USERS_NAMES),
  })),
});


const GetPhotoData = () => Array.from({length: PHOTO_POSTS_QUANTITY}, createPhotoDescription);

export {GetPhotoData, PHOTO_POSTS_QUANTITY};
