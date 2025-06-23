import {isEscapeKey} from './utils';
import {postData} from './api';
import {validateForm, closeModal} from './img-form-validate';

const imgUploadSubmitButton = document.querySelector('.img-upload__submit');
const imgUploadForm = document.querySelector('.img-upload__form');

const blockSubmitButton = () => {
  imgUploadSubmitButton.disabled = true;
  imgUploadSubmitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  imgUploadSubmitButton.disabled = false;
  imgUploadSubmitButton.textContent = 'Опубликовать';
};

function showErrorMessageData() {
  const errorMessageTemplate = document.querySelector('#data-error');
  const errorMessage = errorMessageTemplate.content.cloneNode(true);
  const errorContainer = document.createElement('div');
  errorContainer.appendChild(errorMessage);
  document.body.appendChild(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
}

function showSuccessMessage() {
  const successMessage = document.querySelector('#success').content.cloneNode(true);
  const successContainer = document.createElement('div');
  successContainer.appendChild(successMessage);
  document.body.appendChild(successContainer);
  const successButton = successContainer.querySelector('.success__button');
  const successInner = successContainer.querySelector('.success__inner');

  const onSuccessMessageEscapeKeydown = function (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successContainer.remove();
    }
  };

  const closeSuccessMessageOutArea = function (evt) {
    if (!successInner.contains(evt.target)) {
      successContainer.remove();
    }
  };

  successButton.addEventListener('click', () => {
    successContainer.remove();
  });

  document.addEventListener('keydown', onSuccessMessageEscapeKeydown);
  document.addEventListener('click', closeSuccessMessageOutArea);
}

function showErrorMessage(){
  const errorMessage = document.querySelector('#error').content.cloneNode(true);
  const errorContainer = document.createElement('div');
  errorContainer.appendChild(errorMessage);
  document.body.appendChild(errorContainer);
  const errorButton = errorContainer.querySelector('.error__button');
  const errorInner = errorContainer.querySelector('.error__inner');

  function onErrorMessageEscapeKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      errorContainer.remove();
      document.body.removeEventListener('keydown', onErrorMessageEscapeKeydown);
      document.removeEventListener('click', closeErrorMessageOutArea);
    }
  }

  function closeErrorMessageOutArea (evt) {
    if (!errorInner.contains(evt.target)) {
      errorContainer.remove();
      document.body.removeEventListener('keydown', onErrorMessageEscapeKeydown);
      document.removeEventListener('click', closeErrorMessageOutArea);
    }
  }

  errorButton.addEventListener('click', () => {
    errorContainer.remove();
  });

  document.body.addEventListener('keydown', onErrorMessageEscapeKeydown);
  document.addEventListener('click', closeErrorMessageOutArea);
}

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!validateForm()) {
    return;
  }
  blockSubmitButton();
  const formData = new FormData(evt.target);
  postData (formData,
    () => {
      showSuccessMessage();
      unblockSubmitButton();
      closeModal();
    },
    () => {
      showErrorMessage();
      unblockSubmitButton();
    }
  );
});


export {showErrorMessageData};
