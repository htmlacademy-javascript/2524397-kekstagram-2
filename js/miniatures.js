import {GetPhotoData} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const arrayOfPicture = GetPhotoData();

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
};

export {createMiniatures, arrayOfPicture};
