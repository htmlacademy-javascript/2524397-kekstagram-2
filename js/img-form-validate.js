import {isEscapeKey, hasDuplicates} from './utils';
import {imageResize, resetEffects} from './img-editor';

const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX_COUNT = 5;
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentArea = document.querySelector('.text__description');
const imgUploadClose = document.querySelector('.img-upload__cancel');

const commentAreaErrorMessage = `Длина комментария больше ${COMMENT_MAX_LENGTH} символов`;

const onModalEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && !hashtagsInput.matches(':focus') && !commentArea.matches(':focus')) {
    evt.preventDefault();
    closeModal();
  }
};

const onCloseButtonClick = () => {
  closeModal();
};

const openModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  hashtagsInput.value = '';
  commentArea.value = '';

  document.addEventListener('keydown', onModalEscapeKeydown);
  imgUploadClose.addEventListener('click', onCloseButtonClick);
};

function closeModal () {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imgUploadForm.reset();
  imageResize.resetEditor();
  resetEffects();

  document.removeEventListener('keydown', onModalEscapeKeydown);
  imgUploadClose.removeEventListener('click', onCloseButtonClick);
}

const pristineImgUpload = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
});

pristineImgUpload.addValidator(hashtagsInput, validateWritingHashtags, 'Введён невалидный хэштег');

function validateWritingHashtags (value) {
  const hashtags = value.trim().toLowerCase();
  const hashtagRegex = /^(#[a-zа-яё0-9]{1,19})(\s#[a-zа-яё0-9]{1,19})*$/i;
  return hashtagRegex.test(hashtags);
}

pristineImgUpload.addValidator(hashtagsInput, validateDuplicatesHashtags, 'Хэштеги повторяются');

function validateDuplicatesHashtags (value) {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  if (hasDuplicates(hashtags)) {
    return false;
  }
  return true;
}

pristineImgUpload.addValidator(hashtagsInput, validateQuantityHashtags, 'Превышено количество хэштегов');

function validateQuantityHashtags (value) {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  if (hashtags.length > HASHTAGS_MAX_COUNT) {
    return false;
  }
  return true;
}

pristineImgUpload.addValidator(commentArea, validateComments, commentAreaErrorMessage);

function validateComments (value) {
  return value.length <= COMMENT_MAX_LENGTH;
}

imgUploadInput.addEventListener('change', openModal);

function validateForm () {
  return pristineImgUpload.validate();
}

export {validateForm, closeModal};

