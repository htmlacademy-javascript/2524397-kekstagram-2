import {loadMiniaturesData} from './api.js';
import {createMiniatures} from './miniatures.js';
import {showErrorMessageData} from './img-form-submit.js';
import {sortedFunction} from './main-page-filter';
import './img-form-validate.js';
import './img-editor.js';
import './img-form-submit.js';
import './main-page-filter.js';

loadMiniaturesData(
  (data) => {
    createMiniatures(data);
    sortedFunction(data, createMiniatures);
  },
  showErrorMessageData
);
