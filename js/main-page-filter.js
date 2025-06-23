import {debounce} from './utils';

const imgFiltersContainer = document.querySelector('.img-filters');

const FILTERS = {
  'filter-default': (arr) => arr,
  'filter-random': (arr) => arr.toSorted(() => 0.5 - Math.random()).slice(0, 10),
  'filter-discussed': (arr) => arr.toSorted((a, b) => b.comments.length - a.comments.length),
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

    const currentFiltering = FILTERS[evt.target.id];

    if(!currentFiltering) {
      return;
    }

    filteredData = currentFiltering(currentData);

    debouncedRender(filteredData);
  }

  imgFiltersContainer.addEventListener('click', onFilterButtonClick);
}


export {sortedFunction};
