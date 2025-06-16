import { sortedFunction } from './main-page-filter';

function loadMiniaturesData (onSuccess, onError) {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((posts) => {
      onSuccess(posts);
      sortedFunction(posts, onSuccess);
    })
    .then (() => {
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    })
    .catch(() => {
      onError();
    });
}

function postData (data, onSuccess, unblockButton, closemodal, onError) {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram1',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      onSuccess();
      unblockButton();
      closemodal();
    })
    .catch(() => {
      onError();
      unblockButton();
    });
}

export {loadMiniaturesData, postData};
