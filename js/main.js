import {createMiniatures} from './miniatures.js';
import {showErrorMessageData} from './img-form-submit.js';
import './img-form-validate.js';
import './img-editor.js';
import {loadMiniaturesData} from './api.js';
import './img-form-submit.js';
import './main-page-filter.js';

loadMiniaturesData(createMiniatures, showErrorMessageData);


