import {isEscapeKey} from './utils';

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

  const onSuccessMessageEscapeKeywdown = function (evt) {
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

  document.addEventListener('keydown', onSuccessMessageEscapeKeywdown);
  document.addEventListener('click', closeSuccessMessageOutArea);
}

function showErrorMessage(){
  const errorMessage = document.querySelector('#error').content.cloneNode(true);
  const errorContainer = document.createElement('div');
  errorContainer.appendChild(errorMessage);
  document.body.appendChild(errorContainer);
  const errorButton = errorContainer.querySelector('.error__button');
  const errorInner = errorContainer.querySelector('.error__inner');

  const onErrorMessageEscapeKeywdown = function (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      errorContainer.remove();
    }
  };

  const closEerrorMessageOutArea = function (evt) {
    if (!errorInner.contains(evt.target)) {
      errorContainer.remove();
      document.body.removeEventListener('keydown', onErrorMessageEscapeKeywdown);
      document.removeEventListener('click', closEerrorMessageOutArea);
    }
  };

  errorButton.addEventListener('click', () => {
    errorContainer.remove();
  });

  document.body.addEventListener('keydown', onErrorMessageEscapeKeywdown);
  document.addEventListener('click', closEerrorMessageOutArea);
}

export {showErrorMessageData, showSuccessMessage, showErrorMessage};
