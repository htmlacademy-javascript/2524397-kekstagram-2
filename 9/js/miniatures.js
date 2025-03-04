import {renderBigPicture, onModalEscapeKeywdown, bigPicture} from './render-fullPhoto';
import {socialCommentsList} from './render-comments.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const miniatures = document.createDocumentFragment();

const createMiniatures = function(array) {
  array.forEach(({photoId, url, description, likes, comments}) => {
    const minature = pictureTemplate.cloneNode(true);
    minature.querySelector('.picture__img').src = url;
    minature.querySelector('.picture__img').alt = description;
    minature.querySelector('.picture__likes').textContent = likes;
    minature.querySelector('.picture__comments').textContent = comments.length;
    minature.dataset.pictureId = photoId;

    miniatures.appendChild(minature);
  });

  picturesContainer.append(miniatures);

  picturesContainer.addEventListener('click', (evt) => {
    const currentDomPictureElement = evt.target.closest('.picture');

    if (currentDomPictureElement) {
      evt.preventDefault();
      socialCommentsList.textContent = '';
      const currentPicture = array.find((picture) => picture.photoId === Number(currentDomPictureElement.dataset.pictureId));
      renderBigPicture(currentPicture);
      document.addEventListener('keydown', onModalEscapeKeywdown);
      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  });
};


export {createMiniatures};
