import {onLoadImage} from './img-loader.js';

const enlargeImageElement = document.querySelector('.scale__control--bigger');
const minimizeImageElement = document.querySelector('.scale__control--smaller');
const currentImageSizeElement = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const SCALE_IMAGE_CONFIG = {
  START: 100,
  STEP: 25,
  MIN: 25,
  MAX: 100
};

function resizeImage () {
  let currentSize = SCALE_IMAGE_CONFIG.START;

  function updateSize() {
    currentImageSizeElement.value = `${currentSize}%`;
    imgPreview.style.transform = `scale(${(currentSize / 100)})`;
  }

  return {
    minimizeImage () {
      if (currentSize > SCALE_IMAGE_CONFIG.MIN) {
        currentSize -= SCALE_IMAGE_CONFIG.STEP;
        updateSize();
      }
    },
    enlargeImage () {
      if (currentSize < SCALE_IMAGE_CONFIG.MAX) {
        currentSize += SCALE_IMAGE_CONFIG.STEP;
        updateSize();
      }
    },
    resetEditor () {
      currentSize = SCALE_IMAGE_CONFIG.START;
      updateSize();
      imgPreview.style.filter = '';
    }
  };
}

const imageResize = resizeImage();

minimizeImageElement.addEventListener('click', imageResize.minimizeImage);
enlargeImageElement.addEventListener('click', imageResize.enlargeImage);

const imgUploadEffects = document.querySelector('.img-upload__effects');
const imgUpload = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');
const slider = document.querySelector('.effect-level__slider');
const effectNone = document.querySelector('#effect-none');

const FILTERS_CONFIG = {
  none: {
    key: 'none',
    range: { min: 0, max: 100 },
    step: 1,
    start: 100,
    prefix: '',
  },
  chrome: {
    key: 'grayscale',
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1,
    prefix: '',
  },
  sepia: {
    key: 'sepia',
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1,
    prefix: '',
  },
  marvin: {
    key: 'invert',
    range: { min: 0, max: 100 },
    step: 1,
    start: 100,
    prefix: '%',
  },
  phobos: {
    key: 'blur',
    range: { min: 0, max: 3 },
    step: 0.1,
    start: 3,
    prefix: 'px',
  },
  heat: {
    key: 'brightness',
    range: { min: 1, max: 3 },
    step: 0.1,
    start: 3,
    prefix: '',
  }
};

noUiSlider.create(slider, {
  start: FILTERS_CONFIG.none.start,
  connect: 'lower',
  range: FILTERS_CONFIG.none.range,
  step: FILTERS_CONFIG.none.step
});

if (effectNone.checked) {
  imgUpload.classList.add('hidden');
  imgPreview.style.filter = '';
}

const resetEffects = () => {
  effectNone.checked = true;
  imgUpload.classList.add('hidden');
  imgPreview.style.filter = '';
};

const changeFilterTo = (filterKey) => {

  const filter = FILTERS_CONFIG[filterKey];

  if (filter.key === 'none') {
    imgUpload.classList.add('hidden');
  } else {
    imgUpload.classList.remove('hidden');
  }

  slider.noUiSlider.updateOptions({
    range: filter.range,
    start: filter.start,
    step: filter.step,
  });

  if (filter.key !== 'none') {
    imgPreview.style.filter = `${filter.key}(${filter.start}${filter.prefix})`;
  } else {
    imgPreview.style.filter = '';
  }
};

slider.noUiSlider.on('update', () => {
  const value = slider.noUiSlider.get();
  effectLevel.value = parseFloat(value);
  const selectedRadio = document.querySelector('.img-upload__effects input[type="radio"]:checked');
  const currentFilter = FILTERS_CONFIG[selectedRadio.value];

  if (currentFilter !== 'none') {
    imgPreview.style.filter = `${currentFilter.key}(${value}${currentFilter.prefix})`;
  } else {
    imgPreview.style.filter = '';
  }
});

imgUploadEffects.addEventListener('change', (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    changeFilterTo(evt.target.value);
  }
});

onLoadImage();

export {imageResize, resetEffects};
