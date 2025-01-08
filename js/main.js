const PHOTO_POSTS_QUANTITY = 25;

const PHOTO_DESCRIPTION = ['Получилось хорошо', 'Вот какая красота', 'Можно было лучше', 'Фотография не очень'];
const USERS_NAMES = ['Антон','Борис','Владимир','Григорий','Дмитрий','Елесей','Жанна','Зинаида','Ирина'];
const USERS_COMMENTS = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getPhotoIdX = () => {
  let photoId = 0;
  return function () {
    return ++photoId;
  };
};

const getPhotoId = getPhotoIdX();

const getPhotoUrlX = () => {
  let photoUrl = 0;
  return function () {
    return `photos/${++photoUrl}.jpg`;
  };
};

const getPhotoUrl = getPhotoUrlX();

const getCommentIdX = () => {
  let commentId = 0;
  return function () {
    return ++commentId;
  };
};

const getCommentId = getCommentIdX();

const getCommentMessage = () => {
  const messageQuantity = getRandomInteger(1, 2);
  if (messageQuantity === 2) {
    return getRandomArrayElement(USERS_COMMENTS) + getRandomArrayElement(USERS_COMMENTS);
  }
  return getRandomArrayElement(USERS_COMMENTS);
};

const createPhotoDescription = () => ({
  photoId: getPhotoId(),
  url: getPhotoUrl(),
  description:  getRandomArrayElement(PHOTO_DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: {
    commentId: getCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getCommentMessage(),
    name: getRandomArrayElement(USERS_NAMES),
  }
});


// eslint-disable-next-line no-unused-vars
const photoData = Array.from({length: PHOTO_POSTS_QUANTITY}, createPhotoDescription);

/*
const createPhotoDescription = () => {
  let photoId = 0;
  let commentId = 0;
  let urlIndex = 0;
  return () => ({
    photoId: ++photoId,
    url: `photos/${++urlIndex}.jpg`,
    description:  getRandomArrayElement(PHOTO_DESCRIPTION),
    likes: getRandomInteger(15, 200),
    comments: {
      commentId: ++commentId,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(USERS_COMMENTS),
      name: getRandomArrayElement(USERS_NAMES),
    }
  });
};

const photoData = Array.from({length: PHOTO_POSTS_QUANTITY}, createPhotoDescription());
console.log(photoData);
*/

