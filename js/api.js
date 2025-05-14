import {createMiniatures} from './miniatures.js';

function showErrorMessage() {
  const errorMessageTemplate = document.querySelector('#data-error');
  const errorMessage = errorMessageTemplate.content.cloneNode(true);
  const errorContainer = document.createElement('div');
  errorContainer.appendChild(errorMessage);
  document.body.appendChild(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
}

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((posts) => createMiniatures(posts))
  .catch(() => {
    showErrorMessage();
  });
