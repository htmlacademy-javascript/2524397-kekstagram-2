import {GetPhotoData} from './data.js';
import {createMiniatures} from './miniatures.js';
import {example} from './img-form-validate.js';


const arrayOfPicture = GetPhotoData();
createMiniatures(arrayOfPicture);
console.log(example);

