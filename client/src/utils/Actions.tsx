import { UploadActions } from '../app/component/form/UploadActions';
import { WebRepositories } from './Repositories';
import { stores } from './Stores';

const uploadActions = new UploadActions(WebRepositories, stores);

export const actions = {
  uploadActions
};