import {GetPhotoData} from './data.js';
import {createMiniatures} from './miniatures.js';

const arrayOfPicture = GetPhotoData();
createMiniatures(arrayOfPicture);

