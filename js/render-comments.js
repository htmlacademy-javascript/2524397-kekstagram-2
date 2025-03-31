const COMMENTS_RENDER_STEP = 5;
const socialCommentsList = document.querySelector('.social__comments');
const loadMoreComments = document.querySelector('.social__comments-loader'); // загрузить еще
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const socialCommentShownCount = document.querySelector('.social__comment-shown-count');


const commentsList = {
  listener: null,
  renderComments: function (arrayOfComments) {
    let currentViewComments = 0;
    socialCommentsList.textContent = '';
    loadMoreComments.classList.remove('hidden');

    if (this.listener) {
      loadMoreComments.removeEventListener('click', this.listener);
    }

    this.listener = () => render();

    function render () {
      socialCommentTotalCount.textContent = arrayOfComments.length;
      const commentsFragments = document.createDocumentFragment();
      const renderedComments = arrayOfComments.slice(currentViewComments, currentViewComments + COMMENTS_RENDER_STEP);

      renderedComments.forEach((element) => {
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

      currentViewComments += renderedComments.length;
      socialCommentShownCount.textContent = currentViewComments;

      if (currentViewComments >= arrayOfComments.length) {
        loadMoreComments.classList.add('hidden');
      }

      socialCommentsList.append(commentsFragments);
    }

    render();

    if (arrayOfComments.length > 5) {
      loadMoreComments.addEventListener('click', this.listener);
    }
  },
};

export {commentsList};
