function loadMiniaturesData (onSuccess, onError) {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      onError();
    });
}

function postData (data, onSuccess, onError) {
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
    })
    .catch(() => {
      onError();
    });
}

export {loadMiniaturesData, postData};
