import {debounce} from './utils';

const imgFiltersContainer = document.querySelector('.img-filters');

const FILTERS_KEYS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

const FILTERS = {
  default: function(arr) {
    return arr;
  },
  random: function(arr) {
    return arr.toSorted(() => 0.5 - Math.random()).slice(0, 10);
  },
  discussed: function(arr) {
    return arr.toSorted((a, b) => b.comments.length - a.comments.length);
  },
};

function sortedFunction (dataArr, renderFunction) {
  const currentData = dataArr;
  const debouncedRender = debounce((filteredData) => {
    document.querySelectorAll('.picture').forEach((pic) => pic.remove());
    renderFunction(filteredData);
  });

  function onFilterButtonClick (evt){
    const activeFilterButton = document.querySelector('.img-filters__button--active');
    const targetFilterButton = evt.target;

    let filteredData = [];
    if (!evt.target.matches('.img-filters__button')) {
      return;
    }

    targetFilterButton.classList.add('img-filters__button--active');
    activeFilterButton.classList.remove('img-filters__button--active');

    if (activeFilterButton.id === targetFilterButton.id) {
      targetFilterButton.classList.add('img-filters__button--active');
      return;
    }

    if (evt.target.id === FILTERS_KEYS.default) {
      filteredData = FILTERS.default(currentData);
    }

    if (evt.target.id === FILTERS_KEYS.random) {
      filteredData = FILTERS.random(currentData);
    }

    if (evt.target.id === FILTERS_KEYS.discussed) {
      filteredData = FILTERS.discussed(currentData);
    }

    debouncedRender(filteredData);
  }

  imgFiltersContainer.addEventListener('click', onFilterButtonClick);
}


export {sortedFunction};
