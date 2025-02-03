
const COMENTS_RENDER_STEP = 5; //шаг отрисовки
let currentViewComments = 0; //текущее значение
let currentPictureComments;

const socialCommentsList = document.querySelector('.social__comments');
const socialCommentsDom = socialCommentsList.querySelectorAll('.social__comment');
const loadMoreComments = document.querySelector('.social__comments-loader'); // загрузить еще

const renderComments = function (arrayOfComments) {
  const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
  const socialCommentShownCount = document.querySelector('.social__comment-shown-count');
  currentPictureComments = arrayOfComments; // получили массив коментариев
  //console.log(currentPictureComments); // проверка
  socialCommentTotalCount.textContent = currentPictureComments.length;
  const commentsFragments = document.createDocumentFragment();
  const renderedComments = currentPictureComments.slice(currentViewComments, currentViewComments + COMENTS_RENDER_STEP); // показанные коментарии

  socialCommentsDom.forEach((element) => {
    element.remove();
  });

  renderedComments.forEach((element) => { // arrayOfComments -> renderedComments
    const newCommentItem = document.createElement('li');
    newCommentItem.classList.add('social__comment');

    const newCommentImg = document.createElement('img');
    newCommentImg.classList.add('social__picture');
    newCommentImg.src = element.avatar;
    newCommentImg.alt = element.name;
    newCommentItem.append(newCommentImg);

    const newCommentText = document.createElement('p');
    newCommentText.classList.add('social__text');
    newCommentText.textContent = element.message;
    newCommentItem.append(newCommentText);

    commentsFragments.append(newCommentItem);
  });

  currentViewComments += renderedComments.length; // прибавили шаг
  socialCommentShownCount.textContent = currentViewComments;

  if (currentViewComments >= arrayOfComments.length) {
    loadMoreComments.classList.add('hidden');
  }

  socialCommentsList.append(commentsFragments);
};

loadMoreComments.addEventListener('click', () => {
  renderComments(currentPictureComments);
});

export {renderComments};
