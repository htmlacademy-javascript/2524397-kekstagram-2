const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileUploadForm = document.querySelector('#upload-file');
const uploadImgPreview = document.querySelector('.img-upload__preview img');

function onLoadImage() {
  fileUploadForm.addEventListener('change', () => {
    const file = fileUploadForm.files[0];
    const fileName = file.name.toLowerCase();

    const isGoodType = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (isGoodType) {
      uploadImgPreview.src = URL.createObjectURL(file);
    }
  });
}

export {onLoadImage};
