const socialCommentsList = document.querySelector('.social__comments');
const socialCommentsDom = socialCommentsList.querySelectorAll('.social__comment');


const renderComments = function (arrayOfComments) {

  const commentsFragments = document.createDocumentFragment();

  socialCommentsDom.forEach((element) => {
    element.remove();
  });

  arrayOfComments.forEach((element) => {
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
    newCommentItem .append(newCommentText);

    commentsFragments.append(newCommentItem);
  });

  socialCommentsList.append(commentsFragments);
};

export {renderComments};
