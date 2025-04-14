import {GetPhotoData} from './data.js';
import {createMiniatures} from './miniatures.js';
import {example} from './img-form-validate.js';


const arrayOfPicture = GetPhotoData();
createMiniatures(arrayOfPicture);
// eslint-disable-next-line no-console
console.log(example);

