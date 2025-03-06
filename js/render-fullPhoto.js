import {isEscapeKey} from './utils';
import {renderComments} from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');

const renderBigPicture = (currentPicture) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');

  bigPictureImg.src = currentPicture.url;
  likesCount.textContent = currentPicture.likes;
  socialCommentShownCount.textContent = currentPicture.comments.length;
  bigPictureDescription.textContent = currentPicture.description;

  renderComments(currentPicture.comments);
};

const onModalEscapeKeywdown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
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

export {renderBigPicture, onModalEscapeKeywdown, bigPicture};
