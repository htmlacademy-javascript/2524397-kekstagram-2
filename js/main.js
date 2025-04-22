import {GetPhotoData} from './data.js';
import {createMiniatures} from './miniatures.js';
import './img-form-validate.js';
import './img-editor.js';


const arrayOfPicture = GetPhotoData();
createMiniatures(arrayOfPicture);

