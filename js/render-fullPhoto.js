import {arrayOfPicture} from './miniatures.js';
import {isEscapeKey} from './utils';
import {renderComments} from './render-comments.js';

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const renderBigPicture = (pictureId) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');

  const currentPicture = arrayOfPicture.find((picture) => picture.photoId === Number(pictureId));

  bigPictureImg.src = currentPicture.url;
  likesCount.textContent = currentPicture.likes;
  socialCommentShownCount.textContent = currentPicture.comments.length;
  bigPictureDescription.textContent = currentPicture.description;

  renderComments(currentPicture.comments);

  //console.log(currentPicture);
};

const onModalEscapeKeywdown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const onMiniatureClick = function () {
  picturesContainer.addEventListener('click', (evt) => {
    const socialCommentCount = bigPicture.querySelector('.social__comment-count');
    const commentsLoader = bigPicture.querySelector('.comments-loader');
    const currentDomPictureElement = evt.target.closest('.picture');
    //console.log(currentDomPictureElement);

    if (currentDomPictureElement) {
      evt.preventDefault();
      renderBigPicture(currentDomPictureElement.dataset.pictureId);

      document.addEventListener('keydown', onModalEscapeKeywdown);

      bigPicture.classList.remove('hidden');
      socialCommentCount.classList.add('hidden'); // 8.2
      commentsLoader.classList.add('hidden'); // 8.2
      document.body.classList.add('modal-open');
    }
  });
};

const onCloseButtonClick = function () {
  const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
  bigPictureCloseButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  document.removeEventListener('keydown', onModalEscapeKeywdown);
};

onCloseButtonClick();

export {onMiniatureClick};
