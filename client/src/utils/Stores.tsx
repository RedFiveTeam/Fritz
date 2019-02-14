import { UploadStore } from '../app/component/form/UploadStore';

const uploadStore = new UploadStore();

export interface Stores {
  uploadStore: UploadStore;
}

export const stores = {
  uploadStore
};