import { UploadActions } from '../app/component/form/UploadActions';
import { WebRepositories } from './Repositories';
import { stores } from './Stores';
import { SlidesActions } from '../app/component/slides/SlidesActions';

const uploadActions = new UploadActions(WebRepositories, stores);
const slidesActions = new SlidesActions(WebRepositories, stores);

export const actions = {
  uploadActions,
  slidesActions
};